/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.iso.DatasetContact', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'PMDMeta.store.iso.DatasetContact'
    ],
    xtype: 'isoviewDatasetContact',
    title: 'Contact',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.iso.ResponsibleParty',
    initComponent: function() {
        var me=this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        Ext.apply(this, {
            height: 130,
            plugins: [this.cellEditing],
            store: 'isoDatasetContact',
            columns: [
	    {		    
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
                menuDisabled: true,
                hidden: true 
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
                header: 'Website',
                dataIndex: 'internet',
                flex: 1,
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
                    tooltip: 'Delete Person',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }]
            ,viewConfig: {
                allowCopy: true,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    ddGroup: 'PMDPerson',                    
                    dragText: 'Drag and drop to reorganize, move, or copy records between Author, Contributor, and Contact areas. <br> To copy records hold CTRL on your keybord before and while dragging.'
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
                    },
                    drop: function(){
                        var store=me.getStore();
                        store.fireEvent('pmdafterdrop',store)
                    }
                }
            }
        });

        this.callParent();
    },
    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();	 	    
    },    
    onAddClick: function(){
	var me=this;
        var rec = Ext.create(me.modelname);
        rec.set('isorole','pointOfContact');
        this.getStore().add(rec);
    }
    
});
