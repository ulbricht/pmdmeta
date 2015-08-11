Ext.define('PMDMeta.store.iso.Extent', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.iso.Extent',
    storeId: 'isoExtent',
    proxy:{
            type: 'memory',
	    reader:{
		    type: 'xml',
		    record: 'gmd|EX_Extent'
                    //,rootProperty: 'gmd|extent'
		    }
	    },
    asXML: function (param){
            var ret="";
            this.each(function(data){	
                var tmp=data.asXML(param);
                if (tmp.length>0){
                    ret+='<gmd:extent><gmd:EX_Extent>';
                    ret+=tmp;
                    ret+='</gmd:EX_Extent></gmd:extent>';
                }
            });
            if (ret.length>0)
                return ret;
            else 
                return "";
    },
    asDataCiteXML: function (){
            var ret="";
            this.each(function(data){	
                ret+=data.asDataCiteXML();
            });
            if (ret.length>0)
                return ret;
            else 
                return "";            
    },
    asDifXML: function(){
             var ret="";
            this.each(function(data){	
                var coverage=data.asDifXML();
                if (coverage.length>0)
                ret+='<dif:Spatial_Coverage>'+coverage+'</dif:Spatial_Coverage>';
            });
            if (ret.length>0)
                return ret;
            else 
                return "";         
    }
});			

