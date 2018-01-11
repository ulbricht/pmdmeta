/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PMDMeta.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'PMDMeta.view.main.MainController',
        'PMDMeta.view.main.MainModel',
       'PMDMeta.view.main.DataCiteForm',
       'PMDMeta.view.main.IsoForm',
	'PMDMeta.view.main.FileAndVersionForm',
	'PMDMeta.view.fileupload.FileUpload',
        'PMDMeta.view.main.LoadMetadataWindow',
        'PMDMeta.view.main.CitationWindow',
        'PMDMeta.view.main.ReviewWindow'        
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    initComponent: function() {
        new PMDMeta.store.escidoc.Files();   
        
        var me=this;

        var metaclear=new Ext.Action({
                        text: 'Clear',
                        handler: function(){
                            Ext.getStore('Item').loaddata(); 
                        }
                    });
        var metaload=new Ext.Action({
                        text: 'Load from hard disk',
                        handler: function(){
                            if (!me.loadmetawindow)
                                me.loadmetawindow=new PMDMeta.view.main.LoadMetadataWindow();
                            me.loadmetawindow.show();                           
                        }
                    });
        var metasave=new Ext.Action({
                        text: 'Save to hard disk',
                        handler: function(){
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
                    });
        var metasubmit=new Ext.Action({
                        text: 'Submit to GFZ Library',
                        handler: function(){
                            var xml=Ext.getStore('Item').marshal();
                            Ext.Ajax.request({
                                url: 'resources/upload/submitmail.php',	
                                method: 'POST',
                                params:{
                                    mailcontent: xml
                                },                                                        
                                success: function(response, opts) {
                                    var responseData = Ext.decode(response.responseText);
                                    if(!responseData.success) {
                                        Ext.Msg.show({
                                            title: 'Submit mail',
                                            msg: 'Submission failed. Please save the XML file and send it via mail.',
                                            icon: Ext.Msg.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }else{
                                        Ext.Msg.show({
                                            title: 'Submit mail',
                                            msg: 'Submission mail sent successfully.',
                                            icon: Ext.Msg.INFO,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                },
                                failure: function(response, opts) {
                                  console.log('server-side failure with status code ' + response.status);
                                }            
                            });
                        }
                    });
        var datasave=new Ext.Action({
                        text: 'Save Dataset to Server',
                        handler: function(){
                             Ext.getStore('Item').synccontent();
                        }
                    });
        var datapreview=new Ext.Action({
                        text: 'Preview',
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
                    });
        var doiregister=new Ext.Action({
                        text: 'Register DOI',
                        handler: function(){
                            
                            if (!me.doiregistration)
                                me.doiregistration=new PMDMeta.view.main.DOIregistration();
                            me.doiregistration.setup();                           
                            
                            var item=Ext.getStore('Item').getAt(0);
                            if (!item) return;
                            var itemhref=item.get("href");
                            if (!itemhref) return;
                            var itemid=itemhref.substr(itemhref.lastIndexOf("/")+1,itemhref.length-1);
                            if (!itemid) return;                              
                            
                            Ext.Ajax.request({
                                url: 'resources/getpublishstatus.php?id='+itemid,	
                                success: function(response, opts) {                  
                                    var responseData = Ext.decode(response.responseText);
                                    var ispublished=false;
                                    if (responseData.success && responseData.versionstatus==='released'){
                                        ispublished=true;
                                    }
        
                                    if (ispublished){
                                        me.doiregistration.show();                                                                            
                                    }else{
                                        Ext.Msg.show({
                                            title:'Unpublished Dataset',
                                            message: 'Dataset is not public.<br>You can set the dataset status via menu <b>Publication</b> &gt; <b>Status</b>',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.INFO,
                                            fn: function(btn) {
                                                me.doiregistration.show();
                                            }
                                        });                                       
                                    }
                                },
                                failure: function(response, opts) {
                                     me.doiregistration.show();                                    
                                }  
                            });                            

                        }
                    });


        me.datasetstatus=function(operation,errormsg,waitmsg){
            var item=Ext.getStore('Item').getAt(0);
            if (!item) return;
            var itemhref=item.get("href");
            if (!itemhref) return;
            var itemid=itemhref.substr(itemhref.lastIndexOf("/")+1,itemhref.length-1);
            if (!itemid) return;
            var progress=Ext.Msg.wait('Please wait', waitmsg);                            
            Ext.Ajax.request({
                url: 'resources/publishstatus.php?id='+itemid+'&operation='+operation,	
                success: function(response, opts) {
                    
                    progress.close();                    
                    var responseData = Ext.decode(response.responseText);
                    if (!responseData.success){
                        Ext.Msg.show({
                            title: 'Error',
                            msg: errormsg+"<br>"+responseData.message,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });                                    
                    }
               },
               failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                    progress.close();                                  
               }            
            });                                                  
        };

        var pendinginrevision=new Ext.Action({
                        text: 'Pending/In-Revision',
                        itemId: 'pending',                        
                        handler: function(){ 
                            var status='Pending/In-Revision';                            
                            var operation="revise";                             
                            var errormsg="Could not transfer dataset to status &quot;"+status+"&quot;.";
                            var waitmsg="Transferring dataset to status &quot;"+status+"&quot;.";
                            me.datasetstatus(operation,errormsg,waitmsg);
                        }
                    });
        var submit=new Ext.Action({
                        text: 'Submitted',
                        itemId: 'submitted',                        
                        handler: function(){
                            var status='Submitted';                            
                            var operation="submit";                             
                            var errormsg="Could not transfer dataset to status &quot;"+status+"&quot;.";
                            var waitmsg="Transferring dataset to status &quot;"+status+"&quot;.";
                            me.datasetstatus(operation,errormsg,waitmsg);                         
                        }
                    });
        var publish=new Ext.Action({
                        text: 'Published',
                        itemId: 'released',                        
                        handler: function(){
                            var status='Published';                            
                            var operation="publish";                             
                            var errormsg="Could not transfer dataset to status &quot;"+status+"&quot;.";
                            var waitmsg="Transferring dataset to status &quot;"+status+"&quot;.";
                            me.datasetstatus(operation,errormsg,waitmsg);                            
                        }
                    });
        var withdraw=new Ext.Action({
                        text: 'Withdrawn',
                        itemId: 'withdrawn',
                        handler: function(){
                            var status='Withdrawn';                            
                            var operation="withdraw";                             
                            var errormsg="Could not transfer dataset to status &quot;"+status+"&quot;.";
                            var waitmsg="Transferring dataset to status &quot;"+status+"&quot;.";
                            me.datasetstatus(operation,errormsg,waitmsg);                        
                        }
                    });  
                    
        var reviewlink=new Ext.Action({
                        text: 'Review Link',
                        handler: function(){
                            if (!me.reviewwindow)
                                me.reviewwindow=new PMDMeta.view.main.ReviewWindow();
                            me.reviewwindow.show();
                        }
                    });  
        var helpformular=new Ext.Action({
                        text: 'Help on formular',
                        handler: function(){
                            window.open("resources/pdf/GFZ-Metadata-Editor_functionality_20161002.pdf","_blank");
                        }
                    });
        var helpmetadatafields=new Ext.Action({
                        text: 'Help on metadata fields',
                        handler: function(){
                            window.open("resources/pdf/Metadata-Form-Documentation_20161002.pdf","_blank");
                        }
                    });  
        var quickstart=new Ext.Action({
                        text: 'Quick Start Guide',
                        handler: function(){
                            window.open("resources/pdf/Quick-Start-Guide-fo-Data-Publications-GFZ-Data-Services.pdf","_blank");
                        }
                    });                   
        
        var citationwindow=new Ext.Action({
                        text: 'Citation',
                        handler: function(){
                            if (!me.citationwindow)
                                me.citationwindow=new PMDMeta.view.main.CitationWindow();
                            me.citationwindow.show();                           
                        }
                    });        

         Ext.apply(me, {
               

            tbar:[
            {
                text: 'Metadata',
                menu: [
                    metaclear,metaload,metasave,metasubmit
                ]

            }, {
                text: 'Dataset',
                menu: [
                    datasave,datapreview
                ]
            }, {
                text: 'Publication',
                menu: [
                    {
                        text: 'Status',
                        menu:[
                            pendinginrevision,
                            submit,
                            publish,
                            withdraw                            
                        ],
                        listeners:{
                            focus: function( p, animate, eOpts ){
                                
                            var item=Ext.getStore('Item').getAt(0);
                            if (!item) return;
                            var itemhref=item.get("href");
                            if (!itemhref) return;
                            var itemid=itemhref.substr(itemhref.lastIndexOf("/")+1,itemhref.length-1);
                            if (!itemid) return;                            
                            Ext.Ajax.request({
                                url: 'resources/getpublishstatus.php?id='+itemid,	
                                success: function(response, opts) {                  
                                    var responseData = Ext.decode(response.responseText);
                                    if (responseData.success){
                                                switch (responseData.versionstatus){
                                                    case 'pending':
                                                    case 'in-revision':                                                        
                                                        pendinginrevision.disable();
                                                        submit.enable();
                                                        publish.disable();
                                                        withdraw.disable();                                                        
                                                        pendinginrevision.setText(">"+pendinginrevision.getText().replace(/>/,""));                                                        
                                                        submit.setText(submit.getText().replace(/>/,""));
                                                        publish.setText(publish.getText().replace(/>/,""));
                                                        withdraw.setText(withdraw.getText().replace(/>/,""));                                                        
                                                        break;
                                                    case 'submitted':
                                                        if (responseData.publicstatus==='pending' || responseData.publicstatus==='in-revision' || responseData.publicstatus==='submitted')
                                                            pendinginrevision.enable();
                                                        else
                                                            pendinginrevision.disable();
                                                        submit.disable();
                                                        publish.enable();
                                                        withdraw.disable();
                                                        pendinginrevision.setText(pendinginrevision.getText().replace(/>/,""));                                                        
                                                        submit.setText(">"+submit.getText().replace(/>/,""));
                                                        publish.setText(publish.getText().replace(/>/,""));
                                                        withdraw.setText(withdraw.getText().replace(/>/,""));                                                                                    
                                                        break;
                                                    case 'released':
                                                        pendinginrevision.disable();
                                                        submit.disable();
                                                        publish.disable();
                                                        withdraw.enable();
                                                        pendinginrevision.setText(pendinginrevision.getText().replace(/>/,""));                                                        
                                                        submit.setText(submit.getText().replace(/>/,""));
                                                        publish.setText(">"+publish.getText().replace(/>/,""));
                                                        withdraw.setText(withdraw.getText().replace(/>/,""));                                                        
                                                        break;
                                                    case 'withdrawn':
                                                        var text=withdraw.getText();
                                                        withdraw.setText("*"+text);                                                           
                                                        pendinginrevision.disable();
                                                        submit.disable();
                                                        publish.disable();
                                                        withdraw.disable();
                                                        pendinginrevision.setText(pendinginrevision.getText().replace(/>/,""));                                                        
                                                        submit.setText(submit.getText().replace(/>/,""));
                                                        publish.setText(publish.getText().replace(/>/,""));
                                                        withdraw.setText(">"+withdraw.getText().replace(/>/,""));                                                            
                                                        break;
                                                }                        
                                    }
                                },
                                failure: function(response, opts) {
                                }  
                            });
                            }
                        }
                    },
                    reviewlink,
                    doiregister,
		    citationwindow
                ]
            }, {
                text: 'About/Help',
                menu: [
                    quickstart,helpformular,helpmetadatafields
                ]
            }        

            ]

                 }   );

          this.callParent();     
        },
    layout:  'border',
    items: [
		{
			xtype: 'tabpanel',
			region: 'center',
			items:[
				{

					xtype: 'DataCite-Form'
				},
				{
					xtype: 'Iso-Form'
				},{
                                        xtype: 'PMD-FileUpload'

                                }
			]
		}
		,
		{	region: 'east',			
			xtype: 'FileAndVersion-Form'
		}
    ]
});
