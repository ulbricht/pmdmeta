Ext.define('PMDMeta.model.datacite.Size', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'size',  type: 'string', mapping :function(data) {
			    return Ext.String.htmlDecode(data.firstChild.textContent);
			}}
	],
	validators: {
		size: { type: 'length', min: 1 }
	},			
	asXML: function(){
		var result="";
		if (this.get('size') && this.get('size').length>0)
			result="<size>"+Ext.String.htmlEncode(this.get('size'))+"</size>";
		return result;
	}		
});


