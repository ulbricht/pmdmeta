Ext.define('PMDMeta.store.iso.IdentificationInfo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.iso.IdentificationInfo',
    storeId: 'isoIdentificationInfo',
    proxy:{
        type: 'memory',
        reader:{
                type: 'xml',
                record: 'gmd|MD_DataIdentification'
            }
    },
    asXML: function (param){
        var ret="";
        this.each(function(data){			
                ret+=data.asXML(param);
        });				
        return ret;
    }

});			

