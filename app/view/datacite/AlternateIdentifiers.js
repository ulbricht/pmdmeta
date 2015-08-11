/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.AlternateIdentifiers', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.AlternateIdentifier',
        'PMDMeta.store.datacite.AlternateIdentifier',
	'PMDMeta.store.datacite.combobox.IdentifiertypeCombo',
	'PMDMeta.view.main.ComboBox'	
    ],
    xtype: 'DataCite-AlternateIdentifiers',
    title: 'AlternateIdentifiers',
    frame: true,
    layout: 'fit',	
    modelname: 'PMDMeta.model.datacite.AlternateIdentifier',
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

    	Ext.create('PMDMeta.store.datacite.combobox.IdentifiertypeCombo');

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteAlternateIdentifier',
            columns: [
        {
                header: 'Type',
                dataIndex: 'identifierType',
                width: 130,
		sortable: false,		
                menuDisabled: true,			
                editor: new PMDMeta.view.main.ComboBox({
		    store: 'IdentifiertypeCombo'
		})
            }, {
                header: 'Identifier',
                flex:1,		    
                dataIndex: 'identifier',
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
                    tooltip: 'Delete identifier',
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
