({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
	modal : function(component) {
        if($A.get("$Browser.isPhone") || $A.get("$Browser.isTablet"))
            return component.find("caseOverlay");
        else return component.find("caseModal");
	}
})