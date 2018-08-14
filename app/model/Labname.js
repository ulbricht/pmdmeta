Ext.define('PMDMeta.model.Labname', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'domain',  type: 'string'},
        {name: 'name',   type: 'string'},
        {name: 'affiliation',   type: 'string'},
	{name: 'searchname', type: 'string',
	    convert: function( v, record ) {
	       return record.get( 'domain' ) + ': ' + record.get( 'name' );
	    }
        }	
    ]
});


