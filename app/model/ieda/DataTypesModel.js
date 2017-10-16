Ext.define('PMDMeta.model.ieda.DataTypesModel', {
	extend: 'Ext.data.Model',
	fields: [
        {name: 'subject',  type: 'string', mapping :function(data) {
                return Ext.String.htmlDecode(data.firstChild.textContent);
            }},
        {name: 'subjectScheme',   type: 'string', mapping: '@subjectScheme'},
        {name: 'subjectSchemeURI',   type: 'string', mapping: '@schemeURI'},
        {name: 'codeListValue', type: 'string', mapping:function(data){
            var codeListValue="Theme";
            var subject=Ext.String.htmlDecode(data.firstChild.textContent);
            var envelope=data.parentNode.parentNode.parentNode;
            var iso=Ext.DomQuery.selectNode('gmd|MD_Metadata',envelope); 
            var id_info=Ext.DomQuery.selectNode('gmd|identificationInfo',iso); 
            var data_id=Ext.DomQuery.selectNode('gmd|MD_DataIdentification',id_info);
            var descriptivekeywords=Ext.DomQuery.selectNode('gmd|descriptiveKeywords:contains('+subject+')',data_id);
            var keyword_type_code=Ext.DomQuery.selectNode('gmd|MD_KeywordTypeCode',descriptivekeywords); 
            if (keyword_type_code)
                codeListValue=keyword_type_code.getAttribute("codeListValue");
            return codeListValue;  
        }},
        {name: 'lang', type: 'string', mapping: function(data){
        for (var i=0;i<data.attributes.length;i++){         
            if (data.attributes.item(i).localName=='lang')
                return data.attributes.item(i).value;
        }
                return null;
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
        // var scheme="";
        // var uri="";
        // var codeListValue="Theme";
        // if (this.get('subjectScheme') && this.get('subjectScheme').length>0)
        //     scheme=this.get('subjectScheme'); 
        // if (this.get('subjectSchemeURI') && this.get('subjectSchemeURI').length>0)
        //     uri=' schemeURI="'+this.get('subjectSchemeURI')+'"'; 
        // if (this.get('codeListValue') && this.get('codeListValue').length>0)
        //     codeListValue=this.get('codeListValue');       
        if (this.get("subject").length>0){
            ret+='<gmd:keyword>';
            ret+='<gco:CharacterString>'+Ext.String.htmlEncode(this.get("subject"))+'</gco:CharacterString>';
            ret+='</gmd:keyword>';
            // if (scheme.length>0) {
            //     ret+='<gmd:type>';
            //     ret+='<gmd:MD_KeywordTypeCode codeList="http://www.ngdc.noaa.gov/metadata/published/xsd/schema/resources/Codelist/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="'+codeListValue+'">';
            //     ret+=scheme;
            //     ret+='</gmd:MD_KeywordTypeCode>';
            //     ret+='</gmd:type>';
                // ret+='<gmd:thesaurusName>';
                // ret+='<gmd:CI_Citation>';
                // ret+='<gmd:title>';
                // ret+='<gco:CharacterString>EarthChem Library vocabulary</gco:CharacterString>';
                // ret+='</gmd:title>';
                // ret+='<gmd:date gco:nilReason="missing"/>';
                // ret+='<gmd:identifier>';
                // ret+='<gmd:MD_Identifier>';
                // ret+='<gmd:code>';
                // ret+='<gco:CharacterString>'+uri;
                // ret+='</gco:CharacterString>';
                // ret+='</gmd:code>';
                // ret+='</gmd:MD_Identifier>';
                // ret+='</gmd:identifier>';
                // ret+='</gmd:CI_Citation>';
                // ret+='</gmd:thesaurusName>';
//            }
        }
        return ret;
    },
    asDifXML: function(param){
        if (param=='scienceparamenters'){
            
            var sciparams=this.get('subject').split('>');
            var category=sciparams[0];
            var topic=sciparams[1];
            var term=sciparams[2];
            var variable1=sciparams[3];
            var variable2=sciparams[4];
            var variable3=sciparams[5];
            var detailed=sciparams[6];
            
            if (!category || category.length===0)
	           return;
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
            return  '<dif:Keyword>'+this.get('subject').trim()+'</dif:Keyword>';
        }            
    }
});


