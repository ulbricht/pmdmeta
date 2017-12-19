     
Ext.define('PMDMeta.view.main.MapWindow',{		
	extend: 'Ext.window.Window',
	requires:[
	'Ext.ux.GMapPanel',
	'PMDMeta.view.main.MapWindowController'
	],
	controller: 'MapWindowController',
        title: 'Select Region (click left mouse and drag)',
	layout: 'fit',
	width: 600,
	height: 500,
	closeAction: 'hide',
	items: [{
		    xtype: 'gmappanel',
		    mapOptions: {
			zoom: 1,
			center:  new google.maps.LatLng(0, 0),
			mapTypeId: google.maps.MapTypeId.HYBRID
		    }
		}
	]

});
