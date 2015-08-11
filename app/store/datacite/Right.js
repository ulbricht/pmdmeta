Ext.define('PMDMeta.store.datacite.Right', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Right',
    storeId: 'DataCiteRight',    
    proxy:{
            type: 'memory',

        reader:{
                type: 'xml',
                record: 'rights',
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
                    result="<rightsList>"+ret+"</rightsList>";

            return result;
    },
    asISOXML: function (){
        var ret="";
        this.each(function(data){			
                ret+=data.asISOXML();
        });
        return ret;
    }
});			

