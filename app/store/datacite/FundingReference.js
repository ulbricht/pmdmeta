Ext.define('PMDMeta.store.datacite.FundingReference', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.FundingReference',
    storeId: 'DataCiteFundingReference',
    proxy:{
            type: 'memory',

        reader:{
                    type: 'xml',
                    record: 'fundingReferences',
                    rootProperty: 'resource'
            }
    },
    asXML: function (){
            var ret="";
            var result="";
            this.each(function(data){			
                    ret+=data.asXML();
            });

            if (ret.length>0)
                    result="<fundingReferences>"+ret+"</fundingReferences>";

            return result;
    }
});			

