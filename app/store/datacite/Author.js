Ext.define('PMDMeta.store.datacite.Author', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Author',
    storeId: 'DataCiteAuthor',
//    requires:['PMDMeta.model.iso.ResponsibleParty'],
    proxy:{
            type: 'memory',
	    reader:{
		    type: 'xml',
		    record: 'creator',
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
			result="<creators>"+ret+"</creators>";
		
		return result;
	},
        asContributorXML: function(){
		var ret="";
	    	this.each(function(data){	
                    if (data.asContributorXML)
			ret+=data.asContributorXML();
		});
		return ret;            
        },
        asISOXML: function (param){
            var ret="";
            this.each(function(data){	
                if (data.asISOXML){
                    var tmp=data.asISOXML(param);
                    if (tmp.length>0){
                        ret+=tmp;
                    }
                }
            });
            if (ret.length>0)
                return ret;
            else 
                return "";
        },
        asEscidocXML: function(){
		var ret="";
	    	this.each(function(data){			
			ret+=data.asXML();
		});	
		return ret;            
        },
        asDifXML: function(){
		var ret="";
	    	this.each(function(data){			
			var name=data.asDifXML();
                        if (name.length>0){
                            if (ret.length>0){
                                ret+="; ";
                            }
                            ret+=name;
                        }
		});
                
		return '<dif:Dataset_Creator>'+ret+'</dif:Dataset_Creator>';
        },         
    listeners:{
        datachanged: function (store){
            var escidocauthor=Ext.getStore("EscidocAuthor");
            escidocauthor.removeAll(true);
            store.each(function(elem){
                if (elem.get('name').length>0)
                  escidocauthor.add({creator:elem.get('name')});                             
            });
        },
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
