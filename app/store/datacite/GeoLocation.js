Ext.define('PMDMeta.store.datacite.GeoLocation', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.GeoLocation',
    storeId: 'DataCiteGeoLocation',
    proxy:{
            type: 'memory',

        reader:{
                type: 'xml',
                record: 'geoLocation'
                }
        },
    asXML: function (){
            var ret="";
            var result="";
            this.each(function(data){			
                    ret+=data.asXML();
            });

            if (ret.length>0)
                    result="<geoLocations>"+ret+"</geoLocations>";

            return result;
    },
    asISOXML: function (){
            var ret="";
            this.each(function(data){
                if (data.asISOXML)
                    ret+=data.asISOXML();
            });
            return ret;
    }
});			

