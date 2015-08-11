Ext.define('PMDMeta.store.datacite.ResourceOpt', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.ResourceOpt',
    storeId: 'DataCiteResourceOpt',    
    proxy:{
            type: 'memory',

        reader:{
                type: 'xml',
                record: 'resource',
                rootProperty: 'resource'
                }
        },
    asXML: function (param){
            return this.getAt(0).asXML(param);		
    }
});

