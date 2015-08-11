Ext.define('PMDMeta.store.endnote.Publications', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.endnote.Publication',
    storeId: 'EndnotePublications',
	proxy:{
	    type: 'memory',
	    reader:{
                type: 'xml',
                record: 'RECORDS',
                rootProperty: 'XML'
            }
        },
	asXML: function (){
		var ret="";
		var result="";
	    	this.each(function(data){			
			ret+=data.asXML();
		});		
		if (ret.length>0)
			result="<XML><RECORDS>"+ret+"</RECORDS></XML>";
		return result;
	}
});			

