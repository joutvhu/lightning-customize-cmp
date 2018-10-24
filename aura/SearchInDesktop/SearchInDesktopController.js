({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    openModal : function(component, event, helper) {
        component.set('v.selectId', null);
        component.set('v.value', null);
        component.set('v.selectValue', null);
		component.find("searchModal").openModal();
        helper.search(component);
	},
	closeModal : function(component, event, helper) {
		component.find("searchModal").closeModal();
	},
	onClosed : function(component, event, helper) {
        var closed = component.get('v.closedAction');
        component.set('v.search', '');
        if(closed != null) $A.enqueueAction(closed);
	},
    onSearch : function(component, event, helper) {
        helper.search(component);
	},
    onChange : function(component, event, helper) {
        var value = component.get('v.selectValue');
        if(value != null && value.id != null) {
            component.set('v.selectId', value.id);
            component.set('v.value', value);
            component.find("searchModal").closeModal();
        }
	},
    onLoadMore : function(component, event, helper) {
        var data = component.get('v.data'),
            sortedBy = component.get('v.sortedBy'),
            sortedDirection = component.get('v.sortedDirection'),
            other = component.get('v.other'),
            options = {
                offset : 0,
                lastId : null,
                other : other
            };
        if(!$A.util.isEmpty(data)) {
            options.offset = data.length,
            options.lastId = data[data.length - 1].Id;
            if(!$A.util.isEmpty(sortedBy) && !$A.util.isEmpty(sortedDirection)) {
                options.sortBy = sortedBy;
                options.sortDirection = sortedDirection;
                options.lastSort = data[data.length - 1][sortedBy];
            }
            event.getSource().set("v.isLoading", true);
            helper.fetchdata(component, options, function(response) {
                if (response.getState() === 'SUCCESS') {
                    var value = response.getReturnValue();
                    if(value.length > 0) {
                        data = helper.concat(data, value);
                        component.set('v.data', data);
                    }
                }
                event.getSource().set("v.isLoading", false);
            }, false);
        }
    },
    onRowSelection : function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows'),
            showFields = component.get('v.showFields');
        if(selectedRows.length > 0 && selectedRows[0].Id != null) {
            component.set('v.selectId', selectedRows[0].Id);
            if(showFields) {
                component.set('v.value', {
                    id : selectedRows[0].Id,
                    title : selectedRows[0][showFields.primaryField],
                    find : selectedRows[0][showFields.secondaryField],
                    value : selectedRows[0]
                });
            }
            component.find("searchModal").closeModal();
        }
    },
    onSort : function(component, event, helper) {
        var fieldName = event.getParam('fieldName'),
            sortDirection = event.getParam('sortDirection'),
            other = component.get('v.other'),
            options = {
                offset : 0,
                sortBy : fieldName,
                sortDirection : sortDirection,
                other : other
            };
        component.set('v.spinning', true);
        if(!$A.util.isEmpty(fieldName) && !$A.util.isEmpty(sortDirection)) {
            helper.fetchdata(component, options, function(response) {
                if (response.getState() === 'SUCCESS') {
                    var value = response.getReturnValue();
                    component.set('v.data', value);
                    component.set('v.sortedBy', fieldName);
                    component.set('v.sortedDirection', sortDirection);
                }
                component.set('v.spinning', false);
            }, true);
        }
    },
    handlerColumnsChange : function(component, event, helper) {
        helper.sortablechange(component);
    },
    handlerLoadingChange : function(component, event, helper) {
        helper.stylechange(component);
    },
    handlerResultChange : function(component, event, helper) {
        helper.stylechange(component);
    }
})