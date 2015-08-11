Ext.define('PMDMeta.store.dif.SpatialCoverage', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.dif.SpatialCoverage',
    storeId: 'difSpatialCoverage',
    proxy:{
        type: 'memory',
        reader:{
                type: 'xml',
                record: 'dif|Spatial_Coverage'
        }
    }
});			

