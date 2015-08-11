Ext.define('PMDMeta.model.datacite.Format', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'format',  type: 'string', mapping :function(data) {
			    return Ext.String.htmlDecode(data.firstChild.textContent);
			}}
    ],
	validators: {
		format: { type: 'length', min: 1 }
	},
	asXML: function(){
		var result="";
		if (this.get('format') && this.get('format').length>0)
			result="<format>"+Ext.String.htmlEncode(this.get('format'))+"</format>";
		return result;
	    }
});


