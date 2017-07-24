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
	    ret+='<gmd:descriptiveKeywords><gmd:MD_Keywords>';
	    if (subject.length>0){
		ret+='<gmd:keyword>';
		ret+='<gco:CharacterString>'+Ext.String.htmlEncode(subject)+'</gco:CharacterString>';
		ret+='</gmd:keyword>';
            }
	    ret+='</gmd:MD_Keywords></gmd:descriptiveKeywords>';
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

