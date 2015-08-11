Ext.define('PMDMeta.model.endnote.Publication', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'author1',  type: 'string', mapping: function(data){
                return this.getAuthor(0);
        }},
        {name: 'author2',  type: 'string', mapping: function(data){
                return this.getAuthor(1);
        }},
        {name: 'author3',  type: 'string', mapping: function(data){
                return this.getAuthor(2);
        }},
        {name: 'author4',  type: 'string', mapping: function(data){
                return this.getAuthor(3);
        }},
        {name: 'author5',  type: 'string', mapping: function(data){
                return this.getAuthor(4);
        }},
        {name: 'author6',  type: 'string', mapping: function(data){
                return this.getAuthor(5);
        }},
        {name: 'author7',  type: 'string', mapping: function(data){
                return this.getAuthor(6);
        }},
        {name: 'author8',  type: 'string', mapping: function(data){
                return this.getAuthor(7);
        }},
        {name: 'author9',  type: 'string', mapping: function(data){
                return this.getAuthor(8);
        }},
        {name: 'author10',  type: 'string', mapping: function(data){
                return this.getAuthor(9);
        }},
        {name: 'year',   type: 'string', mapping: 'YEAR'},
        {name: 'title',   type: 'string', mapping: 'TITLE'},
        {name: 'publicationplace',   type: 'string', mapping: 'PLACE_PUBLISHED'},
        {name: 'publisher',   type: 'string', mapping: 'PUBLISHER'},	        
        {name: 'typeofwork',   type: 'string', mapping: 'TYPE_OF_WORK' },
        {name: 'url', type: 'string',mapping: 'URL'} 
    ],
    validators: {
	name: { type: 'length', min: 1 }
    },	
    asXML: function(){
            var result="";
            var authors="";
            if (this.get("author1").length>0 || this.get("author2").length>0 || this.get("author3").length>0 ||
            this.get("author4").length>0 || this.get("author5").length>0 || this.get("author6").length>0 || 
            this.get("author7").length>0 || this.get("author8").length>0 || this.get("author9").length>0 ||   
            this.get("author10").length>0 ){ 
                authors+="<AUTHORS>";
                if (this.get("author1").length>0)
                    authors+="<AUTHOR>"+this.get("author1")+"</AUTHOR>"; 
                if (this.get("author2").length>0)
                    authors+="<AUTHOR>"+this.get("author2")+"</AUTHOR>";  
                if (this.get("author3").length>0)
                    authors+="<AUTHOR>"+this.get("author3")+"</AUTHOR>";  
                if (this.get("author4").length>0)
                    authors+="<AUTHOR>"+this.get("author4")+"</AUTHOR>";
                if (this.get("author5").length>0)
                    authors+="<AUTHOR>"+this.get("author5")+"</AUTHOR>";
                if (this.get("author6").length>0)
                    authors+="<AUTHOR>"+this.get("author6")+"</AUTHOR>";
                if (this.get("author7").length>0)
                    authors+="<AUTHOR>"+this.get("author7")+"</AUTHOR>";
                if (this.get("author8").length>0)
                    authors+="<AUTHOR>"+this.get("author8")+"</AUTHOR>";
                if (this.get("author9").length>0)
                    authors+="<AUTHOR>"+this.get("author9")+"</AUTHOR>";
                if (this.get("author10").length>0)
                    authors+="<AUTHOR>"+this.get("author10")+"</AUTHOR>";
                authors+="</AUTHORS>";           
            }
            if ( authors.length>0 ||  this.get("year").length>0 || this.get("title").length>0 ||  this.get("publicationplace").length>0 || 
                this.get("publisher").length>0 || this.get("typeofwork").length>0 || this.get("url").length>0  ) {
                result+="<RECORD>";
                result+=authors;
                if (this.get("year").length>0)
                    result+="<YEAR>"+this.get("year")+"</YEAR>";
                if (this.get("title").length>0)
                    result+="<TITLE>"+this.get("title")+"</TITLE>";
                if (this.get("publicationplace").length>0)
                    result+="<PLACE_PUBLISHED>"+this.get("publicationplace")+"</PLACE_PUBLISHED>";
                if (this.get("publisher").length>0)
                    result+="<PUBLISHER>"+this.get("publisher")+"</PUBLISHER>"
                if (this.get("typeofwork").length>0)
                    result+="<TYPE_OF_WORK>"+this.get("typeofwork")+"</TYPE_OF_WORK>";
                if (this.get("url").length>0)
                    result+="<URL>"+this.get("url")+"</URL>";
                result+="</RECORD>"
            }
            return result;

    },
    getAuthor:function(data,idx){
        var name=Ext.DomQuery.select('AUTHOR',data);
        if (name.length>idx)
            return Ext.String.htmlDecode(name[idx]);
        return "";
    },
    getCitation:function(){
        var result="";

        if (this.get("author1").length>0)
            result+=this.get("author1");
        if (this.get("author2").length>0)
            result+="; "+this.get("author2");  
        if (this.get("author3").length>0)
            result+="; "+this.get("author3");    
        if (this.get("author4").length>0)
            result+="; "+this.get("author4");  
        if (this.get("author5").length>0)
            result+="; "+this.get("author5");  
        if (this.get("author6").length>0)
            result+="; "+this.get("author6");  
        if (this.get("author7").length>0)
            result+="; "+this.get("author7");  
        if (this.get("author8").length>0)
            result+="; "+this.get("author8");  
        if (this.get("author9").length>0)
            result+="; "+this.get("author9");  
        if (this.get("author10").length>0)
            result+="; "+this.get("author10");                  
        if (this.get("year").length>0)
            result+="("+this.get("year")+")";
        if (this.get("title").length>0)
            result+=": "+this.get("title")+".";
        if (this.get("publisher").length>0)
            result+=" "+this.get("publisher")+".";
        if (this.get("publicationplace").length>0)
            result+="("+this.get("publicationplace")+" "+this.get("year")+")";                    
        if (this.get("url").length>0)
            result+=" "+this.get("url");                

        return result;
    }
});


