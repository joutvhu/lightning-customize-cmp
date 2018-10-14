({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    init : function(component) {
        var helper = this,
            action = component.get('c.info');
        this.loading(component, true);
        action.setParams({ finder : component.get('v.finder') });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.info', response.getReturnValue());
            }
            helper.loading(component, false);
        });
        $A.enqueueAction(action);
        this.changereadonly(component);
        this.search(component);
    },
    over : function(component) {
        component.set('v.isover', true);
    },
    out : function(component) {
        component.set('v.isover', false);
    },
    blur : function(component) {
        var isover = component.get('v.isover'),
            inputsearch = component.find('input-search'), searchelement;
        if(!isover) component.set('v.focused', false);
        else if(inputsearch && inputsearch.getElement()) {
            searchelement = inputsearch.getElement();
            window.setTimeout($A.getCallback(function() { searchelement.focus(); }), 5);
        }
    },
    blursearch : function(component) {
        var inputsearch = component.find('input-search'),
            cleansearch = component.get('v.cleansearch');
        component.set('v.isover', false);
        component.set('v.hover', null);
        if(cleansearch) component.set('v.search', '');
        if(inputsearch && inputsearch.getElement())
            inputsearch.getElement().blur();
    },
    gets : function(component) {
        var helper = this,
            ids = component.get('v.ids'),
            action = component.get('c.gets');
        this.loading(component, true);
        action.setParams({
            finder : component.get('v.finder'),
            ids : ids
        });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                var value = response.getReturnValue();
                helper.setvalues(component, value);
            }
            helper.loading(component, false);
        });
        $A.enqueueAction(action);
    },
    setvalues : function(component, values) {
        var limit = component.get('v.limitsearch');
        if(values) {
            if(values.length > limit) values = values.slice(0, limit);
            component.set('v.values', values);
            component.set('v.ids', this.extractids(values));
        }
    },
    search : function(component) {
        var helper = this,
            search = component.get('v.search'),
            limit = component.get('v.limitsearch'),
            ids = component.get('v.ids'),
            other = component.get('v.other'),
            action = component.get('c.find');
        if(search) search = search.trim();
        this.loading(component, true);
        action.setParams({
            finder : component.get('v.finder'),
            search_c : search,
            limit_c : limit,
            selectedIds : ids,
            other : other
        });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                var value = response.getReturnValue();
                search = component.get('v.search');
                if(search) search = search.trim();
                if(value.search == search)
                    component.set('v.options', value.data);
            }
            helper.loading(component, false);
        });
        $A.enqueueAction(action);
    },
    dataset : function(event, key) {
        var path = event.path || this.composedPath(event.target);
        if(path != null) {
            for(var i = 0; i < path.length; i++)
                if(path[i].dataset[key] != null)
                    return path[i].dataset[key];
        }
        return null;
    },
    composedPath: function(el) {
        if(el == null) return null;
        var path = [];
        while (el) {
            path.push(el);
            if (el.tagName === 'HTML') {
                path.push(document);
                path.push(window);
                return path;
            }
            el = el.parentElement;
        }
    },
    selectvalue : function(component, event) {
        var id = this.dataset(event, 'id'),
            values = component.get('v.values'),
            limitselected = component.get('v.limitselected'),
            options = component.get('v.options');
        if(options != null && (limitselected == 0 || values == null || values.length < limitselected)) {
            for(var i = 0; i < options.length; i++)
                if(options[i].id == id) {
                    this.addvalue(component, options[i]);
                    options.splice(i, 1);
                    component.set('v.options', options);
                    this.blursearch(component);
                    break;
                }
        }
    },
    removevalue : function(component, event) {
        var id = this.dataset(event, 'id'),
            values = component.get('v.values');
        if(values != null) {
            for(var i = 0; i < values.length; i++)
                if(values[i].id == id) {
                    values.splice(i, 1);
                    component.set('v.values', values);
                    component.set('v.ids', this.extractids(values));
                    break;
                }
        }
    },
    reset : function(component) {
        var inputsearch = component.find('input-search');
        component.set('v.isover', false);
        component.set('v.hover', null);
        component.set('v.search', '');
        component.set('v.values', []);
        component.set('v.ids', []);
        component.set('v.haserror', false);
        if(inputsearch && inputsearch.getElement())
            inputsearch.getElement().blur();
    },
    addvalue : function(component, value) {
        var values = component.get('v.values');
        if(values == null) values = [];
        values.push(value);
        component.set('v.values', values);
        component.set('v.ids', this.extractids(values));
    },
    extractids : function(values) {
        var ids = [], item;
        if(values == null || values.length == 0) return [];
        for(item of values) ids.push(item.id);
        return ids;
    },
    loading : function(component, isload) {
        var totalloading = component.get('v.totalloading');
        if(totalloading == null) totalloading = 0;
        if(isload) totalloading++;
        else totalloading--;
        if(totalloading < 0) totalloading = 0;
        component.set('v.totalloading', totalloading);
        if(totalloading == 0)
            component.set('v.loading', false);
        else component.set('v.loading', true);
    },
    changelist : function(component) {
        var focused = component.get('v.focused'),
            loading = component.get('v.loading'),
            options = component.get('v.options'),
            liststyle = 'lookup__list',
            emptystyle = '',
            loadstyle = '';
        if(focused) {
            if(loading) loadstyle += 'display: block;';
            else {
                if(options != null && options.length > 0) liststyle += ' visible';
                else emptystyle += 'display: block;';
            }
        }
        component.set('v.liststyle', liststyle);
        component.set('v.loadstyle', loadstyle);
        component.set('v.emptystyle', emptystyle);
    },
    changefocus : function(component) {
        var esc = component.get('v.esc'),
            focused = component.get('v.focused'),
            containerstyle = 'lookupContainer contentWrapper slds-box--border',
            searchstyle = 'undefined lookup__menu uiAbstractList uiAutocompleteList uiInput uiAutocomplete uiInput--default uiInput--lookup';
        if(focused) {
            containerstyle += ' focused';
            this.search(component);
        }
        if(!focused || esc) searchstyle = 'invisible ' + searchstyle;
        component.set('v.searchstyle', searchstyle);
        component.set('v.containerstyle', containerstyle);
    },
    changereadonly : function(component) {
        var readonly = component.get('v.readonly'),
            searchboxstyle = 'inputWrapper searchBox';
        if(readonly) searchboxstyle += ' disabled';
        component.set('v.searchboxstyle', searchboxstyle);
    },
    checkerror : function(component) {
        var haserror = component.get('v.haserror'),
            focused = component.get('v.focused'),
            autoerror = component.get('v.autoerror'),
            values = component.get('v.values'),
            search = component.get('v.search'),
            mainstyle = 'uiInput forceSearchInputLookupDesktop',
            error = false, listerror = [];
        if(haserror || (autoerror && !focused && !$A.util.isEmpty(search) && (values == null || values.length == 0))) {
            mainstyle += ' has-error';
            if(!haserror) listerror.push('An invalid option has been chosen.');
            error = true;
        }
        component.set('v.listerror', listerror);
        component.set('v.mainstyle', mainstyle);
        component.set('v.error', error);
    },
    onenter : function(component) {
        var options = component.get('v.options'),
            values = component.get('v.values'),
            limitselected = component.get('v.limitselected'),
            hover = component.get('v.hover'), i;
        if(hover != null && options != null && options.length > 0 &&
           (limitselected == 0 || values == null || values.length < limitselected)) {
            for(i = 0; i < options.length; i++)
                if(options[i].id == hover) {
                    this.addvalue(component, options[i]);
                    options.splice(i, 1);
                    component.set('v.options', options);
                    this.blursearch(component);
                    break;
                }
        }
    },
    arrowup : function(component) {
        var options = component.get('v.options'),
            hover = component.get('v.hover'),
            length = 0, i, j;
        if(options != null) length = options.length;
        if(length > 0) {
            i = length - 1;
            if(hover != null) {
                for(j = 0; j < length; j++)
                    if(options[j].id == hover) {
                        i = (j + length - 1) % length;
                        break;
                    }
            }
            component.set('v.hover', options[i].id);
        }
        else component.set('v.hover', null);
    },
    arrowdown : function(component) {
        var options = component.get('v.options'),
            hover = component.get('v.hover'),
            length = 0, i = 0, j;
        if(options != null) length = options.length;
        if(length > 0) {
            if(hover != null) {
                for(j = 0; j < length; j++)
                    if(options[j].id == hover) {
                        i = (j + 1) % length;
                        break;
                    }
            }
            component.set('v.hover', options[i].id);
        }
        else component.set('v.hover', null);
    },
    fireaction : function(component, name) {
        var action = component.get('v.' + name);
        if(action != null) $A.enqueueAction(action);
    }
})