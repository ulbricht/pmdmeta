Ext.define('PMDMeta.model.datacite.Contributor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',  type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('contributorName',data);
                    if (name)
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }},
        {name: 'nameIdentifier',   type: 'string', mapping: 'nameIdentifier'},
        {name: 'nameIdentifierScheme',   type: 'string', mapping: 'nameIdentifier@nameIdentifierScheme'},
        {name: 'nameIdentifierSchemeURI',   type: 'string', mapping: 'nameIdentifier@schemeURI'},
        {name: 'role',   type: 'string', mapping: '@contributorType'},	
        {name: 'affiliation',   type: 'string', mapping: function(data){
                var name=Ext.DomQuery.selectValue('affiliation',data);
                if (name)
                    return Ext.String.htmlDecode(name);
                else
                    return "";
            }
        }
        
    ],	asXML: function(){
		var result="";
                var contributorname="";
                var nameidentifier="";
                var affiliation="";
                               
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
				nameidentifier+='<nameIdentifier'+scheme+uri+'>'+this.get('nameIdentifier')+'</nameIdentifier>'
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
	validators: {
		name: { type: 'length', min: 1 },
		role: { type: 'length', min: 1 }
	},        
        /*asISOXML: function(){
            var roletable={ContactPerson:"pointOfContact",
                        DataCollector:null,
                        DataCurator:"custodian",
                        DataManager:"custodian",
                        Distributor:"distributor",
                        Editor:null,
                        Funder:null,
                        HostingInstitution:"publisher",
                        Producer: null,
                        ProjectLeader:'principalInvestigator',
                        ProjectManager:null,
                        ProjectMember:null,
                        RegistrationAgency:null,
                        RegistrationAuthority:null,
                        RelatedPerson:null,
                        Researcher:"user",
                        ResearchGroup:null,
                        RightsHolder: "owner",
                        Sponsor:null,
                        Supervisor:null,
                        WorkPackageLeader:null,
                        Other:null};

            var ret="";
            var role =this.get('role');
            
            if ((this.get('name').length==0 && this.get('affiliation').length==0) || role.length==0)
                return ret;            

            var isorole=roletable[role];            
            
            if (!isorole)
                return ret;
            
             ret+='<gmd:citedResponsibleParty>';
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
             
             ret+='<gmd:role>';
             ret+='<gmd:CI_RoleCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_RoleCode" codeListValue="'+isorole+'" >'+isorole+'</gmd:CI_RoleCode>';
             ret+='</gmd:role>';
             ret+='</gmd:CI_ResponsibleParty>';
             ret+='</gmd:citedResponsibleParty>';            
            
            return ret;
            
        },*/
        getKey: function(){
            var ret=this.get('name').trim()+this.get('nameIdentifier').trim()+this.get('nameIdentifierScheme').trim()+this.get('nameIdentifierSchemeURI')+this.get('affiliation').trim();
            if (ret.length>0)
                return ret;
            else
                return null;
        }
});


