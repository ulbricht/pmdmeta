Ext.define('PMDMeta.model.escidoc.ItemVersion', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'href',  type: 'string', mapping: function(data){
		for (var i=0;i<data.attributes.length;i++){			
			if (data.attributes.item(i).localName=='href')
				return data.attributes.item(i).value;
		}		
		return null;                                
        }},
        {name: 'name',   type: 'string', mapping: function(data){
		var objid=Ext.DomQuery.selectValue('@objid',data);
		var id=objid.split(/:/).pop();
		var timestamp=Ext.DomQuery.selectValue('@timestamp',data);
                var time=timestamp.split(/\./).shift().replace(/T/," ");
                var events=Ext.DomQuery.select('premis|event',data);
                var event=events[0];
                var linkingagent=Ext.DomQuery.select('premis|linkingAgentIdentifier',event);
                var user="";
                Ext.each(linkingagent[0].attributes, function(attribute){
                    if (attribute.name=='xlink:title')
                        user=attribute.value;
                });                
                var ret=id+'-('+time+')['+user+']';
		return ret;
		}
	},
        {name: 'timestamp',   type: 'string', mapping: '@timestamp'}
    ]
});
