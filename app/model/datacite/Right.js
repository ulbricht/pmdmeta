Ext.define('PMDMeta.model.datacite.Right', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'right',  type: 'string', mapping :function(data) {
                                return Ext.String.htmlDecode(data.firstChild.textContent);
			}},
		{name: 'uri',  type: 'string', mapping: '@rightsURI'}
	],	
	validators: {
		right: { type: 'length', min: 1 }
	},		
	asXML: function(){
		var uri="";
		var result="";
		if (this.get('uri').length>0)
			uri=' rightsURI="'+this.get('uri')+'"';
		
		if (this.get('right')  && this.get('right').length>0)
			result='<rights'+uri+'>'+Ext.String.htmlEncode(this.get('right'))+'</rights>';
		return result;
	},
        asISOXML: function(){
          
            var right=this.get('right');

            var ret="";

            if (right.length==0)
                return ret;

            ret+='<gmd:resourceConstraints ';
	    if (this.get('uri').length >0)
		ret+='xlink:href="'+this.get('uri').replace(/&/g,'&amp;')+'"';
	    ret+=' >';
            ret+='<gmd:MD_Constraints>';
            ret+='<gmd:useLimitation>';
            ret+='<gco:CharacterString>'+Ext.String.htmlEncode(right)+'</gco:CharacterString>';
            ret+='</gmd:useLimitation>';
            ret+='</gmd:MD_Constraints>';
            ret+='</gmd:resourceConstraints>';  
            ret+='<gmd:resourceConstraints>';
            ret+='<gmd:MD_LegalConstraints>';
            ret+='<gmd:accessConstraints>';
            ret+='<gmd:MD_RestrictionCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_RestrictionCode" codeListValue="otherRestrictions"/>';
            ret+='</gmd:accessConstraints>';
            ret+='<gmd:otherConstraints>';
            ret+='<gco:CharacterString>'+Ext.String.htmlEncode(right)+'</gco:CharacterString>';
            ret+='</gmd:otherConstraints>';
            ret+='</gmd:MD_LegalConstraints>';
            ret+='</gmd:resourceConstraints>';   
            ret+='<gmd:resourceConstraints>';
            ret+='<gmd:MD_SecurityConstraints>';
            ret+='<gmd:classification>';
            ret+='<gmd:MD_ClassificationCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_ClassificationCode" codeListValue="unclassified"/>';
            ret+='</gmd:classification>';
            ret+='</gmd:MD_SecurityConstraints>';
            ret+='</gmd:resourceConstraints>';
            
            return ret;
            
        }
});


