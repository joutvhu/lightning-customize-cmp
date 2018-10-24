({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
	search : function(component) {
        var helper = this,
            search = component.get('v.search'),
            limit = component.get('v.limit'),
        	action = component.get('c.find'),
            other = component.get('v.other'),
            opened = component.get('v.opened');
        if(search) search = search.trim();
        this.loading(component, true);
        action.setParams({
            finder : component.get('v.finder'),
            search_c : search,
            limit_c : limit,
            other : other
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                var value = response.getReturnValue();
                search = component.get('v.search');
                if(search) search = search.trim();
                if(value.search == search) {
                    component.set('v.options', value.data);
                    if(value.data.length == 0) {
                        component.set('v.searchnoresult', value.search);
                        component.set('v.noresultstyle', 'noresults slds-item slds-p-around--small');
                    }
                    else component.set('v.noresultstyle', 'noresults slds-item slds-p-around--small slds-hide');
                }
            }
            helper.loading(component, false);
            if(!opened) component.set('v.opened', true);
        });
        $A.enqueueAction(action);
	},
    dataset : function(event, key) {
        var path = event.path || this.composedPath(event.target);
        for(var i = 0; i < path.length; i++)
            if(path[i].dataset[key] != null)
                return path[i].dataset[key];
        return null;
    },
    getvalue : function(component, event) {
        var id = this.dataset(event, 'id');
        var options = component.get('v.options');
        for(var i = 0; i < options.length; i++)
            if(options[i].id == id) {
                component.set('v.value', options[i]);
                component.find("searchMobile").closeModal();
                break;
            }
    },
    loading : function(component, isload) {
        var totalloading = component.get('v.totalloading');
        if(totalloading == null) totalloading = 0;
        if(isload) totalloading++;
        else totalloading--;
        if(totalloading < 0) totalloading = 0;
        component.set('v.totalloading', totalloading);
        if(totalloading == 0)
            component.set('v.loading', false);
        else component.set('v.loading', true);
    },
    composedPath: function(el) {
        if(el == null) return null;
        var path = [];
        while (el) {
            path.push(el);
            if (el.tagName === 'HTML') {
                path.push(document);
                path.push(window);
                return path;
           }
           el = el.parentElement;
        }
    },
})