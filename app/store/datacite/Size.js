Ext.define('PMDMeta.store.datacite.Size', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Size',
    storeId: 'DataCiteSize',
    proxy:{
            type: 'memory',

        reader:{
                type: 'xml',
                record: 'size',
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
                    result="<sizes>"+ret+"</sizes>";

            return result;
    }
});			

