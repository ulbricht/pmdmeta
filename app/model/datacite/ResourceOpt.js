Ext.define('PMDMeta.model.datacite.ResourceOpt', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'resourceTypeGeneral',   type: 'string', mapping: 'resourceType@resourceTypeGeneral'},
		{name: 'resourceType',   type: 'string', mapping: 'resourceType'},
		{name: 'language',   type: 'string', mapping: 'language'},
		{name: 'version', type: 'string', mapping: 'version'}
	],
	asXML: function(param){
	
		var resourceType= '<resourceType resourceTypeGeneral="'+this.get('resourceTypeGeneral')+'">'+this.get('resourceType')+'</resourceType>';
		var language= '<language>'+this.get('language')+'</language>';
		var version='<version>'+this.get('version')+'</version>';

		if (param=='language' && this.get('language') && this.get('language').length>0)
			return language;

		if (param=='resourceType' && this.get('resourceTypeGeneral') && this.get('resourceTypeGeneral').length>0)
			return resourceType;
		
		if (param=='version' && this.get('version') && this.get('version').length>0)
			return version;		
		
		return "";		
	}
});


