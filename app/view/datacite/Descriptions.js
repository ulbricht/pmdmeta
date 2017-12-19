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
	'PMDMeta.view.datacite.PanelController',
	'PMDMeta.store.datacite.combobox.DescriptiontypeCombo',
	'PMDMeta.view.main.ComboBox'
    ],
    xtype: 'DataCite-Descriptions',
    title: 'Descriptions',
    controller: 'PanelController',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.datacite.Description',
            height: 200,
            plugins: {
		ptype: 'cellediting',
		clicksToEdit: 1
	    },
            store: 'DataCiteDescription',
            columns: [
        {
		cls: 'PMDrequired',		
                header: 'Type',
                dataIndex: 'descriptionType',
                width: 130,
		sortable: false,		
                menuDisabled: true,		
                editor: {
		    xtype: 'PMD-ComboBox',	
		    store: 'DescriptiontypeCombo'
		}
            },{
                header: 'Language',
                dataIndex: 'lang',   
                width: 130,
		hidden:true,
		sortable: false,		
                menuDisabled: true,	
                editor:{
		    xtype: 'PMD-ComboBox',
                    store: 'LanguageCombo'
		}
            }, {
		cls: 'PMDrequired',		    
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
                    handler: function(view, rowIndex) {
     			this.fireEvent('itemClick', view, rowIndex);
    		    }
                }]
            }],
            selModel: {
                selType: 'cellmodel'
            }

});
