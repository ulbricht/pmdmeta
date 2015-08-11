Ext.define('PMDMeta.model.escidoc.Author', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'creator',  type: 'string', mapping: 'creator'}		
    ],	
    validators: {
        name: { type: 'length', min: 1 }
    },
    asXML: function(){            
        var result="";
        if (this.get('creator').length>0) 
                result+='<dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('creator')+'</dc:creator>';			
        return result;
    }
});


