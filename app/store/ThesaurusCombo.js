Ext.define('PMDMeta.store.ThesaurusCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.ComboboxURI',
    storeId: 'ThesaurusCombo',
    load: function(){},	
    data: [
			{"id":"GEMET","abbr":"GEMET","name":"GEMET",uri:'http://www.eionet.europa.eu/gemet/'},	
			{"id":"GCMD","abbr":"GCMD","name":"GCMD Science Keywords",uri:'http://gcmdservices.gsfc.nasa.gov/kms/concepts/concept_scheme/sciencekeywords'},
			{"id":"GeoSciML","abbr":"GeoSciML","name":"GeoSciML Vocabulary",uri:'http://resource.geosciml.org/classifier/cgi'},
			{"id":"ISC2014","abbr":"ISC2014","name":"Geologic Era",uri:'http://resource.geosciml.org/vocabulary/timescale'}			
					
]});			

