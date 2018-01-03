Ext.define('PMDMeta.model.escidoc.ItemFile', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'content',  type: 'string', mapping: function(data){
                var content=Ext.DomQuery.selectNode('components|content',data);
		for (var i=0;i<content.attributes.length;i++){			
			if (content.attributes.item(i).localName=='href' && content.attributes.item(i).value && content.attributes.item(i).value.length >0)
				return content.attributes.item(i).value.replace(/&amp;/g,'&');
		}		
		return null;
		}},
        {name: 'href',  type: 'string', mapping: function(data){
		for (var i=0;i<data.attributes.length;i++){			
			if (data.attributes.item(i).localName=='href' && data.attributes.item(i).value && data.attributes.item(i).value.length >0)
				return data.attributes.item(i).value.replace(/&amp;/g,'&').replace(/%22/g,'"');
		}		
		return null;
		}},            
        {name: 'storage',   type: 'string',mapping: function(data){
		var ret=Ext.DomQuery.selectValue('components|content@storage',data);
		return ret;
		}},            
        {name: 'size',   type: 'string',mapping: function(data){
		var ret=Ext.DomQuery.selectValue('dcterms|extent',data);
		return ret;
		}},
        {name: 'name',   type: 'string',mapping: function(data){
		var ret=Ext.DomQuery.selectValue('prop|file-name',data);
		return ret.replace(/&amp;/g,'&');;
		}},
        {name: 'type',   type: 'string',mapping: function(data){
		var ret=Ext.DomQuery.selectValue('prop|mime-type',data);
		return ret;
		}, defaultValue:'application/octet-stream'},
        {name: 'visibility',   type: 'string',mapping: function(data){
		var ret=Ext.DomQuery.selectValue('prop|visibility',data);
		return ret;
		}, defaultValue:'public'},
        {name: 'content-category',   type: 'string',mapping: function(data){
		var ret=Ext.DomQuery.selectValue('prop|content-category',data);
		return ret;
		}, defaultValue:'semi-structural'},
        {name: 'valid-status',   type: 'string',mapping: function(data){
		var ret=Ext.DomQuery.selectValue('prop|valid-status',data);
		return ret;
		}, defaultValue:'valid'},
        {name: 'description',   type: 'string',mapping: function(data){
		var ret=Ext.DomQuery.selectValue('dc|description',data);
		return ret;
		}},
        {name: 'available',   type: 'string',mapping: function(data){
            var ret=Ext.DomQuery.selectValue('dcterms|available',data);
            return ret;
            }},
        {name: 'license',   type: 'string',mapping: function(data){
            var ret=Ext.DomQuery.selectValue('dcterms|license',data);
            return ret;
            }},
        {name: 'rights',   type: 'string',mapping: function(data){
            var ret=Ext.DomQuery.selectValue('dc|rights',data);
            return ret;
            }},
        {name: 'sortindex',   type: 'integer',mapping: function(data){
            var pos=Ext.DomQuery.selectNode('position',data);
            var ret;
            if (pos)
                ret=Ext.DomQuery.selectValue('index',pos);
            
            return ret;
            }}        
            
        
    ],
    asXML: function(){                
        var component=new Object();        
	component.content='<escidocComponents:component';
        component.content+=' xmlns:escidocComponents="http://www.escidoc.de/schemas/components/0.9"  xmlns:prop="http://escidoc.de/core/01/properties/"';
        component.content+=' xmlns:xlink="http://www.w3.org/1999/xlink">';
	component.content+='<escidocComponents:properties>';
        component.content+='<prop:valid-status>'+this.get('valid-status')+'</prop:valid-status>';
        component.content+='<prop:visibility>'+this.get('visibility')+'</prop:visibility>';
        component.content+='<prop:content-category>'+this.get('content-category')+'</prop:content-category>';
        component.content+='<prop:mime-type>'+this.get('type')+'</prop:mime-type>';
        component.content+='</escidocComponents:properties>';
        component.content+='<escidocComponents:content  xlink:href="'+this.get('content').replace(/&/g,'&amp;').replace(/"/g,'%22').trim()+'" storage="'+this.get('storage')+'"/>';
        component.content+='</escidocComponents:component>'    
        component.mdrecords=new Array();
        var mdrecord=new Object();
        mdrecord['escidoc']='<file:file xmlns:file="http://purl.org/escidoc/metadata/profiles/0.1/file">';
        mdrecord['escidoc']+='<dc:title xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('name').replace(/&/g,'&amp;').trim()+'</dc:title>';
        if (this.get('description') && this.get('description').length >0)
            mdrecord['escidoc']+='<dc:description xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('description')+'</dc:description>';
        mdrecord['escidoc']+='<dc:format xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('type')+'</dc:format>';
        mdrecord['escidoc']+='<dcterms:extent xmlns:dcterms="http://purl.org/dc/terms/">'+this.get('size')+'</dcterms:extent>';
 //      mdrecord['escidoc']+='<dcterms:dateCopyrighted xmlns:dcterms="http://purl.org/dc/terms/"></dcterms:dateCopyrighted>';
        if (this.get('rights') && this.get('rights').length>0)
            mdrecord['escidoc']+='<dc:rights xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('rights')+'</dc:rights>';
        if (this.get('license') && this.get('license').length)
            mdrecord['escidoc']+='<dcterms:license xmlns:dcterms="http://purl.org/dc/terms/">'+this.get('license')+'</dcterms:license>';
        if (this.get('available') && this.get('available').length>0)
            mdrecord['escidoc']+='<dcterms:available xmlns:dcterms="http://purl.org/dc/terms/">'+this.get('available')+'</dcterms:available>';        
        mdrecord['escidoc']+='</file:file>';    
        component.mdrecords.push(mdrecord);
        if (this.get('sortindex')>0){
            mdrecord['position']='<position><index>'+this.get('sortindex')+'</index></position>';
        }else{
            mdrecord['position']=null;
        }

        return component;
    }
});


