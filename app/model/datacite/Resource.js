Ext.define('PMDMeta.model.datacite.Resource', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'identifier',  type: 'string', mapping: 'identifier'},
		{name: 'identifiertype',   type: 'string', mapping: 'identifier@identifierType'},
		{name: 'publisher',   type: 'string', mapping: 'publisher'},
		{name: 'publicationYear',   type: 'string', mapping: 'publicationYear'}
	],
        validators: {
		publicationYear: { type: 'format', matcher:  /^\d{4}$/, message: 'Must a four digit year.' }
	},
	asXML: function(param){	
		var identifier= '<identifier identifierType="'+this.get('identifiertype')+'">'+this.get('identifier')+'</identifier>';
		var publisher= '<publisher>'+this.get('publisher')+'</publisher>';
		var publicationYear= '<publicationYear>'+this.get('publicationYear')+'</publicationYear>';
	
		if (param=='identifier' && this.get('identifiertype').length>0 && this.get('identifier').length>0)
			return identifier;
		if (param=='publisher' && this.get('publisher').length>0)
			return publisher;
		if (param=='publicationYear' && this.get('publicationYear').length>0)
			return publicationYear;
		
		return "";
		
	},
        asDifXML: function (param){
            if (param=='entryid'){
                return '<dif:Entry_ID>'+this.get('identifier')+'</dif:Entry_ID>';
            }else if (param=='publicationYear'){
                return '<dif:Dataset_Release_Date>'+this.get('publicationYear')+'</dif:Dataset_Release_Date>';
            }else if (param=='publisher'){
                return '<dif:Dataset_Publisher>'+this.get('publisher')+'</dif:Dataset_Publisher>'               
            }else if (param=='identifierlink'){
                return '<dif:Online_Resource>http://dx.doi.org/'+this.get('identifier')+'</dif:Online_Resource>'
            }                      
            
        }
});


