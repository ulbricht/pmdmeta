Ext.define('PMDMeta.store.datacite.Title', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Title',
    storeId: 'DataCiteTitle',
    proxy:{
            type: 'memory',
        reader:{
                type: 'xml',
                record: 'title',
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
                result="<titles>"+ret+"</titles>";

        return result;
    },
    asISOXML: function (){
        var ret="";
        this.each(function(data){			
                ret+=data.asISOXML();
        });
        return ret;
    },
    asEscidocXML: function(){
            var ret="";
            this.each(function(data){			
                    ret+=data.asXML();
            });	
            return ret;            
    }, 
    asDifXML: function (param){
            if (this.getCount()>0)
                return this.getAt(0).asDifXML(param);		
            else return "";        
    },    
    listeners:{
        datachanged: function (store){
            var escidoctitle=Ext.getStore("EscidocTitle");
            escidoctitle.removeAll(true);
            store.each(function(elem){
                if (elem.get('title').length>0)                
                    escidoctitle.add({title:elem.get('title')});                
            });
        }
    }
});			

