Ext.define('PMDMeta.store.iso.MetadataContact', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.iso.ResponsibleParty',
    storeId: 'isoMetadataContact',
    proxy:{
            type: 'memory',
	    reader:{
		    type: 'xml',
		    record: 'gmd|CI_ResponsibleParty',
                    rootProperty: 'gmd|contact'
		    }
	    },
	asXML: function (param){
		var ret="";
	    	this.each(function(data){			
                    var tmp=data.asXML(param);
                    if (tmp.length>0){
                        ret+='<gmd:contact>';
                        ret+=tmp;
                        ret+='</gmd:contact>';
                    }
		});				
		return ret;
	}

});			

