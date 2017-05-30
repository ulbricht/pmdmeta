/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Subjects', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Subject',
        'PMDMeta.store.datacite.Subject',
	'PMDMeta.view.main.ComboBox'
    ],
    xtype: 'DataCite-Subjects',
    title: 'Keywords',
    frame: true,
    layout: 'fit',
    modelname: 	'PMDMeta.model.datacite.Subject',
    delimiter: ",",
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteSubject',
            columns: [
		{		
                header: 'Keyword',
                dataIndex: 'subject',
                flex: 1,
		sortable: false,		
		menuDisabled: true,				
                editor: {
                    allowBlank: false
                }	
            },{
                header: 'Scheme',
                dataIndex: 'subjectScheme',
                width: 130,
		sortable: false,		
		menuDisabled: true,			    
                editor: {
                    allowBlank: true
                }	
            },{
                header: 'Scheme URI',
                dataIndex: 'subjectSchemeURI',
                width: 130,					    
		sortable: false,		
		menuDisabled: true,	
		editor: {
                    allowBlank: true
                }	
            },{
                header: 'Language',
                dataIndex: 'lang',   
                width: 130,
		sortable: false,		
		menuDisabled: true,			    
                editor: new PMDMeta.view.main.ComboBox({	
                    store: 'LanguageCombo'
		})
            },{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Subject',
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
