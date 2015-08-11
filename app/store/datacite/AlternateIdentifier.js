Ext.define('PMDMeta.store.datacite.AlternateIdentifier', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.AlternateIdentifier',
    storeId: 'DataCiteAlternateIdentifier',
	proxy:{
	    type: 'memory',
	    reader:{
		    type: 'xml',
		    record: 'alternateIdentifier',
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
			result="<alternateIdentifiers>"+ret+"</alternateIdentifiers>";

		return result;
	}
});			

