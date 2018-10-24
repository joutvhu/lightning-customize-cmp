({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    openModal : function(component, event, helper) {
		component.set('v.search', '');
        component.set('v.value', null);
		component.find("searchMobile").openModal();
        helper.search(component);
	},
    closeModal : function(component, event, helper) {
		component.find("searchMobile").closeModal();
	},
    handlerSearchChange : function(component, event, helper) {
        helper.search(component);
    },
    onSelectItem : function(component, event, helper) {
        helper.getvalue(component, event);
    },
	onClosed : function(component, event, helper) {
        var closed = component.get('v.closedAction');
        if(closed != null) $A.enqueueAction(closed);
	}
})