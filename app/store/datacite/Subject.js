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
        this.each(function(data){	
            ret+=data.asXML();
        }); 
        return ret;
    },
    asISOXML: function(){

        //function to add keywords to a list for each scheme
        function getKeywordsForScheme(elem, thisscheme){
            var scheme = elem.get('subjectScheme');
            if (scheme == schemes[thisscheme]) {
                keywords.push(elem);
            }
        } 

        var codeListValues = ['Instrument', 'Platform'];
        var ret="";

        //get a list of unique Schemes
        var schemes = [];
        this.each(function(elem){
            var scheme = elem.get('subjectScheme');
            if (scheme.length > 0 && schemes.indexOf(scheme) == -1) {
                schemes.push(scheme);
            }
        });

        //for each scheme
        for (var thisscheme in schemes){
            //determine the codeListValue - if the scheme is in the codeListValues array, use that value
            //otherwise, use "Theme"
            var codeListValue = "Theme";
            if (codeListValues.indexOf(schemes[thisscheme]) > -1) {
                codeListValue = schemes[thisscheme];
            }

            //get a list of items/keywords used from that scheme
            var keywords=[];
            for (var index in this.data.items) {
                var elem=this.data.items[index];
                getKeywordsForScheme(elem, thisscheme);
            }        

            //Add the MD_KeywordTypeCode XML to the ret string
            if (keywords.length>0 && schemes[thisscheme].length>0 && codeListValue.length>0){
                ret+='<gmd:descriptiveKeywords>';
                ret+='<gmd:MD_Keywords>';
                ret+='<gmd:type>';
                ret+='<gmd:MD_KeywordTypeCode codeList="http://www.ngdc.noaa.gov/metadata/published/xsd/schema/resources/Codelist/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="'+codeListValue+'">';
                ret+=schemes[thisscheme];
                ret+='</gmd:MD_KeywordTypeCode>';
                ret+='</gmd:type>';
                //for each item in the scheme list
                for (var keyword in keywords) {
                    //get the keyword ISOXML and add to the ret string
                    ret+=keywords[keyword].asISOXML();
                }
                ret+='</gmd:MD_Keywords></gmd:descriptiveKeywords>';    
            }
        }
        return ret;
    },        
    
    asDifXML:function(param){
        var ret="";
        if (param=='keyword'){
            this.each(function(keyword){
                ret+=keyword.asDifXML(param);
            });            
        }
        return ret;
    }
   
});

