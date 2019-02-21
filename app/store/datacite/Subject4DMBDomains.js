Ext.define('PMDMeta.store.datacite.Subject4DMBDomains', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.ThesaurusSubject',
    storeId: 'DataCiteSubject4DMBDomains',
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

            result=ret;

            return result;
    },
    asISOXML: function(){

	var subjects=new Object();
        var ret="";

	//do grouping
        this.each(function(elem){
		var scheme=elem.get('subjectScheme');
		if (scheme.length > 0 && elem.get('subject') && elem.get('subject').length>0){
			if (!(scheme in subjects))
				subjects[scheme]=new Array();
			subjects[scheme].push(elem);
		}
        });
        

	Ext.each(Object.keys(subjects), function(scheme,idx){

		var subjectlist=subjects[scheme];

		if (Array.isArray(subjectlist)){

			if (scheme==="GEMET"){
			    ret+='<gmd:descriptiveKeywords>';
			    ret+='<gmd:MD_Keywords>';
			    Ext.each(subjectlist, function(keyword){
				ret+=keyword.asISOXML();
			    }); 
			    ret+='<gmd:thesaurusName>';
			    ret+='<gmd:CI_Citation>';
			    ret+='<gmd:title>';
			    ret+='<gco:CharacterString>GEMET - INSPIRE themes, version 1.0</gco:CharacterString>';
			    ret+='</gmd:title>';
			    ret+='<gmd:date>';
			    ret+='<gmd:CI_Date>';
			    ret+='<gmd:date>';
			    ret+='<gco:Date>2008-06-01</gco:Date>';
			    ret+='</gmd:date>';
			    ret+='<gmd:dateType>';
			    ret+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication" >publication</gmd:CI_DateTypeCode>';
			    ret+='</gmd:dateType>';
			    ret+='</gmd:CI_Date>';
			    ret+='</gmd:date>';
			    ret+='</gmd:CI_Citation>';
			    ret+='</gmd:thesaurusName>';          
			    ret+='</gmd:MD_Keywords>';
			    ret+='</gmd:descriptiveKeywords>';
			}
			else if (scheme==="GCMD"){
			    ret+='<gmd:descriptiveKeywords>';
			    ret+='<gmd:MD_Keywords>';
			    Ext.each(subjectlist, function(keyword){
				ret+=keyword.asISOXML();
			    });
			    ret+='<gmd:thesaurusName>';
			    ret+='<gmd:CI_Citation>';
			    ret+='<gmd:title>';
			    ret+='<gco:CharacterString>NASA/GCMD Earth Science Keywords</gco:CharacterString>';
			    ret+='</gmd:title>';
			    ret+='<gmd:date>';
			    ret+='<gmd:CI_Date>';
			    ret+='<gmd:date>';
			    ret+='<gco:Date>2008-02-05</gco:Date>';
			    ret+='</gmd:date>';
			    ret+='<gmd:dateType>';
			    ret+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="revision" >revision</gmd:CI_DateTypeCode>';
			    ret+='</gmd:dateType>';
			    ret+='</gmd:CI_Date>';
			    ret+='</gmd:date>';
			    ret+='<gmd:collectiveTitle>';
			    ret+='<gco:CharacterString>Olsen, L.M., G. Major, K. Shein, J. Scialdone, R. Vogel, S. Leicester, H. Weir, S. Ritz, T. Stevens, M. Meaux, C.Solomon, R. Bilodeau, M. Holland, T. Northcutt, R. A. Restrepo, 2007 . NASA/Global Change Master Directory (GCMD) Earth Science Keywords. Version 6.0.0.0.0</gco:CharacterString>';
			    ret+='</gmd:collectiveTitle>';
			    ret+='</gmd:CI_Citation>';
			    ret+='</gmd:thesaurusName>';            
			    ret+='</gmd:MD_Keywords>';
			    ret+='</gmd:descriptiveKeywords>';
			}
			else{

			    var date='';
			    ret+='<gmd:descriptiveKeywords>';
			    ret+='<gmd:MD_Keywords>';
			    Ext.each(subjectlist, function(keyword){
				ret+=keyword.asISOXML();
				date=keyword.get('date');
			    }); 
			    ret+='<gmd:thesaurusName>';
			    ret+='<gmd:CI_Citation>';
			    ret+='<gmd:title>';
			    ret+='<gco:CharacterString>'+scheme+'</gco:CharacterString>';
			    ret+='</gmd:title>';
			    ret+='<gmd:date>';
			    ret+='<gmd:CI_Date>';

			    if (date && date.length>0){
				ret+='<gmd:date>';
				ret+='<gco:Date>'+date+'</gco:Date>';
				ret+='</gmd:date>';
			    }
			    else{ 
				ret+='<gmd:date gco:nilReason="missing"/>';
			    }
			    ret+='<gmd:dateType>';
			    ret+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication" >publication</gmd:CI_DateTypeCode>';
			    ret+='</gmd:dateType>';
			    ret+='</gmd:CI_Date>';
			    ret+='</gmd:date>';
			    ret+='</gmd:CI_Citation>';
			    ret+='</gmd:thesaurusName>';          
			    ret+='</gmd:MD_Keywords>';
			    ret+='</gmd:descriptiveKeywords>';
			}

		}
	});

        



        return ret;
        
    },
    asDifXML:function(param){
        
        var gcmds=new Array();
        var gemets=new Array();
        
        this.each(function(elem){
            if (elem.get('subjectScheme')=='GCMD' || elem.get('subjectScheme')=='NASA/GCMD Earth Science Keywords')
                gcmds.push(elem);
            else if (elem.get('subjectScheme')=='GEMET')
                gemets.push(elem);
        }) 
        
        var ret="";
        
        if (param=='scienceparamenters'){
            Ext.each(gcmds, function(keyword){
                var sciparam=keyword.asDifXML(param);
                if (sciparam.length>0)
                    ret+='<dif:Parameters>'+sciparam+'</dif:Parameters>';
            })
        }else if (param=='keyword'){
            Ext.each(gemets, function(keyword){
                ret+=keyword.asDifXML(param);
            })            
        }
        return ret;
    }
});			

