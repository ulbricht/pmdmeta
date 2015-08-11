Ext.define('PMDMeta.model.iso.Keyword', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'keyword',  type: 'string', mapping:function(data){
                    var keyword=Ext.DomQuery.selectValue('gco|CharacterString',data);
                    if (keyword)
                        return keyword;
                    else
                        return "";
                }},
		{name: 'thesaurus',   type: 'string', mapping:function(data){
                    var mdkeyword=data.parentNode;
                    if (!mdkeyword) return "";                    
                    var descriptivekeywords=mdkeyword.parentNode;
                    if (!descriptivekeywords) return "";                    
                    var thesaurusname=Ext.DomQuery.selectNode('gmd|thesaurusName',descriptivekeywords);
                    if (!thesaurusname) return "";
                    var ret=Ext.DomQuery.selectValue('gmd|title',thesaurusname);       
                    if (ret)
                        return ret;
                    else
                        return "";
                }},
		{name: 'pubdate',   type: 'string', mapping:function(data){
                    var mdkeyword=data.parentNode;
                    if (!mdkeyword) return "";
                    var descriptivekeywords=mdkeyword.parentNode;
                    if (!descriptivekeywords) return "";                    
                    var thesaurusname=Ext.DomQuery.selectNode('gmd|thesaurusName',descriptivekeywords);
                    if (!thesaurusname) return "";
                    var date=Ext.DomQuery.selectNode('gmd|date',thesaurusname);
                    if (!date) return "";                    
                    var ret=Ext.DomQuery.selectValue('gmd|date',date);
                    if (ret)
                            return ret;
                        else
                            return "";
                }}
	],
	validators: {
		subject: { type: 'length', min: 1 }
	},
        asXML: function (type){
            var ret="";         
            
            if (type=="keyword"){
                if (this.get("subject").length>0){
                    ret+='<gmd:keyword>';
                    ret+='<gco:CharacterString>'+this.get("subject")+'</gco:CharacterString>';
                    ret+='</gmd:keyword>';
                }
            }else if (type=="thesaurus"){
                if (this.get('thesaurus')){
                    ret+='<gmd:thesaurusName>';
                    ret+='<gmd:CI_Citation>';
                    ret+='<gmd:title>';
                    ret+='<gco:CharacterString>'+this.get('thesaurus')+'</gco:CharacterString>';
                    ret+='</gmd:title>';
                    if (this.get('pubdate').length>0){
                        ret+='<gmd:date>';
                        ret+='<gmd:CI_Date>';
                        ret+='<gmd:date>';
                        ret+='<gco:Date>'+this.get('pubdate')+'</gco:Date>';
                        ret+='</gmd:date>';
                        ret+='<gmd:dateType>';
                        ret+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication" >publication</gmd:CI_DateTypeCode>';
                        ret+='</gmd:dateType>';
                        ret+='</gmd:CI_Date>';
                        ret+='</gmd:date>';
                    }
                    ret+='</gmd:CI_Citation>';
                    ret+='</gmd:thesaurusName>';
                }
            }
            return ret;
        }
});


