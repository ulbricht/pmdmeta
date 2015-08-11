Ext.define('PMDMeta.model.publish.Review', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'href',  type: 'string', mapping: '@href'},
                {name: 'id',  type: 'string', mapping :function(data) {
			    return data.firstChild.textContent;
		}}
    ]
});


