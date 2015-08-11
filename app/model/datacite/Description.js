Ext.define('PMDMeta.model.datacite.Description', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'description',  type: 'string', mapping :function(data) {
                        if (data && data.innerHTML){
                            var description=data.innerHTML;                            
                            description=description.replace(/<br[^>]*>/gi, '\n\n');
			    return Ext.String.htmlDecode(description)
                        };
                        return "";
			}},
        {name: 'descriptionType',   type: 'string', mapping: '@descriptionType'},
		{name: 'lang', type: 'string', mapping: function(data){
		for (var i=0;i<data.attributes.length;i++){			
			if (data.attributes.item(i).localName=='lang')
				return data.attributes.item(i).value
		}		
		return null;
		}}
    ],	
	validators: {
		description: { type: 'length', min: 1 },
		descriptionType: { type: 'length', min: 1 }
	},		
	asXML: function(){
		var type="";
		var lang="";
		var result="";
		if (this.get('descriptionType').length>0)
			type=' descriptionType="'+this.get('descriptionType')+'"';
		if (this.get('lang') && this.get('lang').length>0)
			lang=' xml:lang="'+this.get('lang')+'"';
                    
                var description=this.get('description');

		if (description && description.length>0){
                    description=Ext.String.htmlEncode(description);
                    description=description.replace(/(?:\r\n\r\n|\r\r|\n\n)/g, '<br />');
			result='<description'+type+lang+'>'+description+'</description>';
                }
		return result;
	},
        asISOXML: function(){
                var ret="";
                var description=this.get('description');
                if (description.length>0){
                    if (description && description.length>0){
                        ret+=Ext.String.htmlEncode(description);
                    }
                }
                return ret;
        },
        asDifXML: function(){
            var description=this.get('description');
            if (description.length>0)
                return '<dif:Abstract>'+Ext.String.htmlEncode(description)+'</dif:Abstract>';
            else 
                return '';
        }        
});
