Ext.define('PMDMeta.store.datacite.ResourceOptAndTitle', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.ResourceOptAndTitle',
    storeId: 'DataCiteResourceOptAndTitle',
    proxy:{
            type: 'memory'
    }    
});

