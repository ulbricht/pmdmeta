Ext.define('PMDMeta.store.datacite.Date', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Date',
    storeId: 'DataCiteDate',
    proxy:{
            type: 'memory',

	    reader:{
		    type: 'xml',
		    record: 'date',
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
                    result=ret;

            return result;
    },       
    asEscidocXML: function(){
            var ret="";
            this.each(function(data){			
                    ret+=data.asXML();
            });	
            return ret;            
    },
    asISOXML: function (param){
            var ret="";
            this.each(function(data){			
                    ret+=data.asISOXML(param);
            });
            return ret;
    }
});			

