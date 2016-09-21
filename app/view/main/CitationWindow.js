     
Ext.define('PMDMeta.view.main.CitationWindow',{		
	extend: 'Ext.window.Window',
	requires:[
		  'Ext.form.field.Text'
	],
        title: 'Please provide citation information',
	layout: 'vbox',
	width: 600,
	height: 500,
	closeAction: 'hide',
	initComponent: function (arguments){
/*
		Ext.apply(this,{
			items: [{
				    xtype: 'container'  
				}
			]
		});	
*/
		this.callParent(arguments);		
		
	},	
	setStore: function(store, model) {
		var me=this;
		me.store=store;
		me.model=model;
		me.update(me.model.get("citation"));
	},
	listeners:{
		close: function(){
			this.store=null;
			this.model=null;
		}		
	}
});
