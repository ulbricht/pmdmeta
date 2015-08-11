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
        ret+='<gmd:descriptiveKeywords>';
        ret+='<gmd:MD_Keywords>';
        this.each(function(keyword){
            ret+=keyword.asISOXML();
        });
        ret+='</gmd:MD_Keywords>';
        ret+='</gmd:descriptiveKeywords>';
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

