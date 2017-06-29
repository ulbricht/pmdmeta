Ext.define('PMDMeta.model.datacite.Author', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',  type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('creatorName',data);
                    if (name)
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }},
        {name: 'nameIdentifier',   type: 'string', mapping: 'nameIdentifier'},
        {name: 'nameIdentifierScheme',   type: 'string', mapping: 'nameIdentifier@nameIdentifierScheme'},
        {name: 'nameIdentifierSchemeURI',   type: 'string', mapping: 'nameIdentifier@schemeURI'},
        {name: 'role',   type: 'string'},	        
        {name: 'affiliation',   type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('affiliation',data);
                    if (name)
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }},
        {name: 'position', type: 'string'} 
    ],	validators: {
		name: { type: 'length', min: 1 }
	},
	asXML: function(){
		var type="";
		var result="";
		if (this.get('name').length>0)
			result+='<creatorName>'+Ext.String.htmlEncode(this.get('name'))+'</creatorName>';
			
		if (this.get('nameIdentifier') && this.get('nameIdentifier').length>0){
			var scheme="";
			var uri="";
			if (this.get('nameIdentifierScheme') && this.get('nameIdentifierScheme').length>0)
				scheme=' nameIdentifierScheme="'+this.get('nameIdentifierScheme')+'"';
			if (this.get('nameIdentifierSchemeURI') && this.get('nameIdentifierSchemeURI').length>0)
				uri=' schemeURI="'+this.get('nameIdentifierSchemeURI')+'"';			

			if (scheme.length>0 || uri.length>0 || this.get('nameIdentifier').length>0)
				result+='<nameIdentifier'+scheme+uri+'>'+this.get('nameIdentifier').trim()+'</nameIdentifier>'
		}
		if (this.get('affiliation') && this.get('affiliation').length>0){
			result+='<affiliation>'+Ext.String.htmlEncode(this.get('affiliation'))+'</affiliation>'
		}		
		if (result.length>0)
			return '<creator>'+result+'</creator>';

		return "";
	},
        asContributorXML: function(){
		var result="";
                var contributorname="";
                var nameidentifier="";
                var affiliation="";
                
                if (!this.get('role') || this.get('role').length==0)
                    return "";
            
            
		if (this.get('name').length>0)
		contributorname+='<contributorName>'+Ext.String.htmlEncode(this.get('name'))+'</contributorName>';
			
		if (this.get('nameIdentifier') && this.get('nameIdentifier').length>0){
			var scheme="";
			var uri="";
			if (this.get('nameIdentifierScheme') && this.get('nameIdentifierScheme').length>0)
				scheme=' nameIdentifierScheme="'+this.get('nameIdentifierScheme')+'"';
			if (this.get('nameIdentifierSchemeURI') && this.get('nameIdentifierSchemeURI').length>0)
				uri=' schemeURI="'+this.get('nameIdentifierSchemeURI')+'"';
			if (scheme.length>0 || uri.length>0 || this.get('nameIdentifier').length>0)
				nameidentifier+='<nameIdentifier'+scheme+uri+'>'+this.get('nameIdentifier').trim()+'</nameIdentifier>'
		}
		if (this.get('affiliation') && this.get('affiliation').length>0){
			affiliation+='<affiliation>'+Ext.String.htmlEncode(this.get('affiliation'))+'</affiliation>'
		}

                if (!this.get('role') || this.get('role').length==0){
                    if (contributorname.length>0 || nameidentifier.length>0 || affiliation.length>0)                    
                        result+='<contributor>'+contributorname+nameidentifier+affiliation+'</contributor>';                    
                }else{
                    Ext.each(this.get('role').split(","), function (role){
                        var type="";
                        if (role.length>0)
                            type=' contributorType="'+role+'"';
                        if (contributorname.length>0 || nameidentifier.length>0 || affiliation.length>0 || type.length>0)                    
                            result+='<contributor'+type+'>'+contributorname+nameidentifier+affiliation+'</contributor>';
                    });
                }
                
                
		return result;
	},
        asISOXML: function(){
            var ret="";
            
            if (this.get('name').length==0 && this.get('name').length==0)
                return ret;

	    var iduri="";

            if (this.get('nameIdentifierScheme') && this.get('nameIdentifier')){
	 	    var scheme=this.get('nameIdentifierScheme').toUpperCase();
 		    var identifier=this.get('nameIdentifier').trim()
		    if (scheme=='ORCID'){
			iduri="http://orcid.org/"+identifier;
		    }else if (scheme=='ISNI'){
			iduri="http://isni.org/isni/"+identifier;
		    }else if (scheme=='SCOPUS'){
			iduri="https://www.scopus.com/authid/detail.uri?authorId="+identifier;
		    }else if (scheme=='RESEARCHER.ID'){
			iduri="www.researcherid.com/rid/"+identifier;
		    }

		    if (iduri.length >0)
			iduri='xlink:href="'+iduri+'"';	
	     }
            
             ret+='<gmd:citedResponsibleParty '+iduri+' >';
             ret+='<gmd:CI_ResponsibleParty>';
             if (this.get('name').length>0){             
                ret+='<gmd:individualName>';
                ret+='<gco:CharacterString>'+Ext.String.htmlEncode(this.get('name'))+'</gco:CharacterString>';
                ret+='</gmd:individualName>';
             }
             
             if (this.get('affiliation').length>0){
                ret+='<gmd:organisationName>';
                ret+='<gco:CharacterString>'+Ext.String.htmlEncode(this.get('affiliation'))+'</gco:CharacterString>';
                ret+='</gmd:organisationName>';
             }
             if (this.get('position').length>0){
                ret+='<gmd:positionName><gco:CharacterString>';
                ret+=this.get('position');
                ret+='</gco:CharacterString></gmd:positionName>'
             }             
             
             ret+='<gmd:role>';
             ret+='<gmd:CI_RoleCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_RoleCode" codeListValue="author" >author</gmd:CI_RoleCode>';
             ret+='</gmd:role>';
             ret+='</gmd:CI_ResponsibleParty>';
             ret+='</gmd:citedResponsibleParty>';
            
            return ret;
        },
        asEscidocXML: function(){
            var result="";
            if (this.get('name').length>0) 
                    result+='<dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('name')+'</dc:creator>';			
            return result;           
        }, 
        asDifXML: function(){
            return Ext.String.htmlEncode(this.get('name'));
        },
        getKey: function(){
            var ret=this.get('name').trim()+this.get('nameIdentifier').trim()+this.get('nameIdentifierScheme').trim()+this.get('nameIdentifierSchemeURI')+this.get('affiliation').trim();
            if (ret.length>0)
                return ret;
            else
                return null;
        }
});


