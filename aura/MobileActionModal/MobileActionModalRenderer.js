({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    render : function(cmp, helper) {
        var ret = this.superRender();
        var type = cmp.get('v.type');
        if(type === 'header')
            return ret[0];
        else if(type === 'body')
            return ret[1];
        return ret[2];
    }
})