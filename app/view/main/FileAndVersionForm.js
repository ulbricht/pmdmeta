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
var editor_metafile = urlparameter.editor_metafile;
var curator = urlparameter.curator;
var xml_file = urlparameter.object;
var extra = urlparameter.extra;
var submitText = curator == "False" ? "Submit" : "Send to Submitter";


Ext.define('PMDMeta.view.main.FileAndVersionForm', {
    extend: 'Ext.container.Container',
    requires: [
	'PMDMeta.view.fileupload.FileUpload',
	'PMDMeta.view.main.ItemVersions',
    'Ext.window.MessageBox',
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
                                    id:   'loadbutton',

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
                                        if (!xml_file) {
                                            Ext.Msg.show({
                                                title: 'Save Error',
                                                msg: 'Failed to save metadata. Please use the Save As option to save the XML file and send it to hub@iedadata.org',
                                                icon: Ext.Msg.ERROR,
                                                buttons: Ext.Msg.OK
                                            });
                                            return;
                                        }
                                        Ext.Ajax.request({
                                            url: 'resources/upload/write_to_file.php',  
                                            method: 'POST',
                                            params:{
                                                storedata: xml,
                                                file: xml_file,
                                                editor_metafile: editor_metafile
                                            }, 
                                            success: function(response, opts) {
                                                var responseData = Ext.decode(response.responseText);
                                                if (!responseData.success) {
                                                    Ext.Msg.show({
                                                        title: 'Save Error',
                                                        msg: 'Failed to save metadata. Please use the Save As option to save the XML file and send it to hub@iedadata.org',
                                                        icon: Ext.Msg.ERROR,
                                                        buttons: Ext.Msg.OK
                                                    });
                                                    return;
                                                }

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
                                    text: submitText,
                                    tooltip: 'Submit the metadata form',
                                    disabled: disabled,
                                    handler: function() {
                                        var xml=Ext.getStore('Item').marshal();	  
                                        if (!xml_file) {
                                            Ext.Msg.show({
                                                title: 'Submit Error',
                                                msg: 'Failed to submit metadata. Please use the Save As option to save the XML file and send it to hub@iedadata.org',
                                                icon: Ext.Msg.ERROR,
                                                buttons: Ext.Msg.OK
                                            });
                                            return;
                                        }
                                        Ext.Ajax.request({
                                            url: 'resources/upload/submit.php',	
                                            method: 'POST',
                                            params:{
                                                submitdata: xml,
                                                file: xml_file, 
                                                curator: curator,
                                                editor_metafile: editor_metafile
                                            },                                                        
                                            success: function(response, opts) {

                                                var responseData = Ext.decode(response.responseText);

                                                if (!responseData.success) {
                                                    Ext.Msg.show({
                                                        title: 'Submit Error',
                                                        msg: 'Failed to save metadata. Please use the Save As option to save the XML file and send it to hub@iedadata.org',
                                                        icon: Ext.Msg.ERROR,
                                                        buttons: Ext.Msg.OK
                                                    });
                                                    return;
                                                }

                                                if (!responseData.validated) {
                                                    if (!me.validationwindow)
                                                        me.validationwindow=Ext.create("PMDMeta.view.main.ValidationWindow");
                                                    me.validationwindow.show();
                                                } else {

                                                    Ext.Msg.show({
                                                        title: 'Submit',
                                                        msg: 'Metadata successfully submitted.',
                                                        icon: Ext.Msg.INFO,
                                                        buttons: Ext.Msg.OK,
                                                        fn: function(btn, text){
                                                        if (btn === 'ok'){                                        
                                                            window.location.href='?object='+xml_file+'&editable=False'+'&editor_metafile='+editor_metafile+'&dataset='+dataset+'&curator='+curator+'extra'+extra;                                  
                                                        }
                                                    }
                                                    }); 
                                                }   
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
                    tooltip: 'Validate the metadata form',
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
