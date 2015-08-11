Ext.define('PMDMeta.store.escidoc.ItemVersions', {
	extend: 'Ext.data.Store',
	model:  'PMDMeta.model.escidoc.ItemVersion',
	storeId: 'ItemVersions',
	proxy:{
		type: 'ajax',
                url: 'resources/retrieve.php',
		reader:{
			type: 'xml',		
			record: 'escidocVersions|version'
		},
                limitParam: false,
                pageParam: false,
                startParam: false
	}
});

