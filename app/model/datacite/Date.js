Ext.define('PMDMeta.model.datacite.Date', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'dateFrom',  type: 'string', mapping: function(data) {
			var fromto=data.firstChild.textContent.split("/");
                        var datetime=fromto[0].split("T");
			return datetime[0];
			}},
        {name: 'timeFrom',  type: 'string', mapping: function(data) {
			var fromto=data.firstChild.textContent.split("/");
                        var datetime=fromto[0].split("T");
                        if (datetime.length==1)
                            return "";                        
			return datetime[1];
	}},			
        {name: 'dateTo',  type: 'string', mapping: function(data) {
			var fromto=data.firstChild.textContent.split("/");
                        if (fromto.length==1)
                            return "";
                        var datetime=fromto[1].split("T");
			return datetime[0];
        }},	
        {name: 'timeTo',  type: 'string', mapping: function(data) {
			var fromto=data.firstChild.textContent.split("/");
                        if (fromto.length==1)
                            return "";                        
                        var datetime=fromto[1].split("T");
                        if (datetime.length==1)
                            return "";                        
			return datetime[1];
	}},			
        {name: 'dateType',   type: 'string', mapping: '@dateType'},
        {name: 'status',  type: 'string'}	
    ],	
	validators: {
		dateFrom: { type: 'length', min: 1 },
		dateType: { type: 'length', min: 1 }
	},	
	asXML: function(){
		var type="";
		var dateTo="";
		var result="";
		if (this.get('dateType').length>0)
			type=' dateType="'+this.get('dateType')+'"';
                    
                var from="";
		if (this.get('dateFrom') && this.get('dateFrom').length>0)                
                    from+=this.get('dateFrom')
                if (this.get("timeFrom") && this.get('timeFrom').length>0)
                    from+="T"+this.get("timeFrom");
                
                var to="";
		if (this.get('dateTo') && this.get('dateTo').length>0)
			to='/'+this.get('dateTo');
                if (this.get('timeTo') && this.get('timeTo').length>0)
                        to+='T'+this.get('timeTo');
                    
		if (from.length>0 || to.length>0)
			result='<date'+type+'>'+from+to+'</date>';
		return result;
	},
        asISOXML: function (param){
            var ret="";
            var type=this.get("dateType");
            var from=this.get("dateFrom");
            var to=this.get("dateTo");
            if (from.length>0 && this.get("timeFrom").length>0)
                from+="T"+this.get("timeFrom");            
            if (to.length>0 && this.get("timeTo").length>0)
                to+="T"+this.get("timeTo");            
            if (param=='coverage' && type=="Collected" && from.length>0){                
                ret+='<gmd:extent>';
                ret+='<gmd:EX_Extent>';                
                ret+="<gmd:temporalElement>";
                ret+="<gmd:EX_TemporalExtent>";
                ret+="<gmd:extent>";                
                if (from != to){
                    ret+='<gml:TimePeriod gml:id="T1'+Date.now()+'">';
                    ret+="<gml:beginPosition>"+from+"</gml:beginPosition>";
                    if (to.length>0){
                        ret+="<gml:endPosition>"+to+"</gml:endPosition>";
                    }else{
                        ret+='<gml:endPosition indeterminatePosition="now"/>'
                    }
                    ret+="</gml:TimePeriod>";
                }else if (from == to){
                    ret+='<gml:TimeInstant gml:id="t2'+Date.now()+'">';
                    ret+='<gml:timePosition>'+from+'</gml:timePosition>';
                    ret+='</gml:TimeInstant>'
                }
                ret+="</gmd:extent>";
                ret+="</gmd:EX_TemporalExtent>";
                ret+="</gmd:temporalElement>";
                ret+='</gmd:EX_Extent>';                
                ret+='</gmd:extent>';                
            }
            if (param=='created' && type=="Created" && from.length>0){
                ret+='<gmd:date>';
                ret+='<gmd:CI_Date>';
                ret+='<gmd:date>';
                ret+='<gco:Date>'+from+'</gco:Date>';
                ret+='</gmd:date>';
                ret+='<gmd:dateType>';
                ret+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="creation">creation</gmd:CI_DateTypeCode>';
                ret+='</gmd:dateType>';
                ret+='</gmd:CI_Date>';
                ret+='</gmd:date>';
            }
            return ret;
        },
        asEscidocXML: function(){
            var result="";
            if (this.get('date').length>0) 
                    result+='<dc:date xmlns:dc="http://purl.org/dc/elements/1.1/">'+this.get('date')+'</dc:date>';			
            return result;
        }        
});


