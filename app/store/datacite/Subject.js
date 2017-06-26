Ext.define('PMDMeta.store.datacite.Subject', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Subject',
    storeId: 'DataCiteSubject',
    proxy:{
            type: 'memory',
        reader:{
                type: 'xml',
                record: 'subject',
                rootProperty: 'resource'
                }
    },
    asXML: function (){
        var ret="";
        var result="";
        this.each(function(data){			
                ret+=data.asXML();
        });

        if (ret.length>0)
                result="<subjects>"+ret+"</subjects>";

        return result;
    },
    asISOXML: function(){
        var ret="";
        this.each(function(keyword){
	    var subject=keyword.get("subject");
	    var scheme=keyword.get('subjectScheme');
	    if (subject.length>0){
		ret+='<gmd:descriptiveKeywords><gmd:MD_Keywords>';
		ret+='<gmd:keyword>';
		ret+='<gco:CharacterString>'+Ext.String.htmlEncode(subject)+'</gco:CharacterString>';
		ret+='</gmd:keyword>';
		ret+='<gmd:thesaurusName>';
		ret+='<gmd:CI_Citation>';
		ret+='<gmd:title>';
		ret+='<gco:CharacterString>'+scheme+'</gco:CharacterString>';
		ret+='</gmd:title>';
		ret+='<gmd:date>';
		ret+='<gmd:CI_Date>';
		ret+='<gmd:date>';
		ret+='<gco:Date>2016-08-31</gco:Date>';
		ret+='</gmd:date>';
		ret+='<gmd:dateType>';
		ret+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication" >publication</gmd:CI_DateTypeCode>';
		ret+='</gmd:dateType>';
		ret+='</gmd:CI_Date>';
		ret+='</gmd:date>';
		ret+='</gmd:CI_Citation>';
		ret+='</gmd:thesaurusName>';
		ret+='</gmd:MD_Keywords></gmd:descriptiveKeywords>';
            }
        });

        return ret;

    },
    asDifXML:function(param){
        
        var ret="";
        
        if (param=='keyword'){
            this.each(function(keyword){
                ret+=keyword.asDifXML(param);
            })            
        }
        return ret;
    }    
});			

