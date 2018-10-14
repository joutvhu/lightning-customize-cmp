({
	changeStyle : function(component) {
        var islist = component.get('v.islist'),
            hide = component.get('v.hide'),
            sclass = component.get('v.class'),
            style = '';
		if(hide) style = 'hidden ';
		if(islist) style += 'forceListViewPlaceholder';
        else style += 'forcePlaceholder';
        if(sclass != null && sclass.length > 0) style += ' ' + sclass;
        component.set('v.mainstyle', style);
	}
})