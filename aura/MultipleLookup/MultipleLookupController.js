({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    doInit : function(component, event, helper) {
        helper.init(component);
    },
    onFocus : function(component, event, helper) {
        component.set('v.focused', true);
    },
    onPaste : function(component, event, helper) {
        component.set('v.search', event.target.value);
    },
    onCut : function(component, event, helper) {
        component.set('v.search', event.target.value);
    },
    onKeyUp : function(component, event, helper) {
        var keycode = event.keyCode;
        if(keycode == 13) helper.onenter(component);
        else if(keycode == 38) helper.arrowup(component);
            else if(keycode == 40) helper.arrowdown(component);
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
    onMouseOver : function(component, event, helper) {
        helper.over(component);
    },
    onMouseOut : function(component, event, helper) {
        helper.out(component);
    },
    onBlur : function(component, event, helper) {
        helper.blur(component);
    },
    onSelectItem : function(component, event, helper) {
        helper.selectvalue(component, event);
    },
    onRemoveValue : function(component, event, helper) {
        helper.removevalue(component, event);
        helper.checkerror(component);
    },
    onSearch : function(component, event, helper) {
        helper.fireaction(component, 'onSearch');
    },
    handlerReset : function(component, event, helper) {
        helper.reset(component);
    },
    handlerSearchChange : function(component, event, helper) {
        component.set('v.esc', false);
        helper.search(component);
    },
    handlerValuesChange : function(component, event, helper) {
        helper.fireaction(component, 'onChange');
    },
    handlerIdsChange : function(component, event, helper) {
        var values = component.get('v.values'),
            ids = component.get('v.ids');
        if(ids.join(';') != helper.extractids(values).join(';'))
            helper.gets(component);
    },
    handlerErrorChange : function(component, event, helper) {
        helper.checkerror(component);
    },
    handlerFocusedChange : function(component, event, helper) {
        component.set('v.esc', false);
        helper.changefocus(component);
        helper.changelist(component);
        helper.checkerror(component);
    },
    handlerLoadingChange : function(component, event, helper) {
        helper.changelist(component);
    },
    handlerReadOnlyChange : function(component, event, helper) {
        helper.changereadonly(component);
    }
})