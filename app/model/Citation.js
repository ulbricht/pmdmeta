Ext.define('PMDMeta.model.Citation', {
    extend: 'Ext.data.Model',
    idProperty: 'url',
    fields: [
        {name: 'url',  type: 'string'},
        {name: 'citation',   type: 'string'},
        {name: 'datetimecopied',   type: 'string'}
    ],	
	validators: {
		url: { type: 'length', min: 1 },
		citation: { type: 'length', min: 1 }
	}
});


