Ext.define('PMDMeta.store.datacite.RelatedIdentifier', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.RelatedIdentifier',
    storeId: 'DataCiteRelatedIdentifier',    
    proxy:{
            type: 'memory',

        reader:{
                type: 'xml',
                record: 'relatedIdentifier'
                }
        },
    asXML: function (){
            var ret="";
            var result="";
            this.each(function(data){			
                    ret+=data.asXML();
            });

            if (ret.length>0)
                    result="<relatedIdentifiers>"+ret+"</relatedIdentifiers>";

            return result;
    },
    asISOXML: function (){
            var ret="";
            var result="";
            this.each(function(data){			
                    ret+=data.asISOXML();
            });

            if (ret.length>0)
                    result=ret;

            return result;
    }/*,
    listeners: {
        add: function (store, records, index, eOpts){

            Ext.Array.each(records, function (record, index){
                var modifiedFieldNames= Array();
                Ext.Array.each(record.getFields(), function (fieldname){
                    modifiedFieldNames.push(fieldname.getName());
                });
                store.lookupcitation(record, modifiedFieldNames);
            });
        },
        update: function( store, record, operation, modifiedFieldNames, details, eOpts ){
            store.lookupcitation(record, modifiedFieldNames);
        }
    },

    lookupcitation: function (record, modifiedFieldNames){
        console.log(modifiedFieldNames)
        console.log(record);
	    
        if (modifiedFieldNames.indexOf("identifier")==-1 && modifiedFieldNames.indexOf("identifierType")==-1)
            return;


        if (record.get("identifierType")==="DOI" && record.get("identifier").length >0){



		Ext.Ajax.request({
		    url: '../getcitationinfo.php',
		    method: 'GET',
		    params: {
			doi: "http://dx.doi.org/"+record.get("identifier"),
			item: null
		    },
		    success: function(response){
			    console.log(response.responseText);
			var ret = JSON.parse(response.responseText);		    
			    record.set("citation",ret.citation);
		    }
});

        }


    }*/
});			

