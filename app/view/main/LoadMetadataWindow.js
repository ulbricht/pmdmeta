
Ext.define('PMDMeta.view.main.LoadMetadataWindow',{		
	extend: 'Ext.window.Window',
        title: 'Load Metadata',
	closeAction: 'hide',
        modal:true,
        width:400,
        height: 200,
        
    initComponent: function() {
	    
	var me=this;        
        
        Ext.apply(me, {         
        items: [
            { xtype: 'form',
        
	items:[
		{
                    xtype: 'fileuploadfield',
                    name: 'metaupload',
                    tooltip: 'Load default metadata',
                    buttonOnly: true,
                    hideLabel:true,
                    msgTarget: 'under',
                    buttonConfig: {
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
                                                me.close();

                                           },
                                           failure: function(response, opts) {
                                              console.log('server-side failure with status code ' + response.status);
                                              me.close();                                              
                                           }            
                                        });                                                                
                                    },
                                    failure:function(fp, o) {
                                        Ext.Msg.alert('Failure', 'Error uploading file.');
                                        me.close();                                        
                                    }
                                });
                            }
                        }		
                    }
                }
	]
    }]
        });
        
        this.callParent();        

    }

});