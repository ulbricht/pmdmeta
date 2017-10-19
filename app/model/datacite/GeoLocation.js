Ext.define('PMDMeta.model.datacite.GeoLocation', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'latmin',  type: 'string',mapping :function(data) {
		var point=Ext.DomQuery.selectNode('geoLocationPoint',data);
		var bbox=Ext.DomQuery.selectNode('geoLocationBox',data);				
		var ret=new Object();
		ret.latmin=null;
		ret.latmax=null;
		ret.lonmin=null;
		ret.lonmax=null;
		if (bbox){
			var west=Ext.DomQuery.selectValue('westBoundLongitude',bbox);
			var east=Ext.DomQuery.selectValue('eastBoundLongitude',bbox);
			var south=Ext.DomQuery.selectValue('southBoundLatitude',bbox);
			var north=Ext.DomQuery.selectValue('northBoundLatitude',bbox);

			if (west && east && north && south && (west.length>0 || east.length>0 || north.length>0 || south.length>0)){	
				ret.latmin=south;
				ret.latmax=north;
				ret.lonmin=west;
				ret.lonmax=east;
			}else{
				var location=bbox.firstChild.textContent.split(/[ ]+/);
				ret.latmin=location[0];
				ret.latmax=location[2];
				ret.lonmin=location[1];
				ret.lonmax=location[3];	
			}
		}else if (point){
			var lat=Ext.DomQuery.selectValue('pointLatitude',point);
			var lon=Ext.DomQuery.selectValue('pointLongitude',point);
			if (lat && lon && (lat.length>0 || lon.length>0)){	
				ret.latmin=lat;
				ret.lonmin=lon;
			}else{
				var location=point.firstChild.textContent.split(/[ ]+/);
				ret.latmin=location[0];
				ret.lonmin=location[1];
			}	
		}

		return ret.latmin;
	}},
        {name: 'latmax',   type: 'string', mapping: function(data) {
		var point=Ext.DomQuery.selectNode('geoLocationPoint',data);
		var bbox=Ext.DomQuery.selectNode('geoLocationBox',data);				
		var ret=new Object();
		ret.latmin=null;
		ret.latmax=null;
		ret.lonmin=null;
		ret.lonmax=null;
		if (bbox){
			var west=Ext.DomQuery.selectValue('westBoundLongitude',bbox);
			var east=Ext.DomQuery.selectValue('eastBoundLongitude',bbox);
			var south=Ext.DomQuery.selectValue('southBoundLatitude',bbox);
			var north=Ext.DomQuery.selectValue('northBoundLatitude',bbox);

			if (west && east && north && south && (west.length>0 || east.length>0 || north.length>0 || south.length>0)){	
				ret.latmin=south;
				ret.latmax=north;
				ret.lonmin=west;
				ret.lonmax=east;
			}else{
				var location=bbox.firstChild.textContent.split(/[ ]+/);
				ret.latmin=location[0];
				ret.latmax=location[2];
				ret.lonmin=location[1];
				ret.lonmax=location[3];	
			}
		}else if (point){
			var lat=Ext.DomQuery.selectValue('pointLatitude',point);
			var lon=Ext.DomQuery.selectValue('pointLongitude',point);
			if (lat && lon && (lat.length>0 || lon.length>0)){	
				ret.latmin=lat;
				ret.lonmin=lon;
			}else{
				var location=point.firstChild.textContent.split(/[ ]+/);
				ret.latmin=location[0];
				ret.lonmin=location[1];
			}	
		}		

		return ret.latmax;

	}},
        {name: 'lonmin',  type: 'string', mapping:function(data) {
		var point=Ext.DomQuery.selectNode('geoLocationPoint',data);
		var bbox=Ext.DomQuery.selectNode('geoLocationBox',data);				
		var ret=new Object();
		ret.latmin=null;
		ret.latmax=null;
		ret.lonmin=null;
		ret.lonmax=null;
		if (bbox){
			var west=Ext.DomQuery.selectValue('westBoundLongitude',bbox);
			var east=Ext.DomQuery.selectValue('eastBoundLongitude',bbox);
			var south=Ext.DomQuery.selectValue('southBoundLatitude',bbox);
			var north=Ext.DomQuery.selectValue('northBoundLatitude',bbox);

			if (west && east && north && south && (west.length>0 || east.length>0 || north.length>0 || south.length>0)){	
				ret.latmin=south;
				ret.latmax=north;
				ret.lonmin=west;
				ret.lonmax=east;
			}else{
				var location=bbox.firstChild.textContent.split(/[ ]+/);
				ret.latmin=location[0];
				ret.latmax=location[2];
				ret.lonmin=location[1];
				ret.lonmax=location[3];	
			}
		}else if (point){
			var lat=Ext.DomQuery.selectValue('pointLatitude',point);
			var lon=Ext.DomQuery.selectValue('pointLongitude',point);
			if (lat && lon && (lat.length>0 || lon.length>0)){	
				ret.latmin=lat;
				ret.lonmin=lon;
			}else{
				var location=point.firstChild.textContent.split(/[ ]+/);
				ret.latmin=location[0];
				ret.lonmin=location[1];
			}	
		}
		return ret.lonmin;

	}},
        {name: 'lonmax',   type: 'string', mapping:function(data) {
		var point=Ext.DomQuery.selectNode('geoLocationPoint',data);
		var bbox=Ext.DomQuery.selectNode('geoLocationBox',data);				
		var ret=new Object();
		ret.latmin=null;
		ret.latmax=null;
		ret.lonmin=null;
		ret.lonmax=null;
		if (bbox){
			var west=Ext.DomQuery.selectValue('westBoundLongitude',bbox);
			var east=Ext.DomQuery.selectValue('eastBoundLongitude',bbox);
			var south=Ext.DomQuery.selectValue('southBoundLatitude',bbox);
			var north=Ext.DomQuery.selectValue('northBoundLatitude',bbox);

			if (west && east && north && south && (west.length>0 || east.length>0 || north.length>0 || south.length>0)){	
				ret.latmin=south;
				ret.latmax=north;
				ret.lonmin=west;
				ret.lonmax=east;
			}else{
				var location=bbox.firstChild.textContent.split(/[ ]+/);
				ret.latmin=location[0];
				ret.latmax=location[2];
				ret.lonmin=location[1];
				ret.lonmax=location[3];	
			}
		}else if (point){
			var lat=Ext.DomQuery.selectValue('pointLatitude',point);
			var lon=Ext.DomQuery.selectValue('pointLongitude',point);
			if (lat && lon && (lat.length>0 || lon.length>0)){	
				ret.latmin=lat;
				ret.lonmin=lon;
			}else{
				var location=point.firstChild.textContent.split(/[ ]+/);
				ret.latmin=location[0];
				ret.lonmin=location[1];
			}	
		}		
		return ret.lonmax;
	}},
        {name: 'place',   type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('geoLocationPlace',data);
                    if (name)
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }
            }		
    ],	
	validators: {
		latmin: { type: 'length', min: 1 },
		lonmin: { type: 'length', min: 1 }
	},	
	asXML: function(){
		var type="";
		var point="";
		var result="";	
		var latmin=this.get('latmin');
		var latmax=this.get('latmax');
		var lonmin=this.get('lonmin');
		var lonmax=this.get('lonmax');
	
		if (latmin && lonmin && latmax && lonmax &&
			latmin.length>0 && lonmin.length>0 && latmax.length>0 && lonmax.length>0)
			result+= '<geoLocationBox><westBoundLongitude>'+lonmin+'</westBoundLongitude><eastBoundLongitude>'+lonmax+'</eastBoundLongitude><southBoundLatitude>'+latmin+'</southBoundLatitude><northBoundLatitude>'+latmax+'</northBoundLatitude></geoLocationBox>';
		else if (latmin && lonmin &&	latmin.length>0 && lonmin.length>0)
			result+='<geoLocationPoint><pointLongitude>'+lonmin+'</pointLongitude><pointLatitude>'+latmin+'</pointLatitude></geoLocationPoint>';
		if (this.get('place') && this.get('place').length>0)
			result+='<geoLocationPlace>'+Ext.String.htmlEncode(this.get('place'))+'</geoLocationPlace>';
		if (result.length>0)
			return '<geoLocation>'+result+'</geoLocation>';
		else
			return "";
	}

});
