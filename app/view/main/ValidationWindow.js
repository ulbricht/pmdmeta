
Ext.define('PMDMeta.view.main.ValidationWindow',{		
    extend: 'Ext.window.Window',
    title: 'Please check the following items:',
    closeAction: 'hide',
    width:600,
    height: 600,
    layout: 'fit',    
     initComponent: function() {
        var me=this;	
	var store=Ext.getStore('validationresult');
	store.on("datachanged", function(){
        	var html=store.getAt(0).get("html");
		me.update(html);
	});
        this.callParent();
         
     },	
    listeners:{
        beforeshow: function(){

	    var store=Ext.getStore('validationresult');
	    if (store){
        	var html=store.getAt(0).get("html");
		this.update(html);
	    }
        }
    }

});
