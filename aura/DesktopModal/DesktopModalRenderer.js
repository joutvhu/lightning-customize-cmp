({
    /*
     * @author: Giao Ho
     * @email: loveme05ye@gmail.com
     */
    render : function(cmp, helper)
    {
        var ret = this.superRender();
        var type = cmp.get('v.type');
        if(type === 'herder')
            return ret[0];
        else if(type === 'body')
            return ret[1];
        else if(type === 'footer')
            return ret[2];
        return ret[3];
    }
})