Ext.define('PMDMeta.store.iso.GIPPInfo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.iso.GIPPInfo',
    storeId: 'GIPPInfo',
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

            if (ret.length>0)
                    result="<subjects>"+ret+"</subjects>";

            return result;
    },
    asISOXML: function(){

        var fdsncodes=new Array();
        var gippgrantnumbers=new Array();
        var gippprojects=new Array();        
        
        this.each(function(elem){
            if (elem.get('subjectScheme')=='FDSNCODE')
                fdsncodes.push(elem);
            else if (elem.get('subjectScheme')=='GIPPGRANTNUMBER')
                gippgrantnumbers.push(elem);
            else if (elem.get('subjectScheme')=='GIPPPROJECT')
                gippprojects.push(elem);            
        })
        
        var fdsncode='<gmd:thesaurusName>';
        fdsncode+='<gmd:CI_Citation>';
        fdsncode+='<gmd:title>';
        fdsncode+='<gco:CharacterString>FDSN Network Code</gco:CharacterString>';
        fdsncode+='</gmd:title>';
        fdsncode+='<gmd:date>';
        fdsncode+='<gmd:CI_Date>';
        fdsncode+='<gmd:date>';
        fdsncode+='<gco:Date>2008-02-05</gco:Date>';
        fdsncode+='</gmd:date>';
        fdsncode+='<gmd:dateType>';
        fdsncode+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="revision" >revision</gmd:CI_DateTypeCode>';
        fdsncode+='</gmd:dateType>';
        fdsncode+='</gmd:CI_Date>';
        fdsncode+='</gmd:date>';
        fdsncode+='<gmd:collectiveTitle>';
        fdsncode+='<gco:CharacterString>FDSN Network Code</gco:CharacterString>';
        fdsncode+='</gmd:collectiveTitle>';
        fdsncode+='</gmd:CI_Citation>';
        fdsncode+='</gmd:thesaurusName>';

        var gippgrantnumber='<gmd:thesaurusName>';
        gippgrantnumber+='<gmd:CI_Citation>';
        gippgrantnumber+='<gmd:title>';
        gippgrantnumber+='<gco:CharacterString>GIPP Grant Number</gco:CharacterString>';
        gippgrantnumber+='</gmd:title>';
        gippgrantnumber+='<gmd:date>';
        gippgrantnumber+='<gmd:CI_Date>';
        gippgrantnumber+='<gmd:date>';
        gippgrantnumber+='<gco:Date>2008-02-05</gco:Date>';
        gippgrantnumber+='</gmd:date>';
        gippgrantnumber+='<gmd:dateType>';
        gippgrantnumber+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="revision" >revision</gmd:CI_DateTypeCode>';
        gippgrantnumber+='</gmd:dateType>';
        gippgrantnumber+='</gmd:CI_Date>';
        gippgrantnumber+='</gmd:date>';
        gippgrantnumber+='</gmd:CI_Citation>';
        gippgrantnumber+='</gmd:thesaurusName>'        
        
        var gippproject='<gmd:thesaurusName>';
        gippproject+='<gmd:CI_Citation>';
        gippproject+='<gmd:title>';
        gippproject+='<gco:CharacterString>GIPP Project</gco:CharacterString>';
        gippproject+='</gmd:title>';
        gippproject+='<gmd:date>';
        gippproject+='<gmd:CI_Date>';
        gippproject+='<gmd:date>';
        gippproject+='<gco:Date>2008-06-01</gco:Date>';
        gippproject+='</gmd:date>';
        gippproject+='<gmd:dateType>';
        gippproject+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication" >publication</gmd:CI_DateTypeCode>';
        gippproject+='</gmd:dateType>';
        gippproject+='</gmd:CI_Date>';
        gippproject+='</gmd:date>';
        gippproject+='</gmd:CI_Citation>';
        gippproject+='</gmd:thesaurusName>';

        var ret="";
        
        if (fdsncodes.length>0){
            ret+='<gmd:descriptiveKeywords>';
            ret+='<gmd:MD_Keywords>';
            Ext.each(fdsncodes, function(keyword){
                ret+=keyword.asISOXML();
            });
            ret+=fdsncode;            
            ret+='</gmd:MD_Keywords>';

            ret+='</gmd:descriptiveKeywords>';
        }
        if (gippgrantnumbers.length>0){
            ret+='<gmd:descriptiveKeywords>';
            ret+='<gmd:MD_Keywords>';
            Ext.each(gippgrantnumbers, function(keyword){
                ret+=keyword.asISOXML();
            });
            ret+=gippgrantnumber;            
            ret+='</gmd:MD_Keywords>';
            ret+='</gmd:descriptiveKeywords>';
        }
        if (gippprojects.length>0){
            ret+='<gmd:descriptiveKeywords>';
            ret+='<gmd:MD_Keywords>';
            Ext.each(gippprojects, function(keyword){
                ret+=keyword.asISOXML();
            });
            ret+=gippproject;            
            ret+='</gmd:MD_Keywords>';
            ret+='</gmd:descriptiveKeywords>';
        }
       return ret;
        
    }
});			

