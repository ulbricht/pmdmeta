Ext.define('PMDMeta.model.datacite.FundingReference', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'funderName',  type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('funderName',data);
		    if (name && name.length > 0 )
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }},
		{name: 'funderIdentifier',  type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('funderIdentifier',data);
		    if (name && name.length > 0 )
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }},
		{name: 'funderIdentifierType',  type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('funderIdentifier@funderIdentifierType',data);
		    if (name && name.length > 0 )
                        return name;
                    else
                        return "";
                }},
		{name: 'awardNumber',  type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('awardNumber',data);
		    if (name && name.length > 0 )
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }},
		{name: 'awardURI',  type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('awardNumber@awardURI',data);
		    if (name && name.length > 0 )
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }},
		{name: 'awardTitle',  type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectValue('awardTitle',data);
		    if (name && name.length > 0 )
                        return Ext.String.htmlDecode(name);
                    else
                        return "";
                }}
	],
	validators: {
		funderName: { type: 'length', min: 1 }
	},
	asXML: function(){
		var name=this.get('funderName');
		var funderid=this.get('funderIdentifier');
		var funderidtype=this.get('funderIdentifierType');
		var awardno=this.get('awardNumber');
		var awarduri=this.get('awardURI');
		var awardtitle=this.get('awardTitle');
		var result="";
		if (name.length>0)
			result+='<funderName>'+Ext.String.htmlEncode(name)+'</funderName>';
			
		if (funderid.length>0 || funderidtype.length>0){
			var type="";
			if (funderidtype.length>0)
				type='funderIdentifierType="'+funderidtype+'"';
			result+='<funderIdentifier '+type+'>'+Ext.String.htmlEncode(funderid)+'</funderIdentifier>';
		}
		
		if (awardno.length>0 || awarduri.length>0){
			var uri="";
			if (awarduri.length>0)
				uri='awardURI="'+Ext.String.htmlEncode(awarduri)+'"';;
			result+='<awardNumber '+uri+'>'+Ext.String.htmlEncode(awardno)+'</awardNumber>';
		}
		
		if (awardtitle.length>0)
			result+='<awardTitle>'+Ext.String.htmlEncode(awardtitle)+'</awardTitle>';

		if (result.length>0)
			return '<fundingReference>'+result+'</fundingReference>';

		return "";
	}	
});


