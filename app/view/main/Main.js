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
       'PMDMeta.view.main.DataCiteForm',
       'PMDMeta.view.main.IsoForm',
	'PMDMeta.view.main.FileAndVersionForm'
//	'PMDMeta.view.fileupload.FileUpload'     
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    initComponent: function() {
        new PMDMeta.store.escidoc.Files();   
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
                    //xtype: 'PMD-FileUpload'

                }
			]
		},
		{	region: 'east',			
			xtype: 'FileAndVersion-Form'
		}
    ]
});
