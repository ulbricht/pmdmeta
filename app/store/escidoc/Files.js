Ext.define('PMDMeta.store.escidoc.Files', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.escidoc.ItemFile',
    sorters: { property: "name", direction: "DESC" },
    storeId: 'Files',
	proxy:{
		type: 'ajax',
                url: 'resources/retrieve.php',
		reader:{
			type: 'xml',		
			record: 'components|component'
		},
                limitParam: false,
                pageParam: false,
                startParam: false
	},
	asXML: function (){
            var components=new Array();
            this.each(function(data){			
                var component=new Object();
                    component[data.get('href')]=data.asXML();
                    components.push(component);                        
            });

            Ext.each(this.getRemovedRecords(),function(data){			
                var component=new Object();
                    component[data.get('href')]=null;
                    components.push(component);                        
            });

            return components;                
	},
        asDataCiteXML: function(param){
            
            if (this.getCount()==0)
                return "";
            
            if (param=='size'){
                var size="";
                var filesize=0;                
                
                this.each(function(data){
                    if (data.get('size').length >0)
                        filesize+=parseInt(data.get('size'));
                });  

                if (filesize>0)
                    size+='<size>'+filesize+' Bytes</size>'
                if (this.getCount()>0)
                    size+='<size>'+this.getCount()+' Files</size>'            
                if (size.length>0)
                    return '<sizes>'+size+'</sizes>';
                
                
            }else if (param=='format'){
                var format="";
                this.each(function(data){
                    if (data.get('type').length>0)
                        format+='<format>'+data.get('type')+'</format>';
                });  
                if (format.length>0)
                    return '<formats>'+format+'</formats>';
                }
        }
});
