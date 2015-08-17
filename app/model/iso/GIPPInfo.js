Ext.define('PMDMeta.model.iso.GIPPInfo', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'subject',  type: 'string', mapping:function(data){
                    var mdkeyword=data.parentNode;
                    var descriptivekeywords=mdkeyword.parentNode;
                    var thesaurus=Ext.DomQuery.selectNode('gmd|thesaurusName',descriptivekeywords); 
                    var keyword=Ext.DomQuery.selectNode('gco|CharacterString',data);
                    console.log(keyword.firstChild.textContent);
                    if (thesaurus && keyword)
                        return Ext.String.htmlDecode(keyword.firstChild.textContent);
                    else
                        return "";
                }},
		{name: 'subjectScheme',   type: 'string', mapping:function(data){
                    var mdkeyword=data.parentNode;
                    var descriptivekeywords=mdkeyword.parentNode;
                    
                    var fdsncode=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(FDSN Network Code)',descriptivekeywords);
                    if (fdsncode)
                        return "FDSNCODE";
                    
                    var gippgrantnumber=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(GIPP Grant Number)',descriptivekeywords);
                    if (gippgrantnumber)
                        return "GIPPGRANTNUMBER";
                        
                    var gippproject=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(GIPP Project)',descriptivekeywords);
                    if (gippproject)
                        return "GIPPPROJECT";

                    return "";
                }},
		{name: 'subjectSchemeURI',   type: 'string', mapping:function(data){
                    return "";
                }},
		{name: 'lang', type: 'string', mapping: function(data){
                     return "en";
		}}	
	],
	validators: {
		subject: { type: 'length', min: 1 }
	},	    
	asXML: function(){
		var uri="";
		var scheme="";		
		var lang="";
		if (this.get('subjectSchemeURI') && this.get('subjectSchemeURI').length>0)
			uri=' schemeURI="'+this.get('subjectSchemeURI')+'"';
		if (this.get('subjectScheme') && this.get('subjectScheme').length>0)
			scheme=' subjectScheme="'+this.get('subjectScheme')+'"';
		if (this.get('lang') && this.get('lang').length>0)
			lang=' xml:lang="'+this.get('lang')+'"';		
		var result="";
		
		if (uri.length>0 || scheme.length>0 || lang.length>0 || this.get('subject').length>0)
			result='<subject'+scheme+uri+lang+'>'+Ext.String.htmlEncode(this.get("subject"))+'</subject>';
		return result;
	},
        asISOXML: function (){
            var ret="";            
            if (this.get("subject").length>0){
                ret+='<gmd:keyword>';
                ret+='<gco:CharacterString>'+Ext.String.htmlEncode(this.get("subject"))+'</gco:CharacterString>';
                ret+='</gmd:keyword>';
                
            }
            return ret;
        }
});


