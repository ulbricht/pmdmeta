Ext.define('PMDMeta.view.main.MapWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MapWindowController',
    rectangle:null,
    marker:null,

    control: {
        gmappanel: {
            mapready: 'onMapReady'
        },
	'#':{
		close: 'onClose',
		PMDModelChange: 'onPMDModelChange'
	}
   },

//-------------event handlers
	onMapReady: function(elem,gmap){
		var me=this;

		me.gmap=gmap;

		me.drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
			drawingControl: true,
			drawingControlOptions: {
			    position: google.maps.ControlPosition.TOP_CENTER,
			    drawingModes: [google.maps.drawing.OverlayType.RECTANGLE,google.maps.drawing.OverlayType.MARKER]
			},
			rectangleOptions: {
			    editable: true,
			    draggable: true,
			    fillColor: "red",
			    fillOpacity: 0.1,
			    map: gmap,
			    strokeColor: "red",
			    strokeWeight: 1
			},
			markerOptions:{
			    map: gmap,
			    draggable: true
			}
		});
		me.drawingManager.setMap(gmap);	
		
		/*rectangle was created by user*/
		google.maps.event.addListener(me.drawingManager, 'rectanglecomplete', function(rect) {
			//detach old rectangle from map
			if (me.rectangle){
				me.rectangle.setMap(null);
				me.rectangle=null;
			}
			if (me.marker){
				me.marker.setMap(null);
				me.marker=null;				
			}
					
			//store new rectangle
			me.rectangle=rect;
			
			//zoom to selected area
			gmap.fitBounds(me.rectangle.getBounds());
			
			//add handler for bounds changes
			me.setupRectHandler(me.rectangle, me);			
					
			//store the values
			if (me.location){
				var ne = me.rectangle.getBounds().getNorthEast();
				var sw = me.rectangle.getBounds().getSouthWest();
				me.location.beginEdit();
				me.location.set('latmin',sw.lat());
				me.location.set('latmax',ne.lat());
				me.location.set('lonmin',sw.lng());
				me.location.set('lonmax',ne.lng());	
				me.location.endEdit();				
			}
		});
		
		/*marker was created by user*/
		google.maps.event.addListener(me.drawingManager, 'markercomplete', function(mark) {
			//detach old rectangle from map
			if (me.rectangle){
				me.rectangle.setMap(null);
				me.rectangle=null;
			}
			if (me.marker){
				me.marker.setMap(null);
				me.marker=null;				
			}
					
			//store new rectangle
			me.marker=mark;
			
			//add handler for bounds changes
			me.setupMarkerHandler(me.marker, me);			
					
			//store the values
			if (me.location){
				var pt = me.marker.getPosition();
				me.location.beginEdit();				
				me.location.set('latmin',pt.lat());
				me.location.set('latmax',"");
				me.location.set('lonmin',pt.lng());
				me.location.set('lonmax',"");	
				me.location.endEdit();
			}
		});		
	
		me.storeUpdateListener();
			
	},
	onPMDModelChange: function(store,model){
		var me=this;
		me.setStore(store,model);
	},
	onClose: function(){
		var me=this;
		me.detachStore();
	}
//---- local helper functions
,
setStore: function (store,location){
	var me=this;
	me.store=store;
	me.location=location;	
	me.store.addListener('update' , me.storeUpdateListener, me);				
	me.storeUpdateListener();
},
storeUpdateListener: function(){
	
		var me=this;

		if (!me.gmap)
			return;
	
		var bounds=null;
	
                if (me.location.get('latmin').length>0 && me.location.get('lonmin').length>0 && me.location.get('latmax').length==0  && me.location.get('lonmax').length==0){
                                
			var lat=me.location.get('latmin');
			var lng=me.location.get('lonmin');
					
                        if (me.rectangle) me.rectangle.setMap(null);
                        me.rectangle=null;
                      
                        
			newmarker=new google.maps.Marker({
			    position: new google.maps.LatLng(lat,lng),
			    draggable: true
			});		
			
			if (newmarker && me.marker && newmarker.getPosition().equals(me.marker.getPosition()))
				return;			
                        
                        if (!newmarker)
                            return;

                        if (me.marker) 
                            me.marker.setMap(null)                        
       
			me.marker=newmarker;
			me.marker.setMap(me.gmap);
			me.setupMarkerHandler(me.marker, me);
			me.gmap.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(-90, -180),new google.maps.LatLng(90, 180)));						
		}else if (me.location.get('latmin').length>0 && me.location.get('lonmin').length>0 && me.location.get('latmax').length>0  && me.location.get('lonmax').length>0 
                            && me.location.get('latmin')!=me.location.get('latmax') && me.location.get('lonmin')!=me.location.get('lonmax')){
			
			bounds = new google.maps.LatLngBounds(
			      new google.maps.LatLng(me.location.get('latmin'), me.location.get('lonmin')),
			      new google.maps.LatLng(me.location.get('latmax'), me.location.get('lonmax'))
			);
                
			if (me.marker) me.marker.setMap(null)                        
                        me.marker=null; 
                        
			var newrectangle = new google.maps.Rectangle({
			    bounds: bounds,
			    editable: true,
			    draggable: true,
			    fillColor: "red",
			    fillOpacity: 0.1,
			    strokeColor: "red",
			    strokeWeight: 1
			});
			if (newrectangle && me.rectangle && newrectangle.getBounds().equals(me.rectangle.getBounds()))
				return;	
                        if (!newrectangle)
                            return;
			if (me.rectangle)
				me.rectangle.setMap(null);
			me.rectangle=newrectangle;
			me.rectangle.setMap(me.gmap);				
			me.setupRectHandler(me.rectangle, me);
			me.gmap.fitBounds(me.rectangle.getBounds());								
		}else{ //nothing useful
                    	if (me.marker) me.marker.setMap(null)
                        if (me.rectangle) me.rectangle.setMap(null);
 			me.marker=me.rectangle=null;
			bounds = new google.maps.LatLngBounds(new google.maps.LatLng(-90, -180),new google.maps.LatLng(90, 180));
			me.gmap.fitBounds(bounds);                                       
                }
		

},
detachStore: function(){
//remove handlers;
	var me=this;
	if (me.store){
		me.store.removeListener('update' , me.storeUpdateListener, me);		
	}
	
	if (me.rectangle)
		me.rectangle.setMap(null);	
	me.rectangle=null;
	
	if (me.marker)
		me.marker.setMap(null);	
	me.marker=null;
	
},
setupRectHandler: function(rectangle, me){
	google.maps.event.addListener(rectangle, "bounds_changed", function() {		
		if (me.location){
			var ne = me.rectangle.getBounds().getNorthEast();
			var sw = me.rectangle.getBounds().getSouthWest();
			me.location.beginEdit();			
			me.location.set('latmin',sw.lat());
			me.location.set('latmax',ne.lat());
			me.location.set('lonmin',sw.lng());
			me.location.set('lonmax',ne.lng());	
			me.location.endEdit();						
		}
	});			
},
setupMarkerHandler: function(marker, me){
	google.maps.event.addListener(marker, "position_changed", function() {		
		if (me.location){
			var pt = marker.getPosition();
			me.location.beginEdit();
			me.location.set('latmin',pt.lat());
			me.location.set('latmax',"");
			me.location.set('lonmin',pt.lng());
			me.location.set('lonmax',"");
			me.location.endEdit();			
		}
	});			
}
 
});

