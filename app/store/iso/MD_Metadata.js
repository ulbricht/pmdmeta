Ext.define('PMDMeta.store.iso.MD_Metadata', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.iso.MD_Metadata',
    storeId: 'isoMD_Metadata',
    proxy:{
            type: 'memory',
	    reader:{
		    type: 'xml',
		    record: 'gmd|MD_Metadata'
		    }
	    },
	asXML: function (param){
		var ret="";
	    	this.each(function(data){			
			ret+=data.asXML(param);
		});	
       //         console.log(ret);
		return ret;
	}

});			

