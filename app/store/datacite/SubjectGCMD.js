Ext.define('PMDMeta.store.datacite.SubjectGCMD', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.ThesaurusSubject',
    storeId: 'DataCiteSubjectGCMD',
    proxy:{
            type: 'memory',

        reader:{
                type: 'xml',
                record: 'gmd|keyword'
                }
        },
    asXML: function (){
            var ret="";
            var result="";
            this.each(function(data){			
                    ret+=data.asXML();
            });

            // if (ret.length>0)
            //         result="<subjects>"+ret+"</subjects>";

            return ret;
    },
    asISOXML: function(){
        var gcmds = [];
        var gemets = [];
        var eposwp16s = [];
        var others = []; 
        
        this.each(function(elem){
            if (elem.get('subjectScheme')=='GCMD')
                gcmds.push(elem);
            else if (elem.get('subjectScheme')=='GEMET')
                gemets.push(elem);
	        else if (elem.get('subjectScheme')=='EPOS WP16')
                eposwp16s.push(elem);
            else others.push(elem);
        });
        
        var gcmd='<gmd:thesaurusName>';
        gcmd+='<gmd:CI_Citation>';
        gcmd+='<gmd:title>';
        gcmd+='<gco:CharacterString>NASA/GCMD Earth Science Keywords</gco:CharacterString>';
        gcmd+='</gmd:title>';
        gcmd+='<gmd:date>';
        gcmd+='<gmd:CI_Date>';
        gcmd+='<gmd:date>';
        gcmd+='<gco:Date>2008-02-05</gco:Date>';
        gcmd+='</gmd:date>';
        gcmd+='<gmd:dateType>';
        gcmd+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="revision" >revision</gmd:CI_DateTypeCode>';
        gcmd+='</gmd:dateType>';
        gcmd+='</gmd:CI_Date>';
        gcmd+='</gmd:date>';
        gcmd+='<gmd:collectiveTitle>';
        gcmd+='<gco:CharacterString>Olsen, L.M., G. Major, K. Shein, J. Scialdone, R. Vogel, S. Leicester, H. Weir, S. Ritz, T. Stevens, M. Meaux, C.Solomon, R. Bilodeau, M. Holland, T. Northcutt, R. A. Restrepo, 2007 . NASA/Global Change Master Directory (GCMD) Earth Science Keywords. Version 6.0.0.0.0</gco:CharacterString>';
        gcmd+='</gmd:collectiveTitle>';
        gcmd+='</gmd:CI_Citation>';
        gcmd+='</gmd:thesaurusName>';
        var gemet='<gmd:thesaurusName>';
        gemet+='<gmd:CI_Citation>';
        gemet+='<gmd:title>';
        gemet+='<gco:CharacterString>GEMET - INSPIRE themes, version 1.0</gco:CharacterString>';
        gemet+='</gmd:title>';
        gemet+='<gmd:date>';
        gemet+='<gmd:CI_Date>';
        gemet+='<gmd:date>';
        gemet+='<gco:Date>2008-06-01</gco:Date>';
        gemet+='</gmd:date>';
        gemet+='<gmd:dateType>';
        gemet+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication" >publication</gmd:CI_DateTypeCode>';
        gemet+='</gmd:dateType>';
        gemet+='</gmd:CI_Date>';
        gemet+='</gmd:date>';
        gemet+='</gmd:CI_Citation>';
        gemet+='</gmd:thesaurusName>';

        var eposwp16='<gmd:thesaurusName>';
        eposwp16+='<gmd:CI_Citation>';
        eposwp16+='<gmd:title>';
        eposwp16+='<gco:CharacterString>EPOS WP16</gco:CharacterString>';
        eposwp16+='</gmd:title>';
        eposwp16+='<gmd:date>';
        eposwp16+='<gmd:CI_Date>';
        eposwp16+='<gmd:date>';
        eposwp16+='<gco:Date>2016-08-31</gco:Date>';
        eposwp16+='</gmd:date>';
        eposwp16+='<gmd:dateType>';
        eposwp16+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication" >publication</gmd:CI_DateTypeCode>';
        eposwp16+='</gmd:dateType>';
        eposwp16+='</gmd:CI_Date>';
        eposwp16+='</gmd:date>';
        eposwp16+='</gmd:CI_Citation>';
        eposwp16+='</gmd:thesaurusName>';

        var ret="";
        
        if (gemets.length>0){
            ret+='<gmd:descriptiveKeywords>';
            ret+='<gmd:MD_Keywords>';
            Ext.each(gemets, function(keyword){
                ret+=keyword.asISOXML();
            });
            ret+=gemet;            
            ret+='</gmd:MD_Keywords>';

            ret+='</gmd:descriptiveKeywords>';
        }
        if (gcmds.length>0){
            ret+='<gmd:descriptiveKeywords>';
            ret+='<gmd:MD_Keywords>';
            Ext.each(gcmds, function(keyword){
                ret+=keyword.asISOXML();
            });
            ret+=gcmd;            
            ret+='</gmd:MD_Keywords>';
            ret+='</gmd:descriptiveKeywords>';
        }

        if (eposwp16s.length>0){
            ret+='<gmd:descriptiveKeywords>';
            ret+='<gmd:MD_Keywords>';
            Ext.each(eposwp16s, function(keyword){
                ret+=keyword.asISOXML();
            });
            ret+=eposwp16;            
            ret+='</gmd:MD_Keywords>';
            ret+='</gmd:descriptiveKeywords>';
        }


        if (others.length > 0){ 
            Ext.each(others, function(elem){
                var scheme=elem.get('subjectScheme');
                var codeListValue=elem.get('codeListValue');
                if (scheme.length > 0 && codeListValue.length > 0) {
                    ret+='<gmd:descriptiveKeywords>';
                    ret+='<gmd:MD_Keywords>';
                    ret+='<gmd:type>';
                    ret+='<gmd:MD_KeywordTypeCode codeList="http://www.ngdc.noaa.gov/metadata/published/xsd/schema/resources/Codelist/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="'+codeListValue+'">';
                    ret+=scheme;
                    ret+='</gmd:MD_KeywordTypeCode>';
                    ret+='</gmd:type>';
                    ret+=elem.asISOXML();
                    ret+='</gmd:MD_Keywords>';
                    ret+='</gmd:descriptiveKeywords>';
                }
            });
        }
        return ret;
        
    },
    asDifXML:function(param){
        
        var gcmds = [];
        var gemets = [];
        var others = [];
        
        this.each(function(elem){
            if (elem.get('subjectScheme')=='GCMD')
                gcmds.push(elem);
            else if (elem.get('subjectScheme')=='GEMET')
                gemets.push(elem);
            else others.push(elem);
        });
        
        var ret="";
        
        if (param=='scienceparamenters'){
            Ext.each(gcmds, function(keyword){
                var sciparam=keyword.asDifXML(param);
                if (sciparam.length>0)
                    ret+='<dif:Parameters>'+sciparam+'</dif:Parameters>';
            });
            Ext.each(others, function(keyword){
                var sciparam=keyword.asDifXML(param);
                if (sciparam && sciparam.length>0)
                    ret+='<dif:Parameters>'+sciparam+'</dif:Parameters>';
            });  
        }else if (param=='keyword'){
            Ext.each(gemets, function(keyword){
                ret+=keyword.asDifXML(param);
            });            
        }
        return ret;
    }
});			

