/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Titles', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Title',
        'PMDMeta.store.datacite.Title',
	'PMDMeta.store.datacite.combobox.TitletypeCombo',
	'PMDMeta.view.main.ComboBox'
    ],
    xtype: 'DataCite-Titles',
    title: 'Title',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.datacite.Title',	
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });



        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteTitle',
            columns: [
		 {
		cls: 'PMDrequired',			 
                header: 'Title',
                flex: 3,		    
                dataIndex: 'title',
		sortable: false,		
		menuDisabled: true,				 
                editor: {
                    allowBlank: false
                }	
            },{
                header: 'Type',
                dataIndex: 'titleType',
                width: 130,
		sortable: false,		
		menuDisabled: true,	
		editor: new  PMDMeta.view.main.ComboBox({
 		    store: 'TitletypeCombo'
		})
            },{
                header: 'Language',
                dataIndex: 'lang',   
                width: 130,
		sortable: false,		
		menuDisabled: true,			    
                editor: new  PMDMeta.view.main.ComboBox({
                    store: 'LanguageCombo'
		})
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Title',
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
