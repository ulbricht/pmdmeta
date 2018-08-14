/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Originators', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Originator',
        'PMDMeta.store.datacite.Originator',
	'PMDMeta.store.datacite.combobox.LabnameCombo',
	'PMDMeta.view.main.ComboBox',
        'PMDMeta.view.main.CheckComboBox'
    ],
    xtype: 'DataCite-Originators',
    title: 'Originators',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.datacite.Originator',
    initComponent: function() {
        var me=this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
		clicksToEdit: 1,
		listeners: {
		    edit: function(editor,context){
			    if (context.field==='name'){
				    var found=false;
                                    Ext.getStore('LabnameCombo').each(function(data){
                                            if (!found && data.get('name')===context.value){
                                                    context.record.set('affiliation',data.get('affiliation'));
                                                    context.record.set('role','HostingInstitution');
                                                    found=true;
                                            }
                                    });
                                    if (!found)
                                        context.record.set('affiliation',"");                                        
				}
		    }
		}		
        });

	new PMDMeta.store.datacite.combobox.LabnameCombo();

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteOriginator',
            columns: [
	    {
                header: 'name',
                dataIndex: 'name',
                flex: 2,
		sortable: false,		
		menuDisabled: true,				
                editor: new Ext.form.field.ComboBox({	
                    store: 'LabnameCombo',
                    editable: true,
		    displayField: 'searchname',
		    valueField: 'name',
		    anyMatch: true,
		    typeAhead: true,
		    minChars: 2,
		    queryMode: 'local',
		    emptyText: 'please choose'

		})
            },{
                header: 'Affiliation',
                dataIndex: 'affiliation',
		sortable: false,	
                 flex: 1,               
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
                        store.fireEvent('pmdafterdrop',store);
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
    }
});
