Ext.define('PMDMeta.store.datacite.Contributor', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Contributor',
    storeId: 'DataCiteContributor',
    proxy:{
            type: 'memory',
	    reader:{
		    type: 'xml',
		    record: 'contributor',
                    rootProperty: 'resource'
		    }
	    },
	asXML: function (){
		var ret="";
		var result="";
	    	this.each(function(data){			
			ret+=data.asXML();
		});
		return ret;
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
                    if (oldmodel.get('isorole')==='pointOfContact')
                        newmodel.set('role','ContactPerson');
//                    newmodel.set('isorole','pointOfContact');

                    store.insert(index,newmodel);
                }               
            });
            store.remove(addedmodels);
            store.resumeEvents();
        }
    }
});			

