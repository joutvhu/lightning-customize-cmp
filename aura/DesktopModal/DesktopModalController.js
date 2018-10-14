({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    titleChange : function(component, event, helper) {
        var components = component.get('v.components');
        if(components != null)
            components[0].set('v.title', component.get('v.title'));
    },
    footerChange : function(component, event, helper) {
        var components = component.get('v.components');
        if(components != null)
        {
            components[2].set('v.diableOK', component.get('v.diableOK'));
            components[2].set('v.diableSaveAndNew', component.get('v.diableSaveAndNew'));
            components[2].set('v.titleOK', component.get('v.titleOK'));
            components[2].set('v.titleSaveAndNew', component.get('v.titleSaveAndNew'));
            components[2].set('v.titleCancel', component.get('v.titleCancel'));
        }
    },
    handleDestroy : function(component, event, helper) {
        if(component.get('v.type') === 'body')
            component.set('v.body', null);
    },
	openModal : function(component, event, helper) {
        component.set('v.isShowMessage', false);
        helper.openModal(component);
	},
    hideModal : function(component, event, helper) {
        helper.hideModal(component);
    },
    showModal : function(component, event, helper) {
        helper.showModal(component);
    },
	closeModal : function(component, event, helper) {
        helper.closeModal(component);
	},
    hideMessage : function(component, event, helper) {
        var components = component.get('v.components');
        if(components != null && component.get('v.type') === 'modal')
            components[1].hideMessage();
        else helper.hideMessage(component);
    },
    showMessage : function(component, event, helper) {
        var params = event.getParam('arguments'),
            components = component.get('v.components');
        if(params)
        {
            if(components != null && component.get('v.type') === 'modal')
                components[1].showMessage(params.title, params.type, params.list);
            else helper.showMessage(component, params.title, params.type, params.list);
        }
    }
})