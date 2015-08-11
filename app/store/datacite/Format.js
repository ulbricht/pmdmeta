Ext.define('PMDMeta.store.datacite.Format', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Format',
    storeId: 'DataCiteFormat',
    proxy:{
            type: 'memory',

        reader:{
                    type: 'xml',
                    record: 'format',
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
                    result="<formats>"+ret+"</formats>";

            return result;
    }
});			

