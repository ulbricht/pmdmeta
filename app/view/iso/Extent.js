/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.iso.Extent', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.iso.Extent',
        'PMDMeta.store.iso.Extent',
	'PMDMeta.view.main.MapWindow',
        'PMDMeta.store.datacite.combobox.TimezoneCombo'
    ],
    xtype: 'ISO-Extent',
    title: 'Temporal and Spatial Coverage (The EDIT-symbol to the left provides visual selection via Google Maps.) ',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.iso.Extent',	
    initComponent: function() {
	    
	var me=this;
	    
        me.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        
        Ext.create('PMDMeta.store.datacite.combobox.TimezoneCombo');

        Ext.apply(me, {          
            height: 200,
            plugins: [me.cellEditing],
            store: 'isoExtent',
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
                        text: 'Latitude',
                        sortable: false,		
                        menuDisabled: true,	                        
                        columns:[{
                                cls: 'PMDrecommended',			
                                header: 'Min',
                                width: 100,                                    
                                dataIndex: 'latmin',
                                align: 'center',
                                sortable: false,		
                                menuDisabled: true,                       
                                editor: {
                                    emptyText:'DD.ddddd',
                                    allowBlank: false,
                                    vtype: 'floatval'
                                }
                            },{
                                header: 'Max',
                                width: 100,           
                                dataIndex: 'latmax',
                                align: 'center',
                                sortable: false,		
                                menuDisabled: true,				
                                editor: {
                                    emptyText:'DD.ddddd',
                                    allowBlank: true,
                                    vtype: 'floatval'
                                }
                            }
                        ]
                    },
                    {
                        text: 'Longitude',                 
                        sortable: false,		
                        menuDisabled: true,				                       
                        columns:[
                            {
                                cls: 'PMDrecommended',        			
                                header: 'Min',
                                width: 100,            
                                dataIndex: 'lonmin',
                                align: 'center',
                                sortable: false,		
                                menuDisabled: true,				
                                editor: {
                                    emptyText:'DD.ddddd',
                                    allowBlank: false,
                                    vtype: 'floatval'
                                }
                        },{
                                header: 'Max',
                                width: 100,           
                                dataIndex: 'lonmax',
                                align: 'center',
                                sortable: false,		
                                menuDisabled: true,				
                                editor: {
                                    emptyText:'DD.ddddd',                            
                                    allowBlank: true,
                                    vtype: 'floatval'
                                }
                        }
                    ]
                },{

			header: 'Description of<br>spatial and tempoaral<br>coverage',
			flex: 1,
                        sortable: false,		
                        menuDisabled: true,	                       
                        align: 'center',
			dataIndex: 'description',
			editor: {
			    allowBlank: true
			}	
                    },{
                    text: 'Date/Time Start',                  
                    sortable: false,		
                    menuDisabled: true,	                    
                    columns:[{
			header: 'Date',
                        align: 'center',
                        sortable: false,		
                        menuDisabled: true,	                        
                        width: 100,                        
			dataIndex: 'dateFrom',
			editor: {
                            emptyText:'YYYY-MM-DD',
			    allowBlank: true,
                            vtype: 'DATE'
			}	
                    },{
			header: 'Time',
                        align: 'center',
                        sortable: false,		
                        menuDisabled: true,	
                        width: 100, 
                        dataIndex: 'timeFrom',
			editor: {
                            emptyText:'HH:MM:SS',
			    allowBlank: true,
                            vtype: 'TIME'
			}	
                    }]
                },{
                    text: 'Date/Time End',             
                    sortable: false,		
                    menuDisabled: true,	
                    columns:[{
			header: 'Date',
                        align: 'center',
                        sortable: false,		
                        menuDisabled: true,	                        
                        width: 100,                        
			dataIndex: 'dateTo',
			editor: {
                            emptyText:'YYYY-MM-DD',
			    allowBlank: true,
                            vtype: 'DATE'
			}	
                    },{
			header: 'Time',
                        align: 'center',
                        sortable: false,		
                        menuDisabled: true,	
                        width: 100,                        
			dataIndex: 'timeTo',
			editor: {
                            emptyText:'HH:MM:SS',
			    allowBlank: true,
                            vtype: 'TIME'
			}	
                    }]
                },{
			header: 'Time<br>zone',
                        align: 'center',
                        sortable: false,		
                        menuDisabled: true,	                        
                        width: 65,                        
			dataIndex: 'zone',
                        editor: new PMDMeta.view.main.ComboBox({
                            store: 'TimezoneCombo',
                            editable: true,    
                            emptyText: 'GMT+/-'
                        })                        
                },
                {
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
            ,viewConfig: {
                allowCopy: true,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    ddGroup: 'PMDExtent',                    
                    dragText: 'Drag and drop to reorganize, move, or copy records. <br> To copy records hold CTRL on your keybord before and while dragging.'
                },
                listeners:{
                    beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
                        if (data.copy){
                            var seed=Date.now();
                            for (var i=0;i<data.records.length;i++){
                                var oldrecord=data.records[i];
                                var id=oldrecord.get('id');
                                var record=oldrecord.copy(id+seed);
                                data.records[i]=record;
                            }
                        }
                        dropHandlers.processDrop();
                    }
                }
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
	    
	grid.gmap.fireEvent('PMDModelChange',store,model)	    
	grid.gmap.show();
	    
    },      
    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();	    
    },
    newEntry: function(){
	var me=this;
	var store=me.getStore();

	var invalidexists=false;
        store.each(function(model){
            var modelisvalid= ((model.get('latmin').length>0 && model.get('lonmin').length>0) 
                              || model.get('dateFrom').length>0 || model.get('dateTo').length>0);
		if (!invalidexists && !modelisvalid)
			invalidexists=true;			
	});
	if (!invalidexists && (me.numEntries<0 || (me.numEntries>0 && store.getCount()<me.numEntries)))
		me.onAddClick();		    
    }      
});
