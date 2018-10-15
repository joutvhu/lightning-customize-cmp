({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    init : function(component) {
        var available = component.get('v.availableActions'),
            buttons = component.get('v.customButtons'),
            customButtons = component.get('v.customButtons'),
            show = [], custom = false, buttons = [], i;
        if(customButtons && available.includes('NEXT')) {
            buttons = JSON.parse(customButtons);
            if(buttons && buttons.length > 0) {
                for(i of buttons) {
                    if(typeof i == 'string' || (i.name && (i.name == 'pause' || i.name == 'back' || i.name == 'resume' || i.name == 'next' || i.name == 'finish'))) {
                        if(typeof i == 'string')
                            show = this.standardButton(component, i, show);
                        else show = this.standardButton(component, i.name, show, i);
                    } else if(typeof i == 'object' && i.name && i.label) {
                        if(!i.variant) i.variant = 'neutral';
                        show.push(i);
                    }
                }
                custom = true;
            }
        }
        if(!custom) {
            show = this.standardButton(component, 'pause', show);
            show = this.standardButton(component, 'back', show);
            show = this.standardButton(component, 'resume', show);
            show = this.standardButton(component, 'next', show);
            show = this.standardButton(component, 'finish', show);
        }
        component.set('v.buttons', show);
    },
    standardButton : function(component, name, list, custom) {
        var available = component.get('v.availableActions'),
            pauseLabel = component.get('v.pauseLabel'),
            backLabel = component.get('v.backLabel'),
            resumeLabel = component.get('v.resumeLabel'),
            nextLabel = component.get('v.nextLabel'),
            finishLabel = component.get('v.finishLabel'),
            button = null;
        if(name == 'pause' && available.includes('PAUSE'))
            button = { name : 'PAUSE', label : pauseLabel, variant : 'neutral' };
        else if(name == 'back' && available.includes('BACK'))
            button = { name : 'BACK', label : backLabel, variant : 'neutral' };
        else if(name == 'resume' && available.includes('RESUME'))
            button = { name : 'RESUME', label : resumeLabel, variant : 'neutral' };
        else if(name == 'next' && available.includes('NEXT'))
            button = { name : 'NEXT', label : nextLabel, variant : 'brand' };
        else if(name == 'finish' && available.includes('FINISH'))
            button = { name : 'FINISH', label : finishLabel, variant : 'brand' };
        if(button) {
            if(custom) {
                if(custom.label) button.label = custom.label;
                if(custom.variant) button.variant = custom.variant;
            }
            list.push(button);
        }
        return list;
    },
    click : function(component, event) {
        var action = event.getSource().get('v.name'),
            navigate = component.get('v.navigateFlow');
        component.set('v.action', action);
        if(action == 'PAUSE' || action == 'BACK' || action == 'RESUME' || action == 'NEXT' || action == 'FINISH')
            navigate(action);
        else navigate('NEXT');
    }
})