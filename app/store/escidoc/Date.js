Ext.define('PMDMeta.store.escidoc.Date', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.escidoc.Date',
    storeId: 'EscidocDate',
    asXML: function (){
            var result="";
            this.each(function(data){			
                    result+=data.asXML();
            });	
            return result;
    }
});			

