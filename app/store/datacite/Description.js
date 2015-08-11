Ext.define('PMDMeta.store.datacite.Description', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Description',
    storeId: 'DataCiteDescription',	    
    proxy:{
            type: 'memory',

	    reader:{
		    type: 'xml',
		    record: 'description',
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
                    result="<descriptions>"+ret+"</descriptions>";

            return result;
    },
    asISOXML: function (){
        var ret="";
        this.each(function(data){			
                ret+=data.asISOXML();
                ret+="\n\n";                
        });
        return '<gmd:abstract><gco:CharacterString>'+ret+'</gco:CharacterString></gmd:abstract>';   
    },
    asDifXML: function(){
        var ret="";
        if (this.getCount()>0)
            ret=this.getAt(0).asDifXML();		
 
        if (ret.length>0)
            return '<dif:Summary>'+ret+'</dif:Summary>';
 
    }
});			

