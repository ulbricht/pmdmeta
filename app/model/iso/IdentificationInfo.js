Ext.define('PMDMeta.model.iso.IdentificationInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'title',  type: 'string', mapping: function(data){
                var abstracttext=Ext.DomQuery.selectNode('gmd|title',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString',abstracttext);
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'abstract',  type: 'string', mapping: function(data){
                var abstracttext=Ext.DomQuery.selectNode('gmd|abstract',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString',abstracttext);
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'status',   type: 'string', mapping: function(data){
                var status=Ext.DomQuery.selectNode('gmd|status',data);
                var ret=Ext.DomQuery.selectValue('gmd|MD_ProgressCode',status);
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'language',   type: 'string', mapping: function(data){
                var lang=Ext.DomQuery.selectNode('gmd|language',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString',lang);        
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'characterset',   type: 'string', mapping: function(data){
                var charset=Ext.DomQuery.selectNode('gmd|characterSet',data);
                var ret=Ext.DomQuery.selectValue('gmd|MD_CharacterSetCode',charset);
                if (ret)
                    return ret;
                else
                    return "";
        }},        
        {name: 'isotopic',   type: 'string', mapping: function(data){
                var topic=Ext.DomQuery.selectNode('gmd|topicCategory',data);
                var ret=Ext.DomQuery.selectValue('gmd|MD_TopicCategoryCode',topic);
                if (ret)
                    return ret;
                else
                    return "";
        }}
    ],
    asXML: function(param){
        var ret="";

        switch (param){
            case 'title': 
                ret+='<gmd:title>';
                ret+='<gco:CharacterString>';
                if (this.get('title').length>0)
                    ret+=this.get('title');
                ret+='</gco:CharacterString>';
                ret+='</gmd:title>';                
                break;            
            case 'abstract': 
                ret+='<gmd:abstract>';
                ret+='<gco:CharacterString>';
                if (this.get('abstract').length>0)
                    ret+=this.get('abstract');
                ret+='</gco:CharacterString>';
                ret+='</gmd:abstract>';                
                break;
            case 'status':
                ret+='<gmd:status>';
                ret+='<gmd:MD_ProgressCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#MD_ProgressCode" codeListValue="Complete">Complete</gmd:MD_ProgressCode>';
                ret+='</gmd:status>';
                break;
            case 'language': 
                ret+='<gmd:language>';
                ret+='<gco:CharacterString>';
               // ret+=this.get('language');
                ret+='eng';
                ret+='</gco:CharacterString>';
                ret+='</gmd:language>';
                break;
            case 'characterset': 
                ret+='<gmd:characterSet>';
                ret+='<gmd:MD_CharacterSetCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode" codeListValue="';
                //ret+=this.get('characterset');
                ret+='utf8';
                ret+='"/>';
                ret+='</gmd:characterSet>';
                break;
            case 'isotopic': break;
                ret+='<gmd:topicCategory>';
                ret+='<gmd:MD_TopicCategoryCode>';
                if (this.get('isotopic').length==0)
                    ret+='geoscientificInformation';
                else
                    ret+=this.get('isotopic');
                ret+='</gmd:MD_TopicCategoryCode>';
                ret+='</gmd:topicCategory>';            
        }
        return ret;
    }
});


