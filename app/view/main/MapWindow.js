     
Ext.define('PMDMeta.view.main.MapWindow',{		
	extend: 'Ext.window.Window',
	requires:['PMDMeta.view.main.Google',
		  'Ext.form.field.Text'
	],
        title: 'Select Region (click left mouse and drag)',
	layout: 'fit',
	width: 600,
	height: 500,
	closeAction: 'hide',
	initComponent: function (arguments){
		if (google){
			Ext.apply(this,{
				items: [{
					    xtype: 'PMD-Google',
					    mapOptions: {
						zoom: 1,
						center:  new google.maps.LatLng(0, 0),
						mapTypeId: google.maps.MapTypeId.HYBRID
					    }  
					}
				]
			});	
		}
		this.callParent(arguments);		
		
	},	
	setStore: function(store, geolocid) {
		var me=this;
		me.down("PMD-Google").setStore(store,geolocid);
	},
	listeners:{
		close: function(){
			this.down("PMD-Google").detachStore();
			}
		
		}
});
