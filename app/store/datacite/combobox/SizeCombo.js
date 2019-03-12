Ext.define('PMDMeta.store.datacite.combobox.SizeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'SizeCombo',
    data: [
        {abbr:'<16MB', name:'<16MB', qtip:''},
        {abbr:'<50MB', name:'<50MB', qtip:''},
        {abbr:'~1GB', name:'~1GB', qtip:''},
        {abbr:'~10GB', name:'~10GB', qtip:''},
        {abbr:'~250GB', name:'~250GB', qtip:''},
        {abbr:'~500GB', name:'~500GB', qtip:''},
        {abbr:'~1TB', name:'~1TB', qtip:''}
    ]
});


