/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Sizes', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Size',
        'PMDMeta.store.datacite.Size',
	'PMDMeta.store.datacite.combobox.SizeCombo'	
    ],
    xtype: 'DataCite-Sizes',
    title: 'Sizes',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.datacite.Size',
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

	new PMDMeta.store.datacite.combobox.SizeCombo();	
        
	Ext.apply(this, {
            height: 120,
            plugins: [this.cellEditing],
            store: 'DataCiteSize',
            columns: [
		{
                header: 'Size',
                flex: 1,		    
                dataIndex: 'size',
		sortable: false,		
		menuDisabled: true,				
		editor: new PMDMeta.view.main.ComboBox({
		    store: 'SizeCombo',
		    emptyText: 'please estimate the file size and choose a category',
                    editable: true
		})	
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Size',
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
