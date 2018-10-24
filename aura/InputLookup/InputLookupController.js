({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    doInit : function(component, event, helper) {
        var issearch = component.get('v.issearch');
        helper.ismobile = $A.get('$Browser.isPhone') || $A.get('$Browser.isTablet');
        helper.changesearchmodal(component);
        helper.init(component);
        helper.changefocus(component);
        helper.changelist(component);
        helper.changevalue(component);
        if(issearch) {
            helper.checkError(component);
            helper.showlisterror(component);
        }
    },
    methodReload : function(component, event, helper) {
        helper.reload(component);
        helper.init(component);
    },
    onMouseOver : function(component, event, helper) {
        helper.over(component);
    },
    onMouseOut : function(component, event, helper) {
        helper.out(component);
    },
    onFocus : function(component, event, helper) {
        component.set('v.focused', true);
    },
    onBlur : function(component, event, helper) {
        helper.blur(component);
    },
    handlerSearchChange : function(component, event, helper) {
        var issearch = component.get('v.issearch');
        component.set('v.esc', false);
        helper.changesearchin(component);
        helper.search(component);
        if(issearch) helper.showlisterror(component);
    },
    onKeyUp : function(component, event, helper) {
        var keycode = event.keyCode;
        if(keycode == 13)
            helper.onenter(component);
        else if(keycode == 38)
            helper.arrowup(component);
            else if(keycode == 40)
                helper.arrowdown(component);
                else component.set('v.search', event.target.value);
    },
    onKeyDown : function(component, event, helper) {
        var keycode = event.keyCode,
            esc = component.get('v.esc');
        if(keycode == 27 && !esc) {
            event.stopPropagation();
            component.set('v.esc', true);
        }
    },
    onPaste : function(component, event, helper) {
        component.set('v.search', event.target.value);
    },
    onCut : function(component, event, helper) {
        component.set('v.search', event.target.value);
    },
    onSearchIn : function(component, event, helper) {
        helper.searchin(component);
    },
    onSelectItem : function(component, event, helper) {
        helper.getvalue(component, event);
    },
    onUnselect : function(component, event, helper) {
        helper.unselect(component);
    },
    onAdd : function(component, event, helper) {
        var creatype = component.get('v.creatype'),
            create = component.get('v.onCreate');
        if(creatype == 'auto-create') helper.add(component);
        else if(creatype == 'click-event' && create != null) $A.enqueueAction(create);
    },
    onSearchInput : function(component, event, helper) {
        var searchmobile = component.get('v.mobilesearch');
        if(searchmobile) helper.opensearch(component);
    },
    onSearch : function(component, event, helper) {
        var searchmobile = component.get('v.mobilesearch'),
            search = component.get('v.onSearch');
        if(searchmobile) helper.opensearch(component);
        else if(search != null) $A.enqueueAction(search);
    },
    doneRendering : function(component, event, helper) {
        var searchmobile = component.get('v.mobilesearch');
        if(!searchmobile && component.get('v.focused') && component.get('v.value') == null) {
            var input = component.find('input-search');
            if(input != null && input.getElement() != null) 
                input.getElement().focus();
        }
    },
    handlerValueChange : function(component, event, helper) {
        var value = component.get('v.value'),
            data = component.get('v.data');
        if(value == null) component.set('v.selected', false);
        else if(value.id != null && value.id != '' && value.value != null)
            component.set('v.selected', true);
        if(value != null && value.id != null && value.id != '' && value != data)
            helper.changedata(component, value);
        else {
            var change = component.get('v.onChange');
            if(change != null) $A.enqueueAction(change);
        }
    },
    handlerLimitChange : function(component, event, helper) {
        helper.search(component);
    },
    handlerReadOnlyChange : function(component, event, helper) {
        helper.changevalue(component);
    },
    handlerSelectedChange : function(component, event, helper) {
        var issearch = component.get('v.issearch');
        helper.changefocus(component);
        helper.changevalue(component);
        if(issearch)
            helper.showlisterror(component);
    },
    handlerFocusedChange : function(component, event, helper) {
        var issearch = component.get('v.issearch');
        component.set('v.esc', false);
        helper.changefocus(component);
        helper.changelist(component);
        if(issearch)
            helper.showlisterror(component);
    },
    handlerLoadingChange : function(component, event, helper) {
        helper.changelist(component);
    },
    handlerErrorChange : function(component, event, helper) {
        var issearch = component.get('v.issearch');
        if(issearch) {
            helper.checkError(component);
            helper.showlisterror(component);
        }
    },
    handlerListErrorChange : function(component, event, helper) {
        var issearch = component.get('v.issearch');
        if(issearch)
            helper.checkError(component);
    },
    handlerSearchInChange : function(component, event, helper) {
        helper.changesearchmodal(component);
        helper.changesearchin(component);
    },
    handlerOtherChange : function(component, event, helper) {
        component.set('v.otherchanged', true);
    },
    handlerESCChange :function(component, event, helper) {
        helper.changefocus(component);
    },
    onOverItem : function(component, event, helper) {
        var id = helper.dataset(event, 'id');
        component.set('v.hover', id);
        helper.changehoveritem(component);
    },
    onOutItem : function(component, event, helper) {
        component.set('v.hover', null);
        helper.changehoveritem(component);
    },
    searchInClosed : function(component, event, helper) {
        var value = component.get('v.selectValue'),
            selectId = component.get('v.selectId');
        component.set('v.popup', false);
        if(value) {
            helper.setvalue(component, value);
            component.set('v.selected', true);
        }
        else if(selectId) helper.get(component, selectId);
        component.find('input-search').getElement().focus();
    },
    searchMobileClosed : function(component, event, helper) {
        var value = component.get('v.selectValue');
        component.set('v.search', '');
        if(value) {
            helper.setvalue(component, value);
            component.set('v.selected', true);
        }
        component.find('input-search').getElement().blur();
        component.set('v.openmobile', false);
    },
    setFocusAfterSave :function(component, event, helper) {
        component.set('v.focused',false);
    },
    handleFocus :function(component, event, helper) {
        var input = component.find('input-search');
        if(input && input.getElement() && document.activeElement != input.getElement())
            input.getElement().focus();
    }
})