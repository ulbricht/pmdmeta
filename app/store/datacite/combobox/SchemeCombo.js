Ext.define('PMDMeta.store.datacite.combobox.SchemeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.ComboboxURI',
    storeId: 'SchemeCombo',
    data: [
        {abbr:'Instrument',name:'Instrument'},
        {abbr:'Platform',name:'Platform'},
        {abbr:'Theme',name:'Theme'}
]});			

