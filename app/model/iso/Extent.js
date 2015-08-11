Ext.define('PMDMeta.model.iso.Extent', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'latmin', type: 'string',mapping :function(data) {
                var interest='gmd|southBoundLatitude';                
		var geoelement=Ext.DomQuery.selectNode('gmd|geographicElement',data);               
                if (geoelement){
        		var value=Ext.DomQuery.selectNode(interest,geoelement);
                        var ret=Ext.DomQuery.selectValue('gco|Decimal',value);
                        return ret;
                }
                return "";
	}},
        {name: 'latmax', type: 'string', mapping: function(data) {
                var interest='gmd|northBoundLatitude';                
		var geoelement=Ext.DomQuery.selectNode('gmd|geographicElement',data);
                if (geoelement){
        		var value=Ext.DomQuery.selectNode(interest,geoelement);
                        if (value)
                            return Ext.DomQuery.selectValue('gco|Decimal',value);
                }
                return "";
	}},
        {name: 'lonmin', type: 'string', mapping:function(data) {
                var interest='gmd|westBoundLongitude';                
		var geoelement=Ext.DomQuery.selectNode('gmd|geographicElement',data);
                if (geoelement){
        		var value=Ext.DomQuery.selectNode(interest,geoelement);
                        if (value)
                            return Ext.DomQuery.selectValue('gco|Decimal',value);
                }
                return "";
	}},
        {name: 'lonmax', type: 'string', mapping:function(data) {
                var interest='gmd|eastBoundLongitude';                
		var geoelement=Ext.DomQuery.selectNode('gmd|geographicElement',data);
                if (geoelement){
        		var value=Ext.DomQuery.selectNode(interest,geoelement);
                        if (value)
                            return Ext.DomQuery.selectValue('gco|Decimal',value);
                }
                return "";
	}},
        {name: 'description', type: 'string', mapping: function(data){
                    var name=Ext.DomQuery.selectNode('gmd|description',data);
                    if (name){
                        var ret=Ext.DomQuery.selectValue('gco|CharacterString',name);
                        return Ext.String.htmlDecode(ret);
                    }
                    return "";
            }
        }, 
        {name: 'dateFrom', type: 'string', mapping: function(data){
               var te=Ext.DomQuery.selectNode('gmd|temporalElement',data);
                if (te){
                    var tp=Ext.DomQuery.selectNode('gml|TimePeriod',te);
                    if (tp){
                        var endstring=Ext.DomQuery.selectValue('gml|beginPosition',tp);
                        if (endstring){                            
                            var date=""; 
                            var time="";
                            var zone="";
                            var datetime=endstring.split("T");
                            if (datetime.length>0){
                                date=datetime[0];
                            }
                            if (datetime.length>1){
                                var timeandzone="";

                                if (datetime[1].indexOf("+")>=0){
                                    timeandzone=datetime[1].split("+");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="+"+timeandzone[1];                                    
                                    }                       
                                }else if (datetime[1].indexOf("-")>=0){
                                    timeandzone=datetime[1].split("-");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="-"+timeandzone[1];                                    
                                    }                       

                                }else{
                                    time=datetime[1];//no timezone
                                }
                            }
                                                      
                            return date;
                        }
                    }else{
                        var ti=Ext.DomQuery.selectNode('gml|TimeInstant',te);                        
                        if (ti){
                            var endstring=Ext.DomQuery.selectValue('gml|timePosition',ti);
                            if (endstring){
                            var date=""; 
                            var time="";
                            var zone="";
                            var datetime=endstring.split("T");
                            if (datetime.length>0){
                                date=datetime[0];
                            }
                            if (datetime.length>1){
                                var timeandzone="";

                                if (datetime[1].indexOf("+")>=0){
                                    timeandzone=datetime[1].split("+");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="+"+timeandzone[1];                                    
                                    }                       
                                }else if (datetime[1].indexOf("-")>=0){
                                    timeandzone=datetime[1].split("-");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="-"+timeandzone[1];                                    
                                    }                       

                                }else{
                                    time=datetime[1];//no timezone
                                }
                            }
                            return date;
                            }
                        }
                        
                    }
                }
                return "";
            }
        },
        {name: 'dateTo', type: 'string', mapping: function(data){
               var te=Ext.DomQuery.selectNode('gmd|temporalElement',data);
                if (te){
                    var tp=Ext.DomQuery.selectNode('gml|TimePeriod',te);
                    if (tp){
                        var endstring=Ext.DomQuery.selectValue('gml|endPosition',tp);
                        if (endstring){
                            var date=""; 
                            var time="";
                            var zone="";
                            var datetime=endstring.split("T");
                            if (datetime.length>0){
                                date=datetime[0];
                            }
                            if (datetime.length>1){
                                var timeandzone="";

                                if (datetime[1].indexOf("+")>=0){
                                    timeandzone=datetime[1].split("+");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="+"+timeandzone[1];                                    
                                    }                       
                                }else if (datetime[1].indexOf("-")>=0){
                                    timeandzone=datetime[1].split("-");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="-"+timeandzone[1];                                    
                                    }                       

                                }else{
                                    time=datetime[1];//no timezone
                                }
                            }
                            return date;
                        }
                    }
                }
                return "";
            }
        }, 
        {name: 'timeFrom', type: 'string', mapping: function(data){
                var te=Ext.DomQuery.selectNode('gmd|temporalElement',data);
                if (te){
                    var tp=Ext.DomQuery.selectNode('gml|TimePeriod',te);
                    if (tp){
                        var endstring=Ext.DomQuery.selectValue('gml|beginPosition',tp);
                        if (endstring && endstring.indexOf('T')>=0){
                            var date=""; 
                            var time="";
                            var zone="";
                            var datetime=endstring.split("T");
                            if (datetime.length>0){
                                date=datetime[0];
                            }
                            if (datetime.length>1){
                                var timeandzone="";

                                if (datetime[1].indexOf("+")>=0){
                                    timeandzone=datetime[1].split("+");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="+"+timeandzone[1];                                    
                                    }                       
                                }else if (datetime[1].indexOf("-")>=0){
                                    timeandzone=datetime[1].split("-");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="-"+timeandzone[1];                                    
                                    }                       

                                }else{
                                    time=datetime[1];//no timezone
                                }
                            }
                            return time;
                        }
                    }else{
                        var ti=Ext.DomQuery.selectNode('gml|TimeInstant',te);                        
                        if (ti){
                            var endstring=Ext.DomQuery.selectValue('gml|timePosition',ti);
                            if (endstring && endstring.indexOf('T')>=0){ //is there a time definition
                                var date=""; 
                                var time="";
                                var zone="";
                                var datetime=endstring.split("T");
                                if (datetime.length>0){
                                    date=datetime[0];
                                }
                                if (datetime.length>1){
                                    var timeandzone="";

                                    if (datetime[1].indexOf("+")>=0){
                                        timeandzone=datetime[1].split("+");
                                        if (timeandzone.length>0){
                                            time=timeandzone[0];                                                                       
                                        }
                                        if (timeandzone.length>1){
                                            zone="+"+timeandzone[1];                                    
                                        }                       
                                    }else if (datetime[1].indexOf("-")>=0){
                                        timeandzone=datetime[1].split("-");
                                        if (timeandzone.length>0){
                                            time=timeandzone[0];                                                                       
                                        }
                                        if (timeandzone.length>1){
                                            zone="-"+timeandzone[1];                                    
                                        }                       

                                    }else{
                                        time=datetime[1];//no timezone
                                    }
                                }
                                return time;
                            }
                        }
                        
                    }
                }
                return "";
            }
        },
        {name: 'timeTo', type: 'string', mapping: function(data){
                var te=Ext.DomQuery.selectNode('gmd|temporalElement',data);
                if (te){
                    var tp=Ext.DomQuery.selectNode('gml|TimePeriod',te);
                    if (tp){
                        var endstring=Ext.DomQuery.selectValue('gml|endPosition',tp);
                        if (endstring && endstring.indexOf('T')>=0){//is there a time definition
                            var date=""; 
                            var time="";
                            var zone="";
                            var datetime=endstring.split("T");
                            if (datetime.length>0){
                                date=datetime[0];
                            }
                            if (datetime.length>1){
                                var timeandzone="";

                                if (datetime[1].indexOf("+")>=0){
                                    timeandzone=datetime[1].split("+");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="+"+timeandzone[1];                                    
                                    }                       
                                }else if (datetime[1].indexOf("-")>=0){
                                    timeandzone=datetime[1].split("-");
                                    if (timeandzone.length>0){
                                        time=timeandzone[0];                                                                       
                                    }
                                    if (timeandzone.length>1){
                                        zone="-"+timeandzone[1];                                    
                                    }                       

                                }else{
                                    time=datetime[1];//no timezone
                                }
                            }
                            return time;
                        }
                    }
                }
                return "";
            }
        },{name: 'zone', type: 'string', mapping: function(data){
                var te=Ext.DomQuery.selectNode('gmd|temporalElement',data);
                if (te){
                    var ep=Ext.DomQuery.selectValue('gml|endPosition',te);
                    var bp=Ext.DomQuery.selectValue('gml|beginPosition',te);                    
                    var tp=Ext.DomQuery.selectValue('gml|timePosition',te);                    

                    var endstring;
                    
                    if (bp && bp.length>0)
                        endstring=bp;
                    else if (ep && ep.length>0)
                        endstring=ep;
                    else if (tp && tp.length>0)
                        endstring=tp;
                    else
                        return "";

                    var date=""; 
                    var time="";
                    var zone="";
                    var datetime=endstring.split("T");
                    if (datetime.length>0){
                        date=datetime[0];
                    }
                    if (datetime.length>1){
                        var timeandzone="";

                        if (datetime[1].indexOf("+")>=0){
                            timeandzone=datetime[1].split("+");
                            if (timeandzone.length>0){
                                time=timeandzone[0];                                                                       
                            }
                            if (timeandzone.length>1){
                                zone="+"+timeandzone[1];                                    
                            }                       
                        }else if (datetime[1].indexOf("-")>=0){
                            timeandzone=datetime[1].split("-");
                            if (timeandzone.length>0){
                                time=timeandzone[0];                                                                       
                            }
                            if (timeandzone.length>1){
                                zone="-"+timeandzone[1];                                    
                            }                       

                        }else{
                            time=datetime[1];//no timezone
                        }
                    }
                    return zone;
                    
                }
                return "";
            }
            
        }
    ],	
    asXML: function(){
        var ret="";            
        ret+=this.descriptionXML();
        ret+=this.geographicXML();
        ret+=this.temporalXML();
        return ret;
    },
    descriptionXML: function(){
        var ret="";
        if (this.get('description')){
            ret+='<gmd:description>';
            ret+='<gco:CharacterString>'+Ext.String.htmlEncode(this.get('description'))+'</gco:CharacterString>';
            ret+='</gmd:description>';
        } 
        return ret;
    },        
    geographicXML: function(){        
        var ret="";                           

        if (this.get('lonmin').length && this.get('latmin').length){
            ret+='<gmd:geographicElement>';
            ret+='<gmd:EX_GeographicBoundingBox>';
            ret+='<gmd:westBoundLongitude>';
            ret+='<gco:Decimal>';
            ret+=this.get('lonmin');
            ret+='</gco:Decimal>';
            ret+='</gmd:westBoundLongitude>';
            ret+='<gmd:eastBoundLongitude>';
            ret+='<gco:Decimal>';            
            if (this.get('lonmax').length>0)        
                ret+=this.get('lonmax');
            else
                ret+=this.get('lonmin');                
            ret+='</gco:Decimal>';
            ret+='</gmd:eastBoundLongitude>';
            ret+='<gmd:southBoundLatitude>';
            ret+='<gco:Decimal>';
            ret+=this.get('latmin');
            ret+='</gco:Decimal>';
            ret+='</gmd:southBoundLatitude>';
            ret+='<gmd:northBoundLatitude>';
            ret+='<gco:Decimal>';
            if (this.get('latmax').length>0)
                ret+=this.get('latmax');
            else
                ret+=this.get('latmin');                
            ret+='</gco:Decimal>';
            ret+='</gmd:northBoundLatitude>';
            ret+='</gmd:EX_GeographicBoundingBox>';
            ret+='</gmd:geographicElement>';
        }
        return ret;
    },

    temporalXML: function (){
        var ret="";

        var from=this.get("dateFrom");
        var to=this.get("dateTo");
        if (from.length>0 && this.get("timeFrom").length>0)
            from+="T"+this.get("timeFrom")+this.get('zone');            
        if (to.length>0 && this.get("timeTo").length>0)
            to+="T"+this.get("timeTo")+this.get('zone');

        if (from.length>0  || to.length>0){
            ret+="<gmd:temporalElement>";
            ret+="<gmd:EX_TemporalExtent>";
            ret+="<gmd:extent>";                
            if (from != to){
                ret+='<gml:TimePeriod gml:id="t3'+Date.now()+'">';
                ret+="<gml:beginPosition>"+from+"</gml:beginPosition>";
                if (to.length>0){
                    ret+="<gml:endPosition>"+to+"</gml:endPosition>";
                }else{
                    ret+='<gml:endPosition indeterminatePosition="now"/>'
                }
                ret+="</gml:TimePeriod>";
            }else if (from == to){
                ret+='<gml:TimeInstant gml:id="t4'+Date.now()+'">';
                ret+='<gml:timePosition>'+from+'</gml:timePosition>';
                ret+='</gml:TimeInstant>'
            }
            ret+="</gmd:extent>";
            ret+="</gmd:EX_TemporalExtent>";
            ret+="</gmd:temporalElement>";    
        }
        return ret;

    },
    asDataCiteXML: function(){
            var type="";
            var dateTo="";
            var result="";

            var type=' dateType="Collected"';

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
    asDifXML: function(){
        var ret="";                           

        if (this.get('lonmin').length && this.get('latmin').length){
            
            ret+='<dif:Southernmost_Latitude>';
            ret+=this.get('latmin');
            ret+='</dif:Southernmost_Latitude>';
            
            ret+='<dif:Northernmost_Latitude>';
            if (this.get('latmax').length>0)
                ret+=this.get('latmax');
            else
                ret+=this.get('latmin');                
            ret+='</dif:Northernmost_Latitude>';            

            ret+='<dif:Westernmost_Longitude>';
            ret+=this.get('lonmin');
            ret+='</dif:Westernmost_Longitude>';            

            ret+='<dif:Easternmost_Longitude>';           
            if (this.get('lonmax').length>0)        
                ret+=this.get('lonmax');
            else
                ret+=this.get('lonmin');                
            ret+='</dif:Easternmost_Longitude>';            
            
        }
        return ret;  
        
        
    }


});
