({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    fireaction : function(component, name) {
        var action = component.get('v.' + name);
        if(action != null) $A.enqueueAction(action);
    },
    modal : function(component) {
        if($A.get("$Browser.isPhone") || $A.get("$Browser.isTablet"))
            return component.find('mobileRecordType');
        else return component.find('modalRecordType');
    }
})