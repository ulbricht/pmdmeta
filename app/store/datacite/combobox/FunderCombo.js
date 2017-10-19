Ext.define('PMDMeta.store.datacite.combobox.FunderCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.ComboboxURI',
    storeId: 'FunderCombo',
    proxy: {
        type: 'ajax',
        url : 'resources/thesaurus/fundref/funderNames.json',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true			
					
});			

