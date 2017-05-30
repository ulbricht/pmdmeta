/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Descriptions', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Description',
        'PMDMeta.store.datacite.Description',
	'PMDMeta.store.datacite.combobox.DescriptiontypeCombo',
	'PMDMeta.view.main.ComboBox'
    ],
    xtype: 'DataCite-Descriptions',
    title: 'Descriptions',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.datacite.Description',
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.create('PMDMeta.store.datacite.combobox.DescriptiontypeCombo');

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteDescription',
            columns: [
        {	
                header: 'Type',
                dataIndex: 'descriptionType',
                width: 130,
		sortable: false,		
                menuDisabled: true,		
                editor: new PMDMeta.view.main.ComboBox({	
		    store: 'DescriptiontypeCombo'
		})
            },{
                header: 'Language',
                dataIndex: 'lang',   
                width: 130,
		hidden:true,
		sortable: false,		
                menuDisabled: true,	
                editor: new PMDMeta.view.main.ComboBox({
                    store: 'LanguageCombo'
		})
            }, {    
                header: 'Description',
                flex: 1,		    
                dataIndex: 'description',
		sortable: false,		
                menuDisabled: true,		    
                editor: { xtype: 'textarea', height:120}
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Description',
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
