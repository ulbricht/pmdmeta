Ext.define('PMDMeta.model.iso.ResponsibleParty', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',  type: 'string', mapping: function(data){
                var name=Ext.DomQuery.selectNode('gmd|individualName',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString ',name);         
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'affiliation',   type: 'string', mapping: function(data){
                var name=Ext.DomQuery.selectNode('gmd|organisationName',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString ',name);                        
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'isoposition',   type: 'string', mapping: function(data){
                var name=Ext.DomQuery.selectNode('gmd|positionName',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString ',name);
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'email',   type: 'string', mapping: function(data){
                var mail=Ext.DomQuery.selectNode('gmd|electronicMailAddress',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString ',mail);
                if (ret)
                    return ret;
                else
                    return "";
        }},        
        {name: 'phone',   type: 'string', mapping: function(data){
                var phone=Ext.DomQuery.selectNode('gmd|voice',data);
                var ret=Ext.DomQuery.selectValue('gco|CharacterString ',phone);
                if (ret)
                    return ret;
                else
                    return "";
        }},	        
        {name: 'isorole',   type: 'string', mapping: function(data){
                var role=Ext.DomQuery.selectNode('gmd|role',data);
                var ret=Ext.DomQuery.selectValue('gmd|CI_RoleCode',role);                        
                if (ret)
                    return ret;
                else
                    return "";
        }},
        {name: 'internet',   type: 'string', mapping: function(data){
                var onlineresource=Ext.DomQuery.selectNode('gmd|onlineResource',data);
                var linkage=Ext.DomQuery.selectNode('gmd|linkage',onlineresource);                   
                var ret=Ext.DomQuery.selectValue('gmd|URL',linkage);                        
                if (ret)
                    return ret;
                else
                    return "";
        }}
    
    ],	validators: {
	isorole: { type: 'length', min: 1 },
        name: { type: 'length', min: 1 }
    },
    asXML: function(){
        var ret="";

        if (this.get('name').length==0 && this.get('affiliation').length==0 && this.get('isoposition').length==0 && this.get('email').length==0 &&
                this.get('phone').length==0 && this.get('internet').length==0)
            return ret;
       
         ret+='<gmd:CI_ResponsibleParty>';
         if (this.get('name').length>0){             
            ret+='<gmd:individualName>';
            ret+='<gco:CharacterString>'+this.get('name')+'</gco:CharacterString>';
            ret+='</gmd:individualName>';
         }

         if (this.get('affiliation').length>0){
            ret+='<gmd:organisationName>';
            ret+='<gco:CharacterString>'+this.get('affiliation')+'</gco:CharacterString>';
            ret+='</gmd:organisationName>';
         }
         if (this.get('isoposition').length>0){
            ret+='<gmd:positionName><gco:CharacterString>';
            ret+=this.get('isoposition');
            ret+='</gco:CharacterString></gmd:positionName>'
        }
         if (this.get('phone').length>0 || this.get('email').length>0 || this.get('internet').length>0){         
         
            ret+='<gmd:contactInfo>';         
            ret+='<gmd:CI_Contact>';         
            if (this.get('phone').length>0){
               ret+='<gmd:phone>';
               ret+='<gmd:CI_Telephone>';
               ret+='<gmd:voice>';
               ret+='<gco:CharacterString>'+this.get('phone')+'</gco:CharacterString>';
               ret+='</gmd:voice>';
               ret+='</gmd:CI_Telephone>';
               ret+='</gmd:phone>';
            }
            if (this.get('email').length>0){
               ret+='<gmd:address>';
               ret+='<gmd:CI_Address>';
               ret+='<gmd:electronicMailAddress>';
               ret+='<gco:CharacterString>'+this.get('email')+'</gco:CharacterString>';
               ret+='</gmd:electronicMailAddress>';
               ret+='</gmd:CI_Address>';
               ret+='</gmd:address>';
            }
            if (this.get('internet').length>0){            
                ret+='<gmd:onlineResource>';
                ret+='<gmd:CI_OnlineResource>';
                ret+='<gmd:linkage>';
                ret+='<gmd:URL>'+this.get('internet')+'</gmd:URL>';
                ret+='</gmd:linkage>';
                ret+='<gmd:function>';
                ret+='<gmd:CI_OnLineFunctionCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_OnLineFunctionCode_information">information</gmd:CI_OnLineFunctionCode>';
                ret+='</gmd:function>';
                ret+='</gmd:CI_OnlineResource>';
                ret+='</gmd:onlineResource>';
            }
            ret+='</gmd:CI_Contact>';            
            ret+='</gmd:contactInfo>';            
        }
        ret+='<gmd:role>';
        ret+='<gmd:CI_RoleCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_RoleCode" codeListValue="'+this.get('isorole')+'" >'+this.get('isorole')+'</gmd:CI_RoleCode>';
        ret+='</gmd:role>';
        ret+='</gmd:CI_ResponsibleParty>';
        return ret;

    },
    getKey: function(){
        var ret=this.get('name').trim()+this.get('affiliation').trim()+this.get('isoposition').trim()+this.get('email')+this.get('phone')+this.get('isorole').trim();
        if (ret.length>0)
            return ret;
        else
            return null;
    }


});


