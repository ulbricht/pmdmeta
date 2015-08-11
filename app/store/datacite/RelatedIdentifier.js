Ext.define('PMDMeta.store.datacite.RelatedIdentifier', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.RelatedIdentifier',
    storeId: 'DataCiteRelatedIdentifier',    
    proxy:{
            type: 'memory',

        reader:{
                type: 'xml',
                record: 'relatedIdentifier'
                }
        },
    asXML: function (){
            var ret="";
            var result="";
            this.each(function(data){			
                    ret+=data.asXML();
            });

            if (ret.length>0)
                    result="<relatedIdentifiers>"+ret+"</relatedIdentifiers>";

            return result;
    }
});			

