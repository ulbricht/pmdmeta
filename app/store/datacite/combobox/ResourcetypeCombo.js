Ext.define('PMDMeta.store.datacite.combobox.ResourcetypeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'ResourcetypeCombo',
    data: [
                            {abbr:'controlled source data',name:'controlled source data', qtip:'controlled source data'},	
                            {abbr:'temporary seismological network',name:'temporary seismological network', qtip:'temporary seismological network'},
                            {abbr:'magneto-telluric data',name:'magneto-telluric data', qtip:'magneto-telluric data'}						
    ]
});
