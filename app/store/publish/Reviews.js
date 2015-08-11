Ext.define('PMDMeta.store.publish.Reviews', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.publish.Review',
    storeId: 'reviews',
    proxy:{
            type: 'ajax',
            url: 'resources/reviewlist.php',
            reader:{
                    type: 'xml',		
                    record: 'a'
            },
            limitParam: false,
            pageParam: false,
            startParam: false
    }
});