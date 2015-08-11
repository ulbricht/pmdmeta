Ext.define('PMDMeta.store.datacite.Resource', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Resource',
    storeId: 'DataCiteResource',	
    proxy:{
            type: 'memory',

        reader:{
                type: 'xml',
                record: 'resource',
                rootProperty: 'resource'
                }
        },
    asXML: function (param){
            if (this.getCount()>0)
                return this.getAt(0).asXML(param);		
            else return "";
    },
    asDifXML: function (param){
            if (this.getCount()>0)
                return this.getAt(0).asDifXML(param);		
            else return "";        
    },
    listeners:{
        datachanged: function (store){
            var escidocdate=Ext.getStore("EscidocDate");
            escidocdate.removeAll(true);
            store.each(function(elem){
                if (elem.get('publicationYear') && elem.get('publicationYear').length>0)                
                    escidocdate.add({date:elem.get('publicationYear')});                
            });
        }
    }
});

