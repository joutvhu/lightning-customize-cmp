({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    init : function(component) {
        var helper = this,
        	action = component.get('c.info'),
            value = component.get('v.value');
        this.loading(component, true);
        action.setParams({ finder : component.get('v.finder') });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.info', response.getReturnValue());
            }
            helper.loading(component, false);
        });
        if(value != null && value.id != null && value.id != '')
            this.changedata(component, value);
        this.search(component, '');
        $A.enqueueAction(action);
    },
	reload : function(component) {
        component.set('v.selected', false);
        component.set('v.loading', false);
	},
	over : function(component) {
        component.set('v.isover', true);
	},
	out : function(component) {
        component.set('v.isover', false);
	},
	blur : function(component) {
        var isover = component.get('v.isover'),
            openmobile = component.get('v.openmobile'),
            inputsearch = component.find('input-search');
        if(!isover) component.set('v.focused', false);
        else if(!openmobile && inputsearch && inputsearch.getElement())
            inputsearch.getElement().focus();
    },
    setvalue : function(component, value) {
        component.set('v.data', value);
        component.set('v.value', value);
	},
    unselect : function(component) {
        this.setvalue(component, null);
        component.set('v.hover', null);
        component.set('v.selected', false);
        component.set('v.search', '');
    },
	search : function(component) {
        var helper = this,
            search = component.get('v.search'),
            searchmobile = component.get('v.mobilesearch'),
            limit = component.get('v.limit'),
            other = component.get('v.other'),
        	action = component.get('c.find');
        if(searchmobile) limit = component.get('v.limitmobile');
        if(search) search = search.trim();
        this.loading(component, true);
        action.setParams({
            finder : component.get('v.finder'),
            search_c : search,
            limit_c : limit,
            other : other
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                var value = response.getReturnValue();
                search = component.get('v.search');
                if(search) search = search.trim();
                if(value.search == search)
                    component.set('v.options', value.data);
            }
            component.set('v.otherchanged', false);
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
    getvalue : function(component, event) {
        var id = this.dataset(event, 'id');
        var options = component.get('v.options');
		if(options != null) {
			for(var i = 0; i < options.length; i++)
				if(options[i].id == id) {
					this.setvalue(component, options[i]);
					component.set('v.selected', true);
					break;
				}
		}
    },
    changedata : function(component, value) {
        if(component.get('v.getchange') || $A.util.isEmpty(value.title))
            this.get(component, value.id);
        else {
            component.set('v.data', value);
            component.set('v.selected', true);
        }
    },
    get : function(component, id) {
        var helper = this,
        	action = component.get('c.get');
        this.loading(component, true);
        action.setParams({
            finder : component.get('v.finder'),
            id : id
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                helper.setvalue(component, response.getReturnValue());
                component.set('v.selected', true);
            }
            helper.loading(component, false);
        });
        $A.enqueueAction(action);
    },
    add : function(component) {
        var entity = component.get('v.info');
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            entityApiName : entity.objectAPI
        });
        createRecordEvent.fire();
    },
    changevalue : function(component) {
        var readonly = component.get('v.readonly'),
            selected = component.get('v.selected'),
            wrapperstyle = 'inputWrapper',
            pillstyle = 'pillContainerWrapper singlePill';
        if(readonly == null) component.set('v.readonly', false);
        if(selected == null) component.set('v.selected', false);
        if(readonly || selected)
        {
            wrapperstyle += ' slds-hide';
            pillstyle += ' noSeparator';
        }
        else pillstyle += ' slds-hide';
        if(readonly) pillstyle += ' container-readonly';
        component.set('v.wrapperstyle', wrapperstyle);
        component.set('v.pillstyle', pillstyle);
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
            selected = component.get('v.selected'),
            otherchanged = component.get('v.otherchanged'),
            searchmobile = component.get('v.mobilesearch'),
            contentstyle = 'contentWrapper slds-box--border',
            searchstyle = 'undefined lookup__menu uiAbstractList uiAutocompleteList uiInput uiAutocomplete uiInput--default uiInput--lookup';
        if(focused && !searchmobile) {
            if(!selected) { 
                contentstyle += ' focused';
                if(otherchanged) this.search(component);
            }
        }
        if(!focused || searchmobile || esc) searchstyle = 'invisible ' + searchstyle;
        component.set('v.searchstyle', searchstyle);
        component.set('v.contentstyle', contentstyle);
    },
    showlisterror : function(component) {
        var haserror = component.get('v.haserror'),
            selected = component.get('v.selected'),
            focused = component.get('v.focused'),
            search = component.get('v.search'),
            autoerror = component.get('v.autoerror');
        if(!autoerror) return;
        if(haserror == false && focused == false && selected == false && search != null && search != '')
            component.set('v.listerror', ['An invalid option has been chosen.']);
        else component.set('v.listerror', null);
    },
    changesearchmodal : function(component) {
        if(component.get('v.searchin') && component.get('v.issearch')) {
            component.set('v.mobilesearch', this.ismobile);
            component.set('v.desktopsearch', !this.ismobile);
        }
        else {
            component.set('v.mobilesearch', false);
            component.set('v.desktopsearch', false);
        }
    },
    changesearchin : function(component) {
        var searchin = component.get('v.searchin'),
            search = component.get('v.search'),
            searchinstyle = '',
            searchinbuttonstyle = 'searchButton itemContainer slds-lookup__item-action--label slds-text-link--reset slds-grid slds-grid--vertical-align-center slds-truncate forceSearchInputLookupDesktopActionItem lookup__header';
        if(searchin && search != null && search.length > 1) {
            searchinbuttonstyle += ' highlighted';
            component.set('v.hover', null);
        }
        else searchinstyle = 'hidden';
        component.set('v.searchinstyle', searchinstyle);
        component.set('v.searchinbuttonstyle', searchinbuttonstyle);
    },
    changehoveritem : function(component) {
        var searchin = component.get('v.searchin'),
            search = component.get('v.search'),
            options = component.get('v.options'),
            hover = component.get('v.hover'),
            i,
            searchinbuttonstyle = 'searchButton itemContainer slds-lookup__item-action--label slds-text-link--reset slds-grid slds-grid--vertical-align-center slds-truncate forceSearchInputLookupDesktopActionItem lookup__header';
        if(searchin && search != null && search.length > 1) {
            if(hover != null && options != null) {
				var length = options.length;
                for(i = 0; i < length; i++)
                    if(options[i].id == hover)
                        break;
                if(i == length) searchinbuttonstyle += ' highlighted';
            }
            else searchinbuttonstyle += ' highlighted';
            component.set('v.searchinbuttonstyle', searchinbuttonstyle);
        }
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
    checkError : function(component) {
        var haserror = component.get('v.haserror'),
            listerror = component.get('v.listerror'),
            style = 'uiInput forceSearchInputLookupDesktop uiInput--default',
            error = false;
        if(haserror || (listerror != null && listerror.length > 0)) {
            style += ' has-error';
            error = true;
        }
        component.set('v.error', error);
        component.set('v.mainstyle', style);
    },
    onenter : function(component) {
        var options = component.get('v.options'),
            hover = component.get('v.hover'),
            searchin = component.get('v.searchin'),
            search = component.get('v.search'), i;
        if(hover != null && options != null) {
            var length = options.length;
            for(i = 0; i < length; i++)
                if(options[i].id == hover) {
                    this.setvalue(component, options[i]);
                    component.set('v.selected', true);
                    break;
                }
            if(searchin && search.length > 1 && i == length)
                 this.searchin(component);
        }
        else if(searchin && search.length > 1) this.searchin(component);
    },
    searchin : function(component) {
        var desktopsearch = component.get('v.desktopsearch'),
            searchInAction = component.get('v.onSearchIn'),
            popup = component.get('v.popup');
        if(searchInAction != null) {
            $A.enqueueAction(searchInAction);
            component.set('v.isover', false);
            component.set('v.focused', false);
            component.find('input-search').getElement().blur();
        }
        else if(desktopsearch && !popup) {
            component.set('v.popup', true);
            component.find("searchModal").openModal();
        }
    },
    arrowup : function(component) {
        var options = component.get('v.options'),
            hover = component.get('v.hover'),
            searchin = component.get('v.searchin'),
            search = component.get('v.search'),
            length = 0, i, j;
        if(options != null) length = options.length;
        if(length > 0) {
            i = length - 1;
            if(hover != null) {
                for(j = 0; j < length; j++)
                    if(options[j].id == hover) {
                        if(searchin && search.length > 1 && j == 0)
                            i = -1;
                        else i = (j + length - 1) % length;
                        break;
                    }
            }
            if(i == -1) component.set('v.hover', null);
            else component.set('v.hover', options[i].id);
        }
        else component.set('v.hover', null);
        this.changehoveritem(component);
    },
    arrowdown : function(component) {
        var options = component.get('v.options'),
            hover = component.get('v.hover'),
            searchin = component.get('v.searchin'),
            search = component.get('v.search'), length = 0, i = 0, j;
        if(options != null) length = options.length;
        if(length > 0) {
            if(hover != null) {
                for(j = 0; j < length; j++)
                    if(options[j].id == hover) {
                        if(searchin && search.length > 1 && j == length - 1)
                            i = -1;
                        else i = (j + 1) % length;
                        break;
                    }
            }
            if(i == -1) component.set('v.hover', null);
            else component.set('v.hover', options[i].id);
        }
        else component.set('v.hover', null);
        this.changehoveritem(component);
    },
    opensearch : function(component) {
        var mobilemodal = component.find('mobileModal');
        if(mobilemodal) {
            component.set('v.openmobile', true);
            component.find('input-search').getElement().blur();
            mobilemodal.openModal();
        }
    }
})