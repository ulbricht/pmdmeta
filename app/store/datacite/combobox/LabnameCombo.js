Ext.define('PMDMeta.store.datacite.combobox.LabnameCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Labname',
    storeId: 'LabnameCombo',
    proxy: {
        type: 'ajax',
        url : 'resources/thesaurus/eposlabnames/names.json',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true			
					
});			

