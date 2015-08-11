Ext.define('PMDMeta.model.datacite.AlternateIdentifier', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'identifier',  type: 'string', mapping :function(data) {
			    return data.firstChild.textContent;
			}},
        {name: 'identifierType',   type: 'string', mapping: '@alternateIdentifierType'}
    ],	
	validators: {
		identifier: { type: 'length', min: 1 },
		identifierType: { type: 'length', min: 1 }
	},    
	asXML: function(){
		var type="";
		var result="";
		if (this.get('identifierType').length>0)
			type=' alternateIdentifierType="'+this.get('identifierType')+'"';
		if (this.get('identifier') && this.get('identifier').length>0)
		result='<alternateIdentifier'+type+'>'+this.get('identifier')+'</alternateIdentifier>';
		return result;
	}
});


