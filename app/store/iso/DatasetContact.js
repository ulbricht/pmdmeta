Ext.define('PMDMeta.store.iso.DatasetContact', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.iso.ResponsibleParty',
    storeId: 'isoDatasetContact',
    proxy:{
            type: 'memory',
	    reader:{
		    type: 'xml',
		    record: 'gmd|pointOfContact',
                    rootProperty: 'gmd|MD_DataIdentification'
		    }
	},
    asXML: function (param){
            var ret="";
            var result="";
            this.each(function(data){	
                var tmp=data.asXML(param);
                if (tmp.length>0){
                    ret+='<gmd:pointOfContact>';
                    ret+=tmp;
                    ret+='</gmd:pointOfContact>';
                }
            });				
            return ret;
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
    },
    listeners:{
        pmdafterdrop: function(store){
            var storemodelname=store.getModel().getName();
            var addedmodels=new Array();
            store.each(function(model){
                var modelname=model.self.getName();
                if (modelname!==storemodelname){
                    addedmodels.push(model);
                }
            });
            store.suspendEvents(true);
            Ext.each(addedmodels, function (oldmodel){
                var index=store.indexOf(oldmodel);
                if (index >= 0){                    
                    var newmodel=Ext.create(storemodelname);
                    Ext.each(newmodel.getFields(), function (field){
                        var fieldname=field.getName();
                        if (fieldname!==newmodel.getIdProperty()){
                            newmodel.set(fieldname,oldmodel.get(fieldname));               
                        }
                    });
                    newmodel.set('isorole','pointOfContact');

                    store.insert(index,newmodel);
                }               
            });
            store.remove(addedmodels);
            store.resumeEvents();
        }
    }
});			

