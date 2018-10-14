({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    headerChange : function(component, event, helper) {
        var components = component.get('v.components');
        if(components != null)
            components[0].set('v.title', component.get('v.title'));
    },
    bodyChange : function(component, event, helper) {
        var components = component.get('v.components');
        if(components != null)
            components[0].set('v.titleCancel', component.get('v.titleCancel'));
    },
    handleDestroy : function(component, event, helper) {
        if(component.get('v.type') === 'body')
            component.set('v.body', null);
    },
	openModal : function(component, event, helper) {
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
	}
})