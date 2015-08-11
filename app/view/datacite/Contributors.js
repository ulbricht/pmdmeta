/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Contributors', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Contributor',
        'PMDMeta.store.datacite.Contributor',
	'PMDMeta.store.datacite.combobox.AuthorIDCombo',	
	'PMDMeta.store.datacite.combobox.ContributortypeCombo',
	'PMDMeta.view.main.ComboBox',
        'PMDMeta.view.main.CheckComboBox'
    ],
    xtype: 'DataCite-Contributors',
    title: 'Contributors',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.datacite.Contributor',
    initComponent: function() {
        var me=this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
	Ext.create('PMDMeta.store.datacite.combobox.AuthorIDCombo');	
	Ext.create('PMDMeta.store.datacite.combobox.ContributortypeCombo');
	
        Ext.apply(this, {
            height: 300,
            plugins: [this.cellEditing],
            store: 'DataCiteContributor',
            columns: [
	    {
                header: 'Contributor (Lastname, Firstname)',
                dataIndex: 'name',
                flex: 1,
		sortable: false,	
                menuDisabled: true,		    
                editor: {
                    allowBlank: false
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The institution or person responsible for collecting, managing, distributing, or"; 
                    qtip+=" otherwise contributing to the development of the resource.  The personal name format";
                    qtip+=" should be: family, given.";
                    qtip+=" Non‐roman names may be transliterated according to the ALA‐LC schemes 10";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                } 
            },{
                header: 'Role',
                dataIndex: 'role',
                width: 160,
		sortable: false,
                menuDisabled: true,		    
                editor: new PMDMeta.view.main.CheckComboBox({		
                    store: 'ContributortypeCombo',
                    multiSelect: true      
		})
            }, {
                header: 'Contributor ID Type',
                dataIndex: 'nameIdentifierScheme',
                width: 130,
		sortable: false,	
                menuDisabled: true,		    
		editor: new PMDMeta.view.main.ComboBox({
		    store: 'AuthorIDCombo'	
		}),
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="Due to varying spellings of author names it is difficult to find all works of a specific researcher in catalogue systems.";
                    qtip+=" Several solutions were developed to cope with this problem by assigning an unique identifier to authors and contributors of";
                   qtip+=" publications. You can select here the type of solution you are using for identification. After selection enter your author identifier";
                   qtip+=" to the right.";                    
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }
            },{
                header: 'Contributor Identifier (ID)',
                dataIndex: 'nameIdentifier',
                flex: 1,
		sortable: false,	
                menuDisabled: true,		    
		editor: {
                    allowBlank: true
                }		    
            }, {
                header: 'ID Type URI',
                dataIndex: 'nameIdentifierSchemeURI',
		hidden: true,
		sortable: false,		
                menuDisabled: true,		    
                editor: {
                    allowBlank: true
                }	
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
