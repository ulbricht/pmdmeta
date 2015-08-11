Ext.define('PMDMeta.model.dif.SpatialCoverage', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'latmin',  type: 'string',mapping :function(data) {
            return Ext.DomQuery.selectValue('dif|Southernmost_Latitude',data);
	}},
        {name: 'latmax',   type: 'string',mapping :function(data) {
            return Ext.DomQuery.selectValue('dif|Northernmost_Latitude',data);
	}},
        {name: 'lonmin',  type: 'string',mapping :function(data) {
            return Ext.DomQuery.selectValue('dif|Westernmost_Longitude',data);
	}},
        {name: 'lonmax',   type: 'string',mapping :function(data) {
            return Ext.DomQuery.selectValue('dif|Easternmost_Longitude',data);
        }}
    ]
});