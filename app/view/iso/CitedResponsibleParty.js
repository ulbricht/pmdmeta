/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.iso.CitedResponsibleParty', {
    extend: 'PMDMeta.view.datacite.Grid',
//    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.iso.ResponsibleParty',
        'PMDMeta.store.iso.CitedResponsibleParty'
    ],
    xtype: 'isoviewCitedResponsibleParty',
    title: 'Authors',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.iso.ResponsibleParty',	
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
	
        Ext.apply(this, {
            height: 300,
            plugins: [this.cellEditing],
            store: 'isoCitedResponsibleParty',
            columns: [
	    {
		cls: 'PMDrequired',		    
                header: 'Author (Lastname, Firstname)',
                dataIndex: 'name',
                flex: 1,
		sortable: false,	
                menuDisabled: true,		    
                editor: {
                    allowBlank: false
                }
            },{
                header: 'Role',
                dataIndex: 'isorole',
                width: 160,
		sortable: false,
                menuDisabled: true
            },{
                header: 'Position',
                dataIndex: 'isoposition',
                width: 130,
		sortable: false,	
                menuDisabled: true,		    
		editor: {
                    allowBlank: true
                }	
            },{
                header: 'Email',
                dataIndex: 'email',
                flex: 1,
		sortable: false,	
                menuDisabled: true,		    
		editor: {
                    allowBlank: true
                }		    
            }, {
                header: 'Phone',
                dataIndex: 'phone',
		hidden: true,
		sortable: false,		
                menuDisabled: true,		    
                editor: {
                    allowBlank: true
                }	
            },{
                header: 'Affiliation',
                dataIndex: 'affiliation',
                flex: 1,                
		sortable: false,			    
                menuDisabled: true,
  	        editor: {
                    allowBlank: true
                }	
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Responsible Party',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }]
        });

        this.callParent();

    },
    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();	 	                   
    }
});
