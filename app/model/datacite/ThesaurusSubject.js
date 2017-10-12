Ext.define('PMDMeta.model.datacite.ThesaurusSubject', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'subject',  type: 'string', mapping:function(data){
                    var mdkeyword=data.parentNode;
                    var descriptivekeywords=mdkeyword.parentNode;
                    var thesaurus=Ext.DomQuery.selectNode('gmd|thesaurusName',descriptivekeywords); 
                    var keyword=Ext.DomQuery.selectNode('gco|CharacterString',data);
                    if (thesaurus && keyword)
                        return Ext.String.htmlDecode(keyword.firstChild.textContent);
                    else
                        return "";
                }},
		{name: 'subjectScheme',   type: 'string', mapping:function(data){
                    var mdkeyword=data.parentNode;
                    var descriptivekeywords=mdkeyword.parentNode;
                    var gcmd1=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(NASA/Global Change Master Directory)',descriptivekeywords);                     
                    var gcmd2=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(GCMD)',descriptivekeywords);                     
                    var gcmd3=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(Earth Science Keywords)',descriptivekeywords);                                         
                    if (gcmd1 && gcmd2 && gcmd3)
                        return "GCMD";                    
                    var gemet=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(GEMET - INSPIRE themes)',descriptivekeywords);                     
                    if (gemet)
                        return "GEMET";
                    var epos=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(EPOS WP16)',descriptivekeywords);                     
                    if (epos)
                        return "EPOS WP16";                                              
                    return "";
                }},
		{name: 'subjectSchemeURI',   type: 'string', mapping:function(data){
                    var mdkeyword=data.parentNode;
                    var descriptivekeywords=mdkeyword.parentNode;
                    var gcmd1=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(NASA/Global Change Master Directory)',descriptivekeywords);                     
                    var gcmd2=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(GCMD)',descriptivekeywords);                     
                    var gcmd3=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(Earth Science Keywords)',descriptivekeywords);                                         
                    if (gcmd1 && gcmd2 && gcmd3)
                        return 'http://gcmdservices.gsfc.nasa.gov/kms/concepts/concept_scheme/sciencekeywords';                                                
                    var gemet=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(GEMET - INSPIRE themes)',descriptivekeywords);                     
                    if (gemet)
                        return 'http://www.eionet.europa.eu/gemet/';
                    var epos=Ext.DomQuery.selectNode('gmd|thesaurusName:contains(EPOS WP16)',descriptivekeywords);                     
                    if (epos)
                        return "http://epos-ip.org/WP16";                 
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
        },
        asDifXML: function(param){
            if (param=='scienceparamenters'){
                
                var sciparams=this.get('subject').split('>')
                var category=sciparams[0];
                var topic=sciparams[1];
                var term=sciparams[2];
                var variable1=sciparams[3];
                var variable2=sciparams[4];
                var variable3=sciparams[5];
                var detailed=sciparams[6];
                
                if (!category || category.length===0)
		    category="EARTH SCIENCE";
                if (!topic || topic.length===0)
		    topic=" ";
                if (!term || term.length===0)
		    term=" ";
		    
                var ret="";
                if (category)
                    ret+='<dif:Category>'+category.trim()+'</dif:Category>';
                if (topic)
                    ret+='<dif:Topic>'+topic.trim()+'</dif:Topic>';
                if (term)
                    ret+='<dif:Term>'+term.trim()+'</dif:Term>';
                if (variable1)
                    ret+='<dif:Variable_Level_1>'+variable1.trim()+'</dif:Variable_Level_1>';
                if (variable2)
                    ret+='<dif:Variable_Level_2>'+variable2.trim()+'</dif:Variable_Level_2>';
                if (variable3)
                    ret+='<dif:Variable_Level_3>'+variable3.trim()+'</dif:Variable_Level_3>';                
                if (detailed)
                    ret+='<dif:Detailed_Variable>'+detailed.trim()+'</dif:Detailed_Variable>';                
                
                return ret;
            }else if (param=='keyword'){
                if (this.get('subject').length>0)
                return  '<dif:Keyword>'+this.get('subject').trim()+'</dif:Keyword>'
            }            
        }
});


