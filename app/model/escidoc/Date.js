Ext.define('PMDMeta.model.escidoc.Date', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'date',  type: 'date', mapping: 'date'}
    ],	
    validators: {
        date: { type: 'length', min: 1 }
    },
    asXML: function(){            
        var result="";
        if (this.get('date').length>0) 
                result+='<dc:date xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('date')+'</dc:date>';			
        return result;
    }
});


