Ext.define('PMDMeta.store.iso.CitedResponsibleParty', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.iso.ResponsibleParty',
    storeId: 'isoCitedResponsibleParty',
    proxy:{
            type: 'memory',
	    reader:{
		    type: 'xml',
		    record: ' gmd|citedResponsibleParty',
                    rootProperty: 'gmd|MD_DataIdentification'
		    }
	    },
    asXML: function (param){
            var ret="";
            this.each(function(data){	
                var tmp=data.asXML(param);
                if (tmp.length>0){
                    ret+='<gmd:citedResponsibleParty>';
                    ret+=tmp;
                    ret+='</gmd:citedResponsibleParty>';
                }
            });
            if (ret.length>0)
                return ret;
            else 
                return "";
    },
    uniqueByKey: function (){
        var cleanup=Array();
        var store=this;
        store.each(function(elem){
                var key=elem.getKey();
                if (key){
                    if (!store.getById(key)){  
                        elem.set('id',key);
                    }else{
                        if (key!==elem.get("id"))
                            cleanup.push(elem);
                    }
                }
        });
        store.remove(cleanup); 
    }
});			

