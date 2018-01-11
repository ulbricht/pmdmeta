Ext.define('PMDMeta.store.Citation', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Citation',
    storeId: 'Citation',
    autoLoad: true,
    autoSync: true,
    proxy:{
            type: 'ajax',
            api: {
		        read: 'resources/citation.php?cmd=r',
		        create: 'resources/citation.php?cmd=c',
		        update: 'resources/citation.php?cmd=u',
		        destroy: 'resources/citation.php?cmd=d'
            },
            reader:{
                    type: 'json',
                    rootProperty: 'citations'
            },
            writer:{
                type: 'json',
		encode: 'true',
		rootProperty: 'citations'
            }

            
    },
    listeners:{
	datachanged: function (store){
		store.newEntry(store);
	},
	update: function (store){
		store.newEntry(store);
	},
	load: function (store){
		store.newEntry(store);
	}

    },
    newEntry: function (store){
	var invalidexists=false;
	store.each(function(model){
		if (!invalidexists && !model.isValid())
			invalidexists=true;			
	});

	if (!invalidexists || store.getCount()===0){
		var rec = Ext.create('PMDMeta.model.Citation');
		rec.set("url",'');
		store.insert(0,rec);
	}
  }
});			

