/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.main.PublicationsGrid', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.endnote.Publication',
        'PMDMeta.store.endnote.Publications'
    ],
    xtype: 'PublicationsGrid',
    frame: true,    
    layout: 'fit',
    title: 'Publications',
    modelname:'PMDMeta.model.endnote.Publication',    
    initComponent: function() {
        var me=this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        new PMDMeta.store.endnote.Publications();
        
        Ext.apply(this, {
            height: 300,
            plugins: [this.cellEditing],
            store: 'EndnotePublications',
            columns: [
            {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/page_white_edit.png',
                    tooltip: 'Edit Publication',
                    scope: this,
                    handler: this.onEditPublication
                }]
            },{
                header: 'Citation',
                dataIndex: 'href',
                flex: 1,
		sortable: false,	
                menuDisabled: true
            },{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Publication',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }]
       
        });
        this.callParent();
    }
    
});

