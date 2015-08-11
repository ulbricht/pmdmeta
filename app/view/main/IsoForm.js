/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PMDMeta.view.main.IsoForm', {
	extend: 'Ext.form.Panel',
	requires: [
            'PMDMeta.store.iso.MD_Metadata',
            'PMDMeta.store.iso.MetadataContact',
            'PMDMeta.store.iso.IdentificationInfo',
            'PMDMeta.store.iso.CitedResponsibleParty',
            'PMDMeta.store.iso.DatasetContact',
            'PMDMeta.view.iso.CitedResponsibleParty',
            'PMDMeta.view.iso.DatasetContact'
	],
	xtype: 'Iso-Form',
	title: 'ISO19115 Metadata',   
	layout:  {type: 'vbox', align: 'stretch'},
	autoScroll: true,
	bodyPadding: 10,
	defaults:{margin: '0 0 10 0'},    
	initComponent: function() {
            new PMDMeta.store.iso.MD_Metadata();
            new PMDMeta.store.iso.MetadataContact();
            new PMDMeta.store.iso.IdentificationInfo();
            new PMDMeta.store.iso.CitedResponsibleParty();
            if (!Ext.getStore('isoDatasetContact'))            
               new PMDMeta.store.iso.DatasetContact();
	    this.callParent();   
	},
	items:[	{
                    xtype: 'isoviewDatasetContact',
                    title: 'Dataset Contact'
                },{	
                    xtype: 'isoviewCitedResponsibleParty',
                    title: 'CitedResponsibleParty'
                }
	]

});
