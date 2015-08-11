Ext.define('PMDMeta.store.datacite.combobox.DatasetStatusCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'DatasetStatusCombo',
    data: [
		{abbr:'completed',name:'Completed', qtip:'The production of the data has been completed. (e.g. raw data that is not ongoing, completed model )'},	
//		{abbr:'historicalArchive',name:'Historical Archive', qtip:'Data has been stored in an offline storage facility.'},	
//		{abbr:'obsolete',name:'Obsolete', qtip:'Data is no longer relevant '},		
		{abbr:'onGoing',name:'Ongoing', qtip:'Data is continually being updated.(e.g.satellite dataset that continues to be augmented )'},	
		{abbr:'planned',name:'Planned', qtip:'A fixed date has been established upon or by which the data will be created or updated (e.g. scheduled cruise)'}
//		,
//		{abbr:'required',name:'Issued', qtip:'Data needs to be generated or updated'},
//		{abbr:'underDevelopment',name:'Valid', qtip:'Data is currently in the process of being created (e.g. a dataset that is not in production yet, but will be)'}
]
});			

