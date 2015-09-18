/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.PMDDates', {
    extend: 'Ext.panel.Panel',
    requires: [
	'PMDMeta.model.datacite.Date',
        'PMDMeta.store.datacite.Date',
        'PMDMeta.view.main.ValidatingTextbox'
    ],
    xtype: 'DataCite-PMDDates',
    title: 'Dates',
    frame: true,
    layout:{
        type: 'table',
        columns: 3
    },
    bodyPadding:5,
    initComponent: function() {

        var me=this;
        me.store=Ext.getStore('DataCiteDate');    
        var titlebar=new Ext.Component({        
            height:50, 
            margin: '0 0 0 0',            
            hidden:true
        });         
        
        var me=this; 
        
        var datemodel=new Ext.data.Model();
        datemodel.set('type','DATE');        
        var timemodel=new Ext.data.Model();
        timemodel.set('type','TIME');        
        var tid=titlebar.getItemId();
        
        
        Ext.apply(this, {
            height: 240,
            defaults:{margin:'5 0 0 5'},
            items:[
                {xtype:'label'},
                {xtype:'label'/*,text:'Date from'*/},
     //           {xtype:'label',text:'Time from'},
                {xtype:'label',text:'Date to'},
     //           {xtype:'label',text:'Time to'},
                
   /*             {xtype:'label',text:'Created'},
                {xtype:'validatingtextbox',emptyText:'YYYY-MM-DD',PMDmodel: datemodel,PMDfield:'type',msgTarget: tid,
                    qtip:'The date the resource itself was put together; this could be a single date for a final component, e.g., the finalised file with all of the data. (Recommended for discovery.)',
                    listeners:{
                        change: function(elem, newValue, oldValue, eOpts){
                            var dateType='Created';
                            var store=Ext.getStore('DataCiteDate');
                            var model=false;
                            store.each(function(data){
                                if (!model && data.get("dateType")==dateType)
                                    model=data;
                            });
                            if (model){
                                model.set('dateFrom',newValue);
                            }else{
                                store.insert(0,{dateType:dateType,dateFrom:newValue});
                            }                            
                        },
                        beforerender: function(elem,eOpts){
                            var dateType='Created';
                            var store=Ext.getStore('DataCiteDate');
                            var func=function(){                             
                                var model=false;
                                store.each(function(data){
                                    if (!model && data.get("dateType")==dateType)
                                        model=data;
                                });
                                if (model){
                                    elem.suspendEvents(false);
                                    elem.setValue(model.get("dateFrom"));
                                    elem.resumeEvents(true);
                                }else{
                                    elem.suspendEvents(false);
                                    elem.setValue("");
                                    elem.resumeEvents(true);                                    
                                }
                            }                       
                            store.on('load',func);
                           // store.on('datachanged',func);  
                            store.on('clear', func);
                        },
                        render: function(c) {
                            Ext.tip.QuickTipManager.register({target:c.getEl(), text:c.qtip});
                        }                        
                    }                   
                },
                {xtype:'label'},*/
   //             {xtype:'label'},
   //             {xtype:'label'},
                
                {xtype:'label',text:'Embargo until'},
    //            {xtype:'label'},
                {xtype:'label'},
                {xtype:'validatingtextbox',emptyText:'YYYY-MM-DD',PMDmodel: datemodel,PMDfield:'type',msgTarget: tid,
                    qtip:'The date the resource is made publicly available. Use this field to indicate the end of an embargo period.',                      
                    listeners:{
                        change: function(elem, newValue, oldValue, eOpts){
                            var dateType='Available';
                            var store=Ext.getStore('DataCiteDate');
                            var model=false;
                            store.each(function(data){
                                if (!model && data.get("dateType")==dateType)
                                    model=data;
                            });
                            if (model){
                                model.set('dateFrom',newValue);
                            }else{
                                store.insert(0,{dateType:dateType,dateTo:newValue});
                            }                            
                        },
                        beforerender: function(elem,eOpts){
                            var dateType='Available';
                            var store=Ext.getStore('DataCiteDate');
                            var func=function(){
                                var model=false;
                                store.each(function(data){
                                    if (!model && data.get("dateType")==dateType)
                                        model=data;
                                });
                                if (model){
                                    elem.suspendEvents(false);
                                    elem.setValue(model.get("dateFrom"));
                                    elem.resumeEvents();
                                }else{
                                    elem.suspendEvents(false);
                                    elem.setValue("");
                                    elem.resumeEvents();                                    
                                }
                            }
                            store.on('load',func);
                           // store.on('datachanged',func);  
                            store.on('clear', func);
                        },
                        render: function(c) {
                            Ext.tip.QuickTipManager.register({target:c.getEl(), text:c.qtip});
                        }
                    }
                }/*,
      //          {xtype:'label'},        
                
                {xtype:'label',text:'Valid'},
                {xtype:'validatingtextbox',emptyText:'YYYY-MM-DD',PMDmodel: datemodel,PMDfield:'type',msgTarget: tid,
                    qtip:'The date or date range during which the dataset or resource  is accurate.',                      
                    listeners:{
                        change: function(elem, newValue, oldValue, eOpts){
                            var dateType='Valid';
                            var store=Ext.getStore('DataCiteDate');
                            var model=false;
                            store.each(function(data){
                                if (!model && data.get("dateType")==dateType)
                                    model=data;
                            });
                            if (model){
                                model.set('dateFrom',newValue);
                            }else{
                                store.insert(0,{dateType:dateType,dateFrom:newValue});
                            }                            
                        },
                        beforerender: function(elem,eOpts){
                            var dateType='Valid';
                            var store=Ext.getStore('DataCiteDate');
                            var func=function(){
                                var model=false;
                                store.each(function(data){
                                    if (!model && data.get("dateType")==dateType)
                                        model=data;
                                });
                                if (model){
                                    elem.suspendEvents(false);
                                    elem.setValue(model.get("dateFrom"));
                                    elem.resumeEvents();
                                }else{
                                    elem.suspendEvents(false);
                                    elem.setValue("");
                                    elem.resumeEvents();                                    
                                }
                            }
                            store.on('load',func);
                           // store.on('datachanged',func);  
                            store.on('clear', func);
                        },
                        render: function(c) {
                            Ext.tip.QuickTipManager.register({target:c.getEl(), text:c.qtip});
                        }
                    }
                },
             //   {xtype:'label'},
                {xtype:'validatingtextbox',emptyText:'YYYY-MM-DD',PMDmodel: datemodel,PMDfield:'type',msgTarget: tid,
                    qtip:'The date or date range during which the dataset or resource  is accurate.',                      
                    listeners:{
                        change: function(elem, newValue, oldValue, eOpts){
                            var dateType='Valid';
                            var store=Ext.getStore('DataCiteDate');
                            var model=false;
                            store.each(function(data){
                                if (!model && data.get("dateType")==dateType)
                                    model=data;
                            });
                            if (model){
                                model.set('dateTo',newValue);
                            }else{
                                store.insert(0,{dateType:dateType,dateTo:newValue});
                            }                            
                        },
                        beforerender: function(elem,eOpts){
                            var dateType='Valid';
                            var store=Ext.getStore('DataCiteDate');
                            var func=function(){
                                var model=false;
                                store.each(function(data){
                                    if (!model && data.get("dateType")==dateType)
                                        model=data;
                                });
                                if (model){
                                    elem.suspendEvents(false);
                                    elem.setValue(model.get("dateTo"));
                                    elem.resumeEvents();
                                }else{
                                    elem.suspendEvents(false);
                                    elem.setValue("");
                                    elem.resumeEvents();                                    
                                }
                            }
                            store.on('load',func);
                           // store.on('datachanged',func);  
                            store.on('clear', func);
                        },
                        render: function(c) {
                            Ext.tip.QuickTipManager.register({target:c.getEl(), text:c.qtip});
                        }
                    }
                }*///,
          //      {xtype:'label'}
                /* ,
               
                {xtype:'label',text:'Temporal Coverage'},
                {xtype:'validatingtextbox',emptyText:'YYYY-MM-DD',PMDmodel: datemodel,PMDfield:'type',msgTarget: tid,
                    qtip:'temporal coverage of time series: starting date, starting time, end date, end time as appropriate',                     
                    listeners:{
                        change: function(elem, newValue, oldValue, eOpts){
                            var dateType='Collected';
                            var store=Ext.getStore('DataCiteDate');
                            var model=false;
                            store.each(function(data){
                                if (!model && data.get("dateType")==dateType)
                                    model=data;
                            });
                            if (model){
                                model.set('dateFrom',newValue);
                            }else{
                                store.insert(0,{dateType:dateType,dateFrom:newValue});
                            }                            
                        },
                        beforerender: function(elem,eOpts){
                            var dateType='Collected';
                            var store=Ext.getStore('DataCiteDate');
                            var func=function(){
                                var model=false;
                                store.each(function(data){
                                    if (!model && data.get("dateType")==dateType)
                                        model=data;
                                });
                                if (model){
                                    elem.suspendEvents(false);
                                    elem.setValue(model.get("dateFrom"));
                                    elem.resumeEvents();
                                }else{
                                    elem.suspendEvents(false);
                                    elem.setValue("");
                                    elem.resumeEvents();                                    
                                }
                            }
                            store.on('load',func);
                           // store.on('datachanged',func);  
                            store.on('clear', func);
                            
                        },
                        render: function(c) {
                            Ext.tip.QuickTipManager.register({target:c.getEl(), text:c.qtip});
                        } 
                    }
                },
                {xtype:'validatingtextbox',emptyText:'HH:MM:SS',PMDmodel: timemodel,PMDfield:'type',msgTarget: tid,
                    qtip:'temporal coverage of time series: starting date, starting time, end date, end time as appropriate', 
                    listeners:{
                        change: function(elem, newValue, oldValue, eOpts){
                            var dateType='Collected';
                            var store=Ext.getStore('DataCiteDate');
                            var model=false;
                            store.each(function(data){
                                if (!model && data.get("dateType")==dateType)
                                    model=data;
                            });
                            if (model){
                                model.set('timeFrom',newValue);
                            }else{
                                store.insert(0,{dateType:dateType,timeFrom:newValue});
                            }                            
                        },
                        beforerender: function(elem,eOpts){
                            var dateType='Collected';
                            var store=Ext.getStore('DataCiteDate');
                            var func=function(){
                                var model=false;
                                store.each(function(data){
                                    if (!model && data.get("dateType")==dateType)
                                        model=data;
                                });
                                if (model){
                                    elem.suspendEvents(false);
                                    elem.setValue(model.get("timeFrom"));
                                    elem.resumeEvents();                                    
                                }else{
                                    elem.suspendEvents(false);
                                    elem.setValue("");
                                    elem.resumeEvents();                                    
                                }
                            }
                            store.on('load',func);
                           // store.on('datachanged',func);  
                            store.on('clear', func);
                        },
                        render: function(c) {
                            Ext.tip.QuickTipManager.register({target:c.getEl(), text:c.qtip});
                        } 
                    }
                },
                {xtype:'validatingtextbox',emptyText:'YYYY-MM-DD',PMDmodel: datemodel,PMDfield:'type',msgTarget: tid,
                    qtip:'temporal coverage of time series: starting date, starting time, end date, end time as appropriate',                     
                    listeners:{
                        change: function(elem, newValue, oldValue, eOpts){
                            var dateType='Collected';
                            var store=Ext.getStore('DataCiteDate');
                            var model=false;
                            store.each(function(data){
                                if (!model && data.get("dateType")==dateType)
                                    model=data;
                            });
                            if (model){
                                model.set('dateTo',newValue);
                            }else{
                                store.insert(0,{dateType:dateType,dateTo:newValue});
                            }                            
                        },
                        beforerender: function(elem,eOpts){
                            var dateType='Collected';
                            var store=Ext.getStore('DataCiteDate');
                            var func=function(){
                                var model=false;
                                store.each(function(data){
                                    if (!model && data.get("dateType")==dateType)
                                        model=data;
                                });
                                if (model){
                                   elem.suspendEvents(false);
                                   elem.setValue(model.get("dateTo"));
                                   elem.resumeEvents();                                    
                                }else{
                                    elem.suspendEvents(false);
                                    elem.setValue("");
                                    elem.resumeEvents();                                    
                                }
                            }
                            store.on('load',func);
                           // store.on('datachanged',func);  
                            store.on('clear', func);
                        },
                        render: function(c) {
                            Ext.tip.QuickTipManager.register({target:c.getEl(), text:c.qtip});
                        }
                    }
                },
                {xtype:'validatingtextbox',emptyText:'HH:MM:SS',PMDmodel: timemodel,PMDfield:'type',msgTarget: tid,
                    qtip:'temporal coverage of time series: starting date, starting time, end date, end time as appropriate',                    
                    listeners:{
                        change: function(elem, newValue, oldValue, eOpts){
                            var dateType='Collected';
                            var store=Ext.getStore('DataCiteDate');
                            var model=false;
                            store.each(function(data){
                                if (!model && data.get("dateType")==dateType)
                                    model=data;
                            });
                            if (model){
                                model.set('timeTo',newValue);
                            }else{
                                store.insert(0,{dateType:dateType,timeTo:newValue});
                            }                            
                        },
                        beforerender: function(elem,eOpts){
                            var dateType='Collected';
                            var store=Ext.getStore('DataCiteDate');
                            var func=function(){
                                var model=false;
                                store.each(function(data){
                                    if (!model && data.get("dateType")==dateType)
                                        model=data;
                                });
                                if (model){
                                    elem.suspendEvents(false);                                    
                                    elem.setValue(model.get("timeTo"));
                                    elem.resumeEvents();                                    
                                }else{
                                    elem.suspendEvents(false);
                                    elem.setValue("");
                                    elem.resumeEvents();                                    
                                }
                            }
                            store.on('load',func);
                           // store.on('datachanged',func);  
                            store.on('clear', func);
                        },
                        render: function(c) {
                            Ext.tip.QuickTipManager.register({target:c.getEl(), text:c.qtip});
                        } 
                    }
                }
*/            ],            
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                padding: '0 0 0 5',
                items: [titlebar]
            }]
        });

        this.callParent();
    }

});
