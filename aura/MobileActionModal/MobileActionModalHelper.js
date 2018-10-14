({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    openModal : function(component) {
        var helper = this;
        component.set('v.status', 'opening');
        $A.createComponents([
            ['c:MobileActionModal', {
                type: 'header',
                title: component.get('v.title')
            }],
            ['c:MobileActionModal', {
                type: 'body',
                body: component.get('v.body'),
                showCancel: component.get('v.showCancel'),
                titleCancel: component.get('v.titleCancel'),
                cancelAction: component.get('v.cancelAction')
            }]
        ], function(components, status) {
            if (status === "SUCCESS")
            {
                component.set('v.components', components);
                component.set('v.overlay', component.find('overlayLib').showCustomModal({
                    header : components[0],
                    body : components[1],
                    showCloseButton : false,
                    cssClass : 'cMobileActionModal forceModal forceMobileActionModal',
                    closeCallback : function() {
                        var closed = component.get('v.closedAction');
                        if(closed != null) $A.enqueueAction(closed);
                        component.set('v.status', 'closed');
                    }
                }));
                component.set('v.status', 'opened');
            }
        });
    },
    hideModal : function(component) {
        var over = component.get('v.overlay');
        component.set('v.status', 'hiding');
        if(over) over.then(function (overlay) {
            overlay.hide();
            component.set('v.status', 'hided');
        });
    },
    showModal : function(component) {
        var over = component.get('v.overlay');
        component.set('v.status', 'showing');
        if(over) over.then(function (overlay) {
            overlay.show();
            component.set('v.status', 'opened');
        });
    },
    closeModal : function(component) {
        var over = component.get('v.overlay');
        component.set('v.status', 'closing');
        if(over) over.then(function (overlay) {
            overlay.close();
        });
    }
})