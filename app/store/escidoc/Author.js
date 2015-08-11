Ext.define('PMDMeta.store.escidoc.Author', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.escidoc.Author',
    storeId: 'EscidocAuthor',
    asXML: function (){
            var result="";
            this.each(function(data){			
                    result+=data.asXML();
            });	
            return result;
    }
});			

