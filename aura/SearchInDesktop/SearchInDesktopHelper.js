({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    fetchdata : function(component, options, callback, enableload) {
		var action = component.get('c.search'),
            search = component.get('v.search'),
            limit = component.get('v.limit');
        if(search) search = search.trim();
        action.setParams({
            finder : component.get('v.finder'),
            search_c : search,
            limit_c : limit,
            options : options
        });
        action.setCallback(this, function(response) {
            callback(response);
            if (response.getState() === 'SUCCESS') {
                var value = response.getReturnValue();
                if(value != null) {
                    if(value.length < limit) component.set('v.enableLoading', false);
                    else if(enableload) component.set('v.enableLoading', true);
                }
            }
        });
        $A.enqueueAction(action);
    },
	search : function(component) {
        var helper = this,
            search = component.get('v.search'),
            other = component.get('v.other'),
            options = {
                offset : 0,
                lastId : null,
                other : other
            };
        if(search) search = search.trim();
        component.set('v.loading', true);
        this.fetchdata(component, options, function(response) {
            if (response.getState() === 'SUCCESS') {
                var value = response.getReturnValue();
                component.set('v.data', value);
                component.set('v.sortedBy', '');
                component.set('v.sortedDirection', component.get('v.defaultSortDirection'));
                if(value.length == 0) {
                    component.set('v.searchNoResult', search);
                    component.set('v.noResult', true);
                }
                else component.set('v.noResult', false);
            }
            component.set('v.loading', false);
        }, true);
    },
    concat : function(src1, src2) {
        var i, result = [];
        for(i = 0; i < src1.length; i++)
            result.push(src1[i]);
        for(i = 0; i < src2.length; i++)
            result.push(src2[i]);
        return result;
    },
    sortablechange : function(component) {
        var columns = component.get('v.columns'),
            sortables = [], i;
        for(i = 0; i < columns.length; i++) {
            if(columns[i].sortable) sortables.push(columns[i]);
        }
        component.set('v.sortables', sortables);
    },
    stylechange : function(component) {
        var loading = component.get('v.loading'),
            noresult = component.get('v.noResult'),
            holderstyle = 'page-placeholder',
            resultstyle = 'forceSearchResultsGridView forceSearchNoResults slds-text-body--regular slds-page-header slds-theme_default';
        if(loading) {
            resultstyle += ' slds-hide';
        }
        else {
            holderstyle += ' slds-hide';
            if(!noresult) resultstyle += ' slds-hide';
        }
        component.set('v.holderstyle', holderstyle);
        component.set('v.resultstyle', resultstyle);
    }
})