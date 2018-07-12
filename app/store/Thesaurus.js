Ext.define('PMDMeta.store.Thesaurus', {
    extend: 'Ext.data.TreeStore',
    storeId: 'Thesaurus',
    autoLoad: false,
    proxy: {
        requestMethod: 'GET',
	noCache: false,
        type: 'ajax',
        url: 'resources/thesaurus/thesaurus.php',            
	extraParams: {
                thesaurus1: 'gcmd',
                thesaurus2: 'gemet'
//              thesaurus3: 'eposwp16'
        }
    }
});			

