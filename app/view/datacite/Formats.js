/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Formats', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Format',
        'PMDMeta.store.datacite.Format'
    ],
    xtype: 'DataCite-Formats',
    title: 'Formats',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.datacite.Format',
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteFormat',
            columns: [
		{
                header: 'Format',
                flex: 1,		    
                dataIndex: 'format',
		sortable: false,		
                menuDisabled: true,				
                editor: {
                    allowBlank: false
                }	
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Format',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }],
            selModel: {
                selType: 'cellmodel'
            }
        });

        this.callParent();
    },

    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();		    
    }
});
