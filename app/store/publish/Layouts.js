Ext.define('PMDMeta.store.publish.Layouts', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.publish.Layout',
    storeId: 'layouts',
    proxy:{
            type: 'ajax',
            url: 'resources/layoutlist.php',
            reader:{
                    type: 'xml',		
                    record: 'a'
            },
            limitParam: false,
            pageParam: false,
            startParam: false
    }
});