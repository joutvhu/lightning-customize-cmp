({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
	openModal : function(component, event, helper) {
		helper.modal(component).openModal();
	},
	hideModal : function(component, event, helper) {
		helper.modal(component).hideModal();
	},
	showModal : function(component, event, helper) {
		helper.modal(component).showModal();
	},
	closeModal : function(component, event, helper) {
		helper.modal(component).closeModal();
	},
	hideMessage : function(component, event, helper) {
		helper.modal(component).hideMessage();
	},
	showMessage : function(component, event, helper) {
        var params = event.getParam('arguments');
		helper.modal(component).showMessage(params.title, params.type, params.list);
	}
})