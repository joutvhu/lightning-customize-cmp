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
        if(!$A.get("$Browser.isPhone") && !$A.get("$Browser.isTablet"))
            helper.modal(component).hideMessage();
    },
    showMessage : function(component, event, helper) {
        if(!$A.get("$Browser.isPhone") && !$A.get("$Browser.isTablet")) {
            var params = event.getParam('arguments');
            helper.modal(component).showMessage(params.title, params.type, params.list);
        }
	},
    recordTypeChange : function(component, event, helper) {
        component.set('v.recordType', event.getSource().get('v.value'));
    },
    recordTypeAction : function(component, event, helper) {
        var id = event.target.dataset.key,
            recordTypes = component.get('v.recordTypes');
        if(!$A.util.isEmpty(id)) {
            for(var recordType of recordTypes) if(recordType.Id == id) {
                component.set('v.recordType', recordType);
                helper.fireaction(component, 'onSelect');
            }
        }
    },
    handleNext : function(component, event, helper) {
        helper.fireaction(component, 'onSelect');
    }
})