Ext.define('PMDMeta.model.publish.Layout', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'href',  type: 'string', mapping: '@href'},
                {name: 'id',  type: 'string', mapping :function(data) {
                            if (data.firstChild)
        			    return data.firstChild.textContent;
		}}
    ]
});


