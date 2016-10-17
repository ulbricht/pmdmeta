Ext.define('PMDMeta.model.iso.MD_Metadata', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'fileidentifier',  type: 'string', mapping: function(data){
                var identifier=Ext.DomQuery.selectNode('gmd|fileIdentifier',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString',identifier);               
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'language',   type: 'string', mapping: function(data){
                var lang=Ext.DomQuery.selectNode('gmd|language',data);
                var ret=Ext.DomQuery.selectValue('gmd|LanguageCode',lang);
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'characterset',   type: 'string', mapping: function(data){
                var charset=Ext.DomQuery.selectNode('gmd|characterSet',data);
                var ret=Ext.DomQuery.selectValue('gmd|MD_CharacterSetCode ',charset);
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'hierarchylevel',   type: 'string', mapping: function(data){
                var level=Ext.DomQuery.selectNode('gmd|hierarchyLevel',data);
                var ret=Ext.DomQuery.selectValue('gmd|MD_ScopeCode ',level);
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'hierarchylevelname',   type: 'string'},        
        {name: 'datestamp',   type: 'string', mapping: function(data){
                var stamp=Ext.DomQuery.selectNode('gmd|dateStamp',data);
                var ret=Ext.DomQuery.selectValue('gco|Date ',stamp); 
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'referencesystem',   type: 'string', mapping: function(data){
                var reference=Ext.DomQuery.selectNode('gmd|referenceSystemInfo',data);
                var code=Ext.DomQuery.selectValue('gco|code',reference);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString',code);           
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'isotopic',   type: 'string'}         
    ],
    asXML: function(param){
        var ret="";

        switch (param){
            case 'fileidentifier':  
                var identifier='doi:'+Ext.getStore('DataCiteResource').getAt(0).get('identifier');
                ret+='<gmd:fileIdentifier>';
                ret+='<gco:CharacterString>';
                ret+=identifier;
                ret+='</gco:CharacterString>';
                ret+='</gmd:fileIdentifier>';                
                break;
            case 'language':  
               // var language=this.get('language');
                var language='eng';
                ret+='<gmd:language>';
                ret+='<gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="'
                ret+=language;
                ret+='">';
                ret+=language;
                ret+='</gmd:LanguageCode>';
                ret+='</gmd:language>';                
                break;            
            case 'characterset':
                ret+='<gmd:characterSet>';
                ret+='<gmd:MD_CharacterSetCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode" codeListValue="';
 //               ret+=this.get('characterset');
                ret+='utf8';
                ret+='"/>';
                ret+='</gmd:characterSet>';                
                break;
            case 'hierarchylevel': 
                ret+='<gmd:hierarchyLevel>';
                ret+='<gmd:MD_ScopeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#MD_ScopeCode" codeListValue="'
                ret+=this.get('hierarchylevel');
                ret+='">';
                ret+=this.get('hierarchylevel');
                ret+='</gmd:MD_ScopeCode>';
                ret+='</gmd:hierarchyLevel>';
                break;
            case 'hierarchylevelname': 
                ret+='<gmd:hierarchyLevelName>';
                ret+='<gco:CharacterString>';
                ret+=this.get('hierarchylevelname');
                ret+='</gco:CharacterString>';
                ret+='</gmd:hierarchyLevelName>';
                break;
            case 'datestamp': 
                ret+='<gmd:dateStamp>';
                ret+='<gco:Date>';
                var dt=new Date();
                dt.setTime(Date.now());
                ret+=Ext.Date.format(dt,'Y-m-d');
//                ret+=this.get('datestamp');
                ret+='</gco:Date>';
                ret+='</gmd:dateStamp>';
                break;
            case 'referencesystem': 
                ret+='<gmd:referenceSystemInfo>';
                ret+='<gmd:MD_ReferenceSystem>';
                ret+='<gmd:referenceSystemIdentifier>';
                ret+='<gmd:RS_Identifier>';
                ret+='<gmd:code>';
                ret+='<gco:CharacterString>';
                ret+='4326';
                ret+='</gco:CharacterString>';
                ret+='</gmd:codeCode>';
                ret+='<gmd:code>';
                ret+='<gco:CharacterString>';
                ret+='EPSG';
                ret+='</gco:CharacterString>';
                ret+='</gmd:codeCode>';
                ret+='</gmd:RS_Identifier>';
                ret+='</gmd:referenceSystemIdentifier>';
                ret+='</gmd:MD_ReferenceSystem>';
                ret+='</gmd:referenceSystemInfo>';
                break;
            case 'distributioninfo':  
                var identifier='doi:'+Ext.getStore('DataCiteResource').getAt(0).get('identifier');
	        ret+='<gmd:distributionInfo>';
	        ret+='<gmd:MD_Distribution>';
	        ret+='<gmd:transferOptions>';
	        ret+='<gmd:MD_DigitalTransferOptions>';
	        ret+='<gmd:onLine>';
	        ret+='<gmd:CI_OnlineResource>';
	        ret+='<gmd:linkage>';
	        ret+='<gmd:URL>';
	        ret+='http://dx.doi.org/'+identifier;
	        ret+='</gmd:URL>';	
	        ret+='</gmd:linkage>';   
	        ret+='<gmd:protocol>';
	        ret+='<gco:CharacterString xmlns:gco="http://www.isotc211.org/2005/gco">WWW:LINK-1.0-http--link</gco:CharacterString>';
	        ret+='</gmd:protocol>';
	        ret+='<gmd:name>';
	        ret+='<gco:CharacterString xmlns:gco="http://www.isotc211.org/2005/gco">Download</gco:CharacterString>';
	        ret+='</gmd:name>';
	        ret+='<gmd:description>';
	        ret+='<gco:CharacterString xmlns:gco="http://www.isotc211.org/2005/gco">Download</gco:CharacterString>';
	        ret+='</gmd:description>';
	        ret+='<gmd:function>';
	        ret+='<gmd:CI_OnLineFunctionCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_OnLineFunctionCode_download">download</gmd:CI_OnLineFunctionCode>';
	        ret+='</gmd:function>';
	        ret+='</gmd:CI_OnlineResource>';
	        ret+='</gmd:onLine>';
	        ret+='</gmd:MD_DigitalTransferOptions>';
	        ret+='</gmd:transferOptions>';
	        ret+='</gmd:MD_Distribution>';
	        ret+='</gmd:distributionInfo>';
	            
                break;		
		
        }

        return ret;

    }
});


