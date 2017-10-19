/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Authors', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Author',
        'PMDMeta.store.datacite.Author',
	'PMDMeta.store.datacite.combobox.AuthorIDCombo',
	'PMDMeta.store.datacite.combobox.ContributortypeCombo',
	'PMDMeta.view.main.ComboBox',
        'PMDMeta.view.main.CheckComboBox'
    ],
    xtype: 'DataCite-Authors',
    title: 'Authors',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.datacite.Author',	
    initComponent: function() {
        var me=this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners: {
                edit: function(editor,context){
                    if (context.field==='role'){
                        Ext.each(context.value, function(value){
                            if (value==='Other'){
                                Ext.Msg.prompt('Other role', 'Please enter an additional different role:', function(btn, text){
                                    if (btn === 'ok'){
                                        context.record.set('position',text);
                                    }
                                }, me , false, context.record.get('position'));
                            }
                        });
                    }
                }
            }
        });

	Ext.create('PMDMeta.store.datacite.combobox.AuthorIDCombo');
	Ext.create('PMDMeta.store.datacite.combobox.ContributortypeCombo');
        Ext.apply(this, {
            height: 300,
            plugins: [this.cellEditing],
            store: 'DataCiteAuthor',
            columns: [
	    {
		cls: 'PMDrequired',		    
                header: 'Lastname',
                dataIndex: 'name',
                flex: 1,
		sortable: false,	
                menuDisabled: true,		    
                editor: {
                    allowBlank: false
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The main researchers involved in producing the data, or the authors of the publication, in priority order. ";
                    qtip+=" May be a corporate/institutional name or a persons last name.";
                    qtip+=" Non‐roman names may be transliterated according to the ALA‐LC schemes 10";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                } 
            },{
                header: 'Firstname',
                dataIndex: 'firstname',
                flex: 1,
		sortable: false,	
                menuDisabled: true,		    
                editor: {
                    allowBlank: false
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="Put here the authors given name. ";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                } 
            },{
                header: 'Role',
                dataIndex: 'role',
                width: 160,
		sortable: false,
                menuDisabled: true,		    
                getEditor: function(record, defaultfield){
                    var value=record.get('role');
                    var editor=new PMDMeta.view.main.CheckComboBox(
                            {store: 'ContributortypeCombo',multiSelect: true}
                        );
                    return editor;
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    if (record.get('role').indexOf('Other')>-1){
                        var qtip
                        if (record.get('position').length==0)
                            qtip="Currently there is no addtional role set.";                    
                        else 
                            qtip="An additional role <b>"+record.get('position')+"</b> has been set.";
                        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    }
                    return value;
                }                
            },{
                header: 'Author ID Type',
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
                header: 'Author Identifier (ID)',
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
                    //copy model if necessary
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
    }
});
