Ext.define('PMDMeta.store.ieda.DataTypes', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.ieda.DataTypesModel',
    storeId: 'DataTypes',
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

        // var ecls = [];
        
        // this.each(function(elem){
        //     if (elem.get('subjectScheme')=='IEDA data type categories')
        //         ecls.push(elem);
        // });


        var ret="";

        if (this.data.length > 0) {
            var scheme=this.data.items[0].get('subjectScheme');
            var codeListValue=this.data.items[0].get('codeListValue');
            if (scheme.length > 0 && codeListValue.length > 0) {
                ret+='<gmd:descriptiveKeywords>';
                ret+='<gmd:MD_Keywords>';
                ret+='<gmd:type>';
                ret+='<gmd:MD_KeywordTypeCode codeList="http://www.ngdc.noaa.gov/metadata/published/xsd/schema/resources/Codelist/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="'+codeListValue+'">';
                ret+=scheme;
                ret+='</gmd:MD_KeywordTypeCode>';
                ret+='</gmd:type>';
            }
        }
        // Ext.each(ecls, function(keyword){
        //     ret+=keyword.asISOXML();
        // });
        this.each(function(data){           
            ret+=data.asISOXML();
        });
        if (ret.length > 0) {            
            ret+='</gmd:MD_Keywords>';
            ret+='</gmd:descriptiveKeywords>';
        }
        return ret;
        
    },
    asDifXML:function(param){
        var ret="";
        if (param=='scienceparamenters'){
            this.each(function(keyword){
                var sciparam=keyword.asDifXML(param);
                if (sciparam && sciparam.length>0)
                    ret+='<dif:Parameters>'+sciparam+'</dif:Parameters>';
            });      
        }    
        return ret;

    }
});			

