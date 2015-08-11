Ext.define('PMDMeta.model.escidoc.Title', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'title',  type: 'string', mapping : 'title'}
	],validators: {
		title: { type: 'length', min: 1 }
	},
	asXML: function(){            
		var result="";
		if (this.get('title').length>0) 
			result+='<dc:title xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('title')+'</dc:title>';			
		return result;
	}
});


