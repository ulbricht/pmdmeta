Ext.define('PMDMeta.store.datacite.SubjectGEMET', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Subject',
    storeId: 'DataCiteSubjectGEMET',
    proxy:{
            type: 'memory',

        reader:{
            type: 'xml',
            record: 'subject'
        }
    },
    asXML: function (){
        var ret="";
        var result="";
        this.each(function(data){			
                ret+=data.asXML();
        });

        if (ret.length>0)
                result="<subjects>"+ret+"</subjects>";

        return result;
    }
});			

