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
		rootProperty: 'citations',
		writeAllFields: true
            }      
    },
    constructor: function() {
        this.callParent(arguments);
        this.proxy.on('exception', this.writeException, this);
    },
//the proxy is not aware of a store - redirecting the exception allows to reject changes 
    writeException: function(proxy, response) {
	var msg="";
	var success=false;
	var caption="Error: ";
	var store=this;
	if (response.responseText){
		var answer=Ext.JSON.decode(response.responseText);
		msg=answer.message;
		success=answer.success;
		caption+=response.statusText;
	}else{
		msg=response.statusText;
		caption+=response.statusText;
	}
	if (!success){
            Ext.Msg.show({
                title: caption,
                msg: msg,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
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

	if (store.isFiltered())
		return;

	if (store.getCount()===0 ){
		store.insert(0,{url:'',citation:'',datetimecopied:''});
	}else{
		store.each(function(model){
			if (!invalidexists && !model.isValid())
				invalidexists=true;			
		});

		if (!invalidexists){
			store.insert(0,{url:'',citation:'',datetimecopied:''});
		}
	}
  }
});			

