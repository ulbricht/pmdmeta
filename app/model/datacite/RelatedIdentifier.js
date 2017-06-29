Ext.define('PMDMeta.model.datacite.RelatedIdentifier', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'identifier',  type: 'string', mapping :function(data) {
                            if (data.firstChild && data.firstChild.textContent && data.firstChild.textContent.length >0)
				    return data.firstChild.textContent.replace(/&amp;/g,'&');
				}},
		{name: 'identifierType',   type: 'string', mapping: '@relatedIdentifierType'},
		{name: 'relation',  type: 'string', mapping: '@relationType'},
		{name: 'citation',  type: 'string'} //only used for display
	],
	validators: {
		identifier: { type: 'length', min: 1 },
		identifierType: { type: 'length', min: 1 },
		relation: { type: 'length', min: 1 }
	},		
	asXML: function(){
		var type="";
		var relation="";
		if (this.get('identifierType').length>0)
			type=' relatedIdentifierType="'+this.get('identifierType')+'"';
		if (this.get('relation').length>0)
			relation=' relationType="'+this.get('relation')+'"';		
		var result="";
		if (type.length>0 || relation.length>0 || this.get('identifier').length>0)
			result='<relatedIdentifier'+type+relation+'>'+this.get('identifier').replace(/&/g,'&amp;').trim()+'</relatedIdentifier>';
		return result;
	},
	asISOXML:function(){
		var relation=this.get('relation');
	        var identifiertype=this.get('identifierType');
	        var identifier=this.get('identifier').replace(/&/g,'&amp;').trim();
		var ret='';
		if (relation && relation.length>0 && identifier && identifier.length>0 && identifiertype && identifiertype.length>0){
			ret='<gmd:aggregationInfo>';
			ret+='<gmd:MD_AggregateInformation>';
			ret+='<gmd:aggregateDataSetIdentifier>';
			ret+='<gmd:RS_Identifier>';
			ret+='<gmd:code>';
			ret+='<gco:CharacterString>'+identifier+'</gco:CharacterString>';
			ret+='</gmd:code>';
			ret+='<gmd:codeSpace>';
			ret+='<gco:CharacterString>'+identifiertype+'</gco:CharacterString>';
			ret+='</gmd:codeSpace>';
			ret+='</gmd:RS_Identifier>';
			ret+='</gmd:aggregateDataSetIdentifier>';
			ret+='<gmd:associationType>';
			ret+='<gmd:DS_AssociationTypeCode codeList="http://datacite.org/schema/kernel-4" codeListValue="'+relation+'">'+relation+'</gmd:DS_AssociationTypeCode>';
			ret+='</gmd:associationType>';
			ret+='</gmd:MD_AggregateInformation>';
			ret+='</gmd:aggregationInfo>';
		}
		return ret;
	}
});


