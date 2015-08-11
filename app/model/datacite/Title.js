Ext.define('PMDMeta.model.datacite.Title', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'title',  type: 'string', mapping :function(data) {
                            if (data.firstChild)
			    return Ext.String.htmlDecode(data.firstChild.textContent);
			}},
		{name: 'titleType',   type: 'string', mapping : '@titleType'},
		{name: 'lang', type: 'string', mapping: function(data){
		for (var i=0;i<data.attributes.length;i++){			
			if (data.attributes.item(i).localName=='lang')
				return data.attributes.item(i).value
		}		
		return null;
		}}
	],validators: {
		title: { type: 'length', min: 1 }
	},
	asXML: function(){
            var type="";
            var lang="";
            var result="";

            if (this.get('titleType') && this.get('titleType').length>0)
                    type=' titleType="'+this.get('titleType')+'"';
            if (this.get('lang') && this.get('lang').length>0)
                    lang=' xml:lang="'+this.get('lang')+'"';			

            if (type.length>0 || lang.length>0 || this.get('title').length>0)
                    result='<title'+type+lang+'>'+Ext.String.htmlEncode(this.get('title'))+'</title>';

            return result;
	},
        asISOXML: function(){
            var ret="";
            if (this.get('title').length>0){
                ret+='<gmd:title>';
                ret+='<gco:CharacterString>';
                if (this.get('title').length>0)
                    ret+=Ext.String.htmlEncode(this.get('title'));
                ret+='</gco:CharacterString>';
                ret+='</gmd:title>';  
            }
            return ret;
        },
        asEscidocXML: function(){
            var result="";
            if (this.get('title').length>0) 
                    result+='<dc:title xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('title')+'</dc:title>';			
            return result;
        },
        asDifXML: function(param){
            if (param=='entry'){
                return '<dif:Entry_Title>'+Ext.String.htmlEncode(this.get('title'))+'</dif:Entry_Title>';
            }else if (param=='citation'){
                return '<dif:Dataset_Title>'+Ext.String.htmlEncode(this.get('title'))+'</dif:Dataset_Title>';                
            }
        }
        
});


