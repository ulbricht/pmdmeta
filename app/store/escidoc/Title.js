Ext.define('PMDMeta.store.escidoc.Title', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.escidoc.Title',
    storeId: 'EscidocTitle',
    asXML: function (){
            var result="";
            this.each(function(data){			
                    result+=data.asXML();
            });
            return result;
    }
});			

