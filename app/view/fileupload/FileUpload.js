/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.fileupload.FileUpload', {
    extend: 'Ext.form.Panel',
    requires: [
	'PMDMeta.view.main.Files',
	'PMDMeta.store.escidoc.Files'	
    ],
    xtype: 'PMD-FileUpload',
    title: 'Files',
 //   frame: true,
  //  width: 250,
    layout: {type:'vbox', align: 'stretch'},
    items: [
       {    xtype: 'container',
            layout: {type:'hbox'},            
            items:[
                {
                    xtype: 'fileuploadfield',
                    name: 'fileupload',
                    buttonOnly: true,
                    hideLabel:true,
                    msgTarget: 'under',
                    buttonText: 'Add File from hard disk',
                    margin: '5 5 5 5',
                    listeners:{
                        change: function( elem, value, eOpts ) {
                            var form = elem.up('form').getForm();
                            if(form.isValid()){
                                form.submit({
                                    url: 'resources/upload/upload.php',
                                    waitMsg: 'Uploading..',
                                    success: function(fp, o) {
                                        var store=Ext.getStore('Files');
                                        store.add({name:o.result.fileName,size:o.result.fileSize,type:o.result.fileType,content:o.result.fileURL, storage: 'internal-managed'});
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
                    buttonOnly: true,
                    hideLabel:true,            
                    text: 'Add External URL',            
                    margin: '5 5 5 5',
                    listeners: {
                        click: function() {
                                Ext.Msg.prompt('Please enter URL', 'Please enter an URL:', function(btn, text){
                                    if (btn === 'ok'){
                                         var store=Ext.getStore('Files');
                                        store.add({name:text,size:0,type:"application/octet-stream",content:text, storage: 'external-url'});
                                    }
                                });
                        }
                    }
                }
            ]
        },{
		xtype: 'Files',
	        frame: false
	}]
});
