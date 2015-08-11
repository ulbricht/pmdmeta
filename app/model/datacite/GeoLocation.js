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
			var location=bbox.firstChild.textContent.split(/[ ]+/);
			ret.latmin=location[0];
			ret.latmax=location[2];
			ret.lonmin=location[1];
			ret.lonmax=location[3];	
		}else if (point){
			var location=point.firstChild.textContent.split(/[ ]+/);
			ret.latmin=location[0];
			ret.lonmin=location[1];				
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
			var location=bbox.firstChild.textContent.split(/[ ]+/);
			ret.latmin=location[0];
			ret.latmax=location[2];
			ret.lonmin=location[1];
			ret.lonmax=location[3];	
		}else if (point){
			var location=point.firstChild.textContent.split(/[ ]+/);
			ret.latmin=location[0];
			ret.lonmin=location[1];				
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
			var location=bbox.firstChild.textContent.split(/[ ]+/);
			ret.latmin=location[0];
			ret.latmax=location[2];
			ret.lonmin=location[1];
			ret.lonmax=location[3];	
		}else if (point){
			var location=point.firstChild.textContent.split(/[ ]+/);
			ret.latmin=location[0];
			ret.lonmin=location[1];				
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
			var location=bbox.firstChild.textContent.split(/[ ]+/);
			ret.latmin=location[0];
			ret.latmax=location[2];
			ret.lonmin=location[1];
			ret.lonmax=location[3];	
		}else if (point){
			var location=point.firstChild.textContent.split(/[ ]+/);
			ret.latmin=location[0];
			ret.lonmin=location[1];				
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
		if (this.get('latmin') && this.get('lonmin') && this.get('latmax') && this.get('lonmax') &&
			this.get('latmin').length>0 && this.get('lonmin').length>0 && this.get('latmax').length>0 && this.get('lonmax').length>0)
			result+='<geoLocationBox>'+this.get('latmin')+' '+this.get('lonmin')+' '+this.get('latmax')+' '+this.get('lonmax')+'</geoLocationBox>';
		else if (this.get('latmin') && this.get('lonmin') &&	this.get('latmin').length>0 && this.get('lonmin').length>0)
			result+='<geoLocationPoint>'+this.get('latmin')+' '+this.get('lonmin')+'</geoLocationPoint>';
		if (this.get('place') && this.get('place').length>0)
			result+='<geoLocationPlace>'+Ext.String.htmlEncode(this.get('place'))+'</geoLocationPlace>';
		if (result.length>0)
			return '<geoLocation>'+result+'</geoLocation>';
		else
			return "";
	}/*,
        asISOXML: function(){        
            var ret="";            
            ret+='<gmd:extent>';
            ret+='<gmd:EX_Extent>';                
            if (this.get('place')){
                ret+='<gmd:description>';
                ret+='<gco:CharacterString>'+Ext.String.htmlEncode(this.get('place'))+'</gco:CharacterString>';
                ret+='</gmd:description>';
            }            
            ret+='<gmd:geographicElement>';
            ret+='<gmd:EX_GeographicBoundingBox>';
            ret+='<gmd:westBoundLongitude>';
            ret+='<gco:Decimal>';
            ret+=this.get('lonmin');
            ret+='</gco:Decimal>';
            ret+='</gmd:westBoundLongitude>';
            ret+='<gmd:eastBoundLongitude>';
            ret+='<gco:Decimal>';            
            if (this.get('lonmax').length>0)        
                ret+=this.get('lonmax');
            else
                ret+=this.get('lonmin');                
            ret+='</gco:Decimal>';
            ret+='</gmd:eastBoundLongitude>';
            ret+='<gmd:southBoundLatitude>';
            ret+='<gco:Decimal>';
            ret+=this.get('latmin');
            ret+='</gco:Decimal>';
            ret+='</gmd:southBoundLatitude>';
            ret+='<gmd:northBoundLatitude>';
            ret+='<gco:Decimal>';
            if (this.get('latmax').length>0)
                ret+=this.get('latmax');
            else
                ret+=this.get('latmin');                
            ret+='</gco:Decimal>';
            ret+='</gmd:northBoundLatitude>';
            ret+='</gmd:EX_GeographicBoundingBox>';
            ret+='</gmd:geographicElement>';
            ret+='</gmd:EX_Extent>';                
            ret+='</gmd:extent>'
            return ret;
        }*/

});
