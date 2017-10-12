Ext.define('PMDMeta.store.Thesaurus', {
    extend: 'Ext.data.TreeStore',
    storeId: 'Thesaurus',
    autoLoad: true,	
    proxy: {
        requestMethod: 'GET',
        type: 'ajax',
        url: 'resources/thesaurus/thesaurus.php',            
	    extraParams: {}
    }
});			

