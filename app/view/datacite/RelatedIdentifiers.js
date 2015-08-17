/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.RelatedIdentifiers', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.RelatedIdentifier',
        'PMDMeta.store.datacite.RelatedIdentifier',
	'PMDMeta.store.datacite.combobox.IdentifiertypeCombo',
	'PMDMeta.store.datacite.combobox.RelationtypeCombo',
	'PMDMeta.view.main.ComboBox',
        'PMDMeta.view.main.ValidatingTextbox'
    ],
    xtype: 'DataCite-RelatedIdentifiers',
    title: 'Related Work',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.datacite.RelatedIdentifier',
    initComponent: function() {
        
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });               
        
        var titlebar=new Ext.Component({        
            height:50, 
            margin: '0 0 0 0',            
            hidden:true
        });         
        
        var me=this;
        
    	Ext.create('PMDMeta.store.datacite.combobox.IdentifiertypeCombo');
  	Ext.create('PMDMeta.store.datacite.combobox.RelationtypeCombo');

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteRelatedIdentifier',
            columns: [
		{
                header: 'Relation',
                dataIndex: 'relation',
                width: 210,
                editor: new PMDMeta.view.main.ComboBox({	
			store: 'RelationtypeCombo',
                        listConfig: {
                            itemTpl: [
                                '<div data-qtip="{name}: {qtip}">{group}:{name}</div>'
                            ]
                        }			
		}),
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="e.g. dataset is supplement to data report (doi); if applicable";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }
              },		
		{
                header: 'Type',
                dataIndex: 'identifierType',
		sortable: false,		
		menuDisabled: true,				
                width: 130,
                editor: new PMDMeta.view.main.ComboBox({
		    store: 'IdentifiertypeCombo'
                }),
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="e.g. dataset is supplement to data report (doi); if applicable";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }
                
            },{
                header: 'Identifier',
                flex: 1,		    
                dataIndex: 'identifier',
		sortable: false,		
		menuDisabled: true,
                editor: {
                    allowBlank: false
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="e.g. dataset is supplement to data report (doi); if applicable";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }
                /*getEditor: function(record, defaultfield){
                    //set validation type for the selected type
                    if (!me.PMDeditor)
                        me.PMDeditor=new PMDMeta.view.main.ValidatingTextbox({PMDmodel: record,PMDfield:'identifierType',msgTarget: titlebar.getItemId()});
                    
                    var vtypes=Ext.form.field.VTypes;
                    var vtype=record.get('identifierType');
                    var praefix=vtypes[vtype +'Default'];
                    if (praefix){
                       var previous=record.get('identifier');
                       if (previous.substring(0,praefix.length)!==praefix)
                           record.set('identifier',praefix+previous);
                    }

                    me.PMDeditor.setPMDmodel(record);
                    return me.PMDeditor;
                }*/	
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete identifier',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                padding: '0 0 0 5',
                items: [titlebar]
            }]  
            ,viewConfig: {
                allowCopy: true,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    ddGroup: 'PMDRelatedIdentifiers',                    
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
    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();	    
    }
});
