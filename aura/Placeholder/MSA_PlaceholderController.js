({
    /*
     * @author: giao.ho
     */
	doInit : function(component, event, helper) {
		var row = component.get('v.row'),
            list = [], i;
        for(i = 0; i < row; i++) list.push(i);
        helper.changeStyle(component);
        component.set('v.list', list);
	},
    changeIsList : function(component, event, helper) {
        helper.changeStyle(component);
    },
    changeHide : function(component, event, helper) {
        helper.changeStyle(component);
    },
    changeClass : function(component, event, helper) {
        helper.changeStyle(component);
    }
})