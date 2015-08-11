/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.GeoLocations', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.GeoLocation',
        'PMDMeta.store.datacite.GeoLocation',
	'PMDMeta.view.main.ComboBox',
	'PMDMeta.view.main.MapWindow'	
    ],
    xtype: 'DataCite-GeoLocations',
    title: 'Spatial Coverage (The EDIT-symbol to the left provides visual selection via Google Maps.) ',
    frame: true,
    layout: 'fit',
     modelname:'PMDMeta.model.datacite.GeoLocation',	
    initComponent: function() {
	    
	    var me=this;
	    
        me.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

	
        Ext.apply(me, {          
            height: 200,
            plugins: [me.cellEditing],
            store: 'DataCiteGeoLocation',
            columns: [
		{
			xtype: 'actioncolumn',
			width: 30,
			sortable: false,
			menuDisabled: true,
			items: [{
			    icon: 'resources/images/icons/fam/page_white_edit.png',
			    tooltip: 'Add via Map',
			    scope: this,
			    handler: this.onAddViaMap
			}]
		},
		{
			cls: 'PMDrecommended',			
			header: 'Min Latitude',
			dataIndex: 'latmin',
			align: 'right',
			flex: 1,
			sortable: false,		
			menuDisabled: true,                       
			editor: {
                            emptyText:'DD.ddddd',
			    allowBlank: true,
                            vtype: 'floatval'
			}
		},{
			header: 'Max Latitude',
			dataIndex: 'latmax',
			flex: 1,
			align: 'right',
			sortable: false,		
			menuDisabled: true,				
			editor: {
                            emptyText:'DD.ddddd',
                            allowBlank: true,
                            vtype: 'floatval'
			}
		},{
			cls: 'PMDrecommended',			
			header: 'Min Longitude',
			dataIndex: 'lonmin',
			flex: 1,
			align: 'right',
			sortable: false,		
			menuDisabled: true,				
			editor: {
                            emptyText:'DD.ddddd',
                            allowBlank: true,
                            vtype: 'floatval'
			}
		},{
			header: 'Max Longitude',
			dataIndex: 'lonmax',
			flex: 1,
			align: 'right',
			sortable: false,		
			menuDisabled: true,				
			editor: {
                            emptyText:'DD.ddddd',                            
			    allowBlank: true,
                            vtype: 'floatval'
			}
		},{
			header: 'Place/Description of Geographic Location',
			flex: 4,
			dataIndex: 'place',
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

    onAddViaMap: function(grid, rowIndex){
	    
	var me=this;   
	var store=this.getStore();
        var model=store.getAt(rowIndex);		    
	if (!grid.gmap)
		grid.gmap=Ext.create('PMDMeta.view.main.MapWindow');
	    
	grid.gmap.show();
	grid.gmap.setStore(store,model);		
	    
    },      
    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();	    
    }
});
