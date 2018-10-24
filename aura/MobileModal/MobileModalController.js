({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    headerChange : function(component, event, helper) {
        var components = component.get('v.components');
        if(components != null)
        {
            components[0].set('v.title', component.get('v.title'));
            components[0].set('v.diableOK', component.get('v.diableOK'));
            components[0].set('v.titleOK', component.get('v.titleOK'));
            components[0].set('v.titleCancel', component.get('v.titleCancel'));
            components[0].set('v.showOk', component.get('v.showOk'));
            components[0].set('v.showCancel', component.get('v.showCancel'));
        }
    },
    bodyChange : function(component, event, helper) {
        var components = component.get('v.components'),
            spinner = component.get('v.spinner');
        if(components != null)
            components[1].set('v.spinner', spinner);
        else if(spinner) component.set('v.spinnerstyle', 'slds-spinner_container over-spinner');
        else component.set('v.spinnerstyle', 'slds-spinner_container over-spinner slds-hide');
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
        if(components != null && component.get('v.type') === 'overlay')
            components[1].hideMessage();
        else helper.hideMessage(component);
    },
    showMessage : function(component, event, helper) {
        var params = event.getParam('arguments'),
            components = component.get('v.components');
        var params = event.getParam('arguments');
        if(params)
        {
            if(components != null && component.get('v.type') === 'overlay')
                components[1].showMessage(params.title, params.type, params.list);
            else helper.showMessage(component, params.title, params.type, params.list);
        }
    }
})