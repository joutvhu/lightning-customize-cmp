({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    openModal : function(component) {
        var helper = this,
            size = component.get('v.size'),
            css = 'uiModal--medium forceModal';
        component.set('v.status', 'opening');
        if(size == 'large') css = 'uiModal--large forceModal';
        else if(size == 'small') css = 'uiModal--small forceModal';
        $A.createComponents([
            ['c:DesktopModal', {
                type: 'herder',
                title: component.get('v.title')
            }],
            ['c:DesktopModal', {
                type: 'body',
                showTime: component.get('v.showTime'),
                body: component.get('v.body')
            }],
            ['c:DesktopModal', {
                type: 'footer',
                showCancel: component.get('v.showCancel'),
                showSaveAndNew: component.get('v.showSaveAndNew'),
                showOk: component.get('v.showOk'),
                diableOK: component.get('v.diableOK'),
                diableSaveAndNew: component.get('v.diableSaveAndNew'),
                titleCancel: component.get('v.titleCancel'),
                titleSaveAndNew: component.get('v.titleSaveAndNew'),
                titleOK: component.get('v.titleOK'),
                okAction: component.get('v.okAction'),
                saveAndNewAction: component.get('v.saveAndNewAction'),
                cancelAction: component.get('v.cancelAction')
            }]
        ], function(components, status) {
            if (status === 'SUCCESS')
            {
                component.set('v.components', components);
                component.set('v.overlay', component.find('overlayLib').showCustomModal({
                    header : components[0],
                    body : components[1],
                    footer : components[2],
                    showCloseButton : true,
                    cssClass : css,
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
    },
    hideMessage : function(component) {
        component.set('v.isShowMessage', false);
        component.set('v.messageStatus', 'hide');
    },
    showMessage : function(component, title, type, list) {
        component.set('v.message', title);
        component.set('v.messageType', type);
        if(list)
        {
            component.set('v.messageList', list);
            component.set('v.showMessageList', list.length > 0);
        }
        else component.set('v.showMessageList', false);
        var time = component.get('v.showTime');
        component.set('v.isShowMessage', true);
        component.set('v.messageStatus', 'show');
        if(time > 0) window.setTimeout(
            $A.getCallback(function() {
                component.set('v.isShowMessage', false);
                component.set('v.messageStatus', 'hide');
            }), time
        );
        component.find('page-error').getElement().focus();
    }
})