/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PMDMeta.view.main.Publications', {
	extend: 'Ext.form.Panel',
	requires: [
            'PMDMeta.store.endnote.Publications',
            'PMDMeta.view.main.PublicationsGrid'
	],
	xtype: 'Publications',
	title: 'Related Publications',   
	layout:  'fit',
	autoScroll: true,
	bodyPadding: 10,
	defaults:{margin: '0 0 10 0'},    
	initComponent: function() {
	    this.callParent();   
	},
	items:[{ xtype: 'PublicationsGrid'}]

});
