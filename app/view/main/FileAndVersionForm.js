/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
var urlparameter=Ext.Object.fromQueryString(location.search.substring(1));
var disabled = (urlparameter.editable == 'False');
var dataset = urlparameter.dataset;
var curator_id = urlparameter.curator_id;
var submitText = curator_id == "" ? "Submit" : "Send to Submitter";

Ext.define('PMDMeta.view.main.FileAndVersionForm', {
    extend: 'Ext.container.Container',
    requires: [
	'PMDMeta.view.fileupload.FileUpload',
	'PMDMeta.view.main.ItemVersions',
        'PMDMeta.view.main.FileDownloader',
        'Ext.window.MessageBox',
        'PMDMeta.view.main.DOIregistration',
	'PMDMeta.store.publish.ValidationResult',
	'PMDMeta.view.main.ValidationWindow'
    ],

    xtype: 'FileAndVersion-Form',
    
    layout:  'fit',
     initComponent: function() {
        var me=this;
        new PMDMeta.store.publish.ValidationResult();
        Ext.apply(me, {
             items: [
		{	
			xtype: 'form',
//			title: 'Files & Versions',
//			width: 270,
                        defaults:{margin: '0 0 10 0'},
                        layout:{type: 'vbox'/*, align: 'stretch'*/},
                        bodyPadding: 10,			
                        items:[
                                {
                                    xtype: 'PMD-FileUpload'
                                    ,hidden:true
                                },{
                                    xtype: 'ItemVersions'
                                    ,hidden:true
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'DOI',
				    id:   'doibutton',
//hidden:true,
                                    tooltip: 'register a DOI or update metadata',
                                    handler: function() {
                                        if (!me.doiregistration)
                                            me.doiregistration=new PMDMeta.view.main.DOIregistration();
                                        me.doiregistration.setup();
                                        me.doiregistration.show();
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',
				    id:   'previewbutton',
//hidden: true,
                                    text: 'Preview',
                                    tooltip: 'preview Dataset in new Window',
                                    handler: function() {
                                        
                                        var item=Ext.getStore('Item').getAt(0);
                                        if (!item) return;
                                        var itemhref=item.get("href");
                                        if (!itemhref) return;
                                        var itemid=itemhref.substr(itemhref.lastIndexOf("/")+1,itemhref.length-1);
                                        if (!itemid) return;
                                        
                                        var href=window.location.href;
                                        var url;
                                        if (href.indexOf("?")>0)
                                            url=href.substr(0,href.indexOf("?"));
                                        else
                                            url=href;                                        
                                        var root=url.substr(0,url.lastIndexOf("/"));
                                        if (root.length===url.length-1) //trailing slash
                                            root=root.substr(0,root.lastIndexOf("/"))

                                        window.open(root+"/preview.php?id="+itemid,"_blank");
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'Clear',
                                    tooltip: 'Load default metadata',
                                    disabled: disabled,
                                    handler: function() {
                                        Ext.getStore('Item').loaddata();                                                    
                                    }
                                },{
                                    xtype: 'fileuploadfield',
                                    name: 'metaupload',
                                    tooltip: 'Load default metadata',
                                    buttonOnly: true,
                                    hideLabel:true,
                                    msgTarget: 'under',
                                    buttonConfig: {
                                         disabled: disabled,
                                         scale: 'large'
                                    },                                           
                                    buttonText: 'Load',

                                    listeners:{
                                        change: function( elem, value, eOpts ) {
                                            var form = elem.up('form').getForm();
                                            if(form.isValid()){
                                                form.submit({
                                                    url: 'resources/upload/metaupload.php',
                                                    waitMsg: 'Uploading..',
                                                    success: function(fp, o) {

                                                        if (!o.result.success){                                                               
                                                            Ext.Msg.alert('Failure', 'Error uploading file.' + o.result.error);
                                                            return;
                                                        }
                                                        Ext.Ajax.request({
                                                            url: 'resources/upload/metaupload.php',							
                                                            success: function(response, opts) {
                                                                if (response.responseText.length==0)
                                                                    return;

                                                                var itemstore=Ext.getStore('Item');
                                                                itemstore.unmarshal(response);
                                                                itemstore.changefunc();

                                                           },
                                                           failure: function(response, opts) {
                                                              console.log('server-side failure with status code ' + response.status);
                                                           }            
                                                        });                                                                
                                                    },
                                                    failure:function(fp, o) {
                                                        Ext.Msg.alert('Failure', 'Error uploading file.');
                                                    }
                                                });
                                            }
                                        }		
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'Save As',
                                    tooltip: 'Save metadata to local hard disk',
                                    handler: function() {	  
                                        var xml=Ext.getStore('Item').marshal();
                                        Ext.Ajax.request({
                                            url: 'resources/upload/metastore.php',	
                                            method: 'POST',
                                            params:{
                                                storedata: xml
                                            },                                                        
                                            success: function(response, opts) {
                                                var title=Ext.getStore('DataCiteTitle').getAt(0).get('title');
                                                var dt=new Date();
                                                dt.setTime(Date.now());
                                                var filename=title+"_"+Ext.Date.format(dt,'YmdHi')+'.xml';

                                                var minPromptWidth=Ext.Msg.minPromptWidth;
                                                Ext.Msg.minPromptWidth=600;
                                                Ext.Msg.prompt('Save as', 'Filename:', function(btn, text){
                                                    if (btn === 'ok'){                                        
                                                        window.location.href='resources/upload/metastore.php?file='+Ext.String.htmlEncode(text);                                        
                                                    }
                                                }, null , false, filename);
                                                Ext.Msg.minPromptWidth=minPromptWidth;
                                           },
                                           failure: function(response, opts) {
                                              console.log('server-side failure with status code ' + response.status);
                                           }            
                                        });   
                                    }
                                    },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'Save',
                                    tooltip: 'Save metadata changes',
                                    disabled: disabled,
                                    handler: function() {    
                                        var xml=Ext.getStore('Item').marshal();
                                        var item=Ext.getStore('Item').getAt(0);
                                        if (!item) return;
                                        var save_file=item.get("href");

                                        Ext.Ajax.request({
                                            url: 'resources/upload/write_to_file.php',  
                                            method: 'POST',
                                            params:{
                                                storedata: xml,
                                                file: save_file
                                            }, 
                                            success: function(response, opts) {
                                                    Ext.Msg.show({
                                                        title: 'Save Metadata',
                                                        msg: 'Metadata successfully saved.',
                                                        icon: Ext.Msg.INFO,
                                                        buttons: Ext.Msg.OK
                                                    });
                                            },                                                       
                                            failure: function(response, opts) {

                                                Ext.Msg.show({
                                                    title: 'Save Error',
                                                    msg: 'Failed to save metadata. Please use the Save As option to save the XML file and send it to hub@iedadata.org',
                                                    icon: Ext.Msg.ERROR,
                                                    buttons: Ext.Msg.OK
                                                });
                                                console.log('server-side failure with status code ' + response.status);
                                            }            
                                        });   
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'Sync',
				                    id:   'syncbutton',
                                    //hidden: true,
                                    tooltip: 'Sync data to eSciDoc repository',
                                    handler: function() {	  
                                            Ext.getStore('Item').synccontent();
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: submitText,
                                    disabled: disabled,
                                    handler: function() {
                                        var xml=Ext.getStore('Item').marshal();	  
                                        var item=Ext.getStore('Item').getAt(0);
                                        if (!item) return;
                                        var meta_file=item.get("href");
                                        Ext.Ajax.request({
                                            url: 'resources/upload/submit.php',	
                                            method: 'POST',
                                            params:{
                                                storedata: xml,
                                                file: meta_file, 
                                                curator_id: curator_id
                                            },                                                        
                                            success: function(response, opts) {
                                                Ext.Msg.show({
                                                    title: 'Submit',
                                                    msg: 'Metadata successfully submitted.',
                                                    icon: Ext.Msg.INFO,
                                                    buttons: Ext.Msg.OK,
                                                    fn: function(btn, text){
                                                    if (btn === 'ok'){                                        
                                                        window.location.href='?object='+meta_file+'&editable=False'+'&curator_id='+curator_id+'&dataset='+dataset;                                  
                                                    }
                                                }
                                                });    
                                            },
                                            failure: function(response, opts) {
                                                Ext.Msg.show({
                                                        title: 'Submit',
                                                        msg: 'Metadata submission unsuccessful. Please email hub@iedadata.org',
                                                        icon: Ext.Msg.INFO,
                                                        buttons: Ext.Msg.OK
                                                    });
                                              console.log('server-side failure with status code ' + response.status);
                                            }            
                                        });                                                                
//                                                    Ext.getStore('Item').synccontent();
                                    }
                                },{
					xtype: 'button',
					scale: 'large',
					text: 'Form Errors',
					handler: function(){
						if (!me.validationwindow)
							me.validationwindow=Ext.create("PMDMeta.view.main.ValidationWindow");
						me.validationwindow.show();
					}
				}
                        ]
                }			
            ]              
               
           });   
        this.callParent();
         
     }

});
