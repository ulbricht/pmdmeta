/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
Ext.define('PMDMeta.view.datacite.Rights', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Right',
        'PMDMeta.store.datacite.Right',
	'PMDMeta.store.datacite.combobox.RightsCombo',	
	'PMDMeta.view.main.ComboBox'	
    ],
    xtype: 'DataCite-Rights',
    title: 'Rights',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.datacite.Right',	
    numEntries:1,
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
		clicksToEdit: 1,
		listeners: {
		    edit: function(editor,context){
			    if (context.field==='right'){
				    var found=false;
                                    Ext.getStore('RightsCombo').each(function(data){
                                            if (!found && data.get('abbr')===context.value){
                                                    context.record.set('uri',data.get('uri'));
                                                    found=true;
                                            }
                                    });
                                    if (!found)
                                        context.record.set('uri',"");                                        
				}
		    }
		}		
        });
	
	Ext.create('PMDMeta.store.datacite.combobox.RightsCombo');	

        Ext.apply(this, {
            height: 100,
            plugins: [this.cellEditing],
            store: 'DataCiteRight',
            columns: [
		{
		cls: 'PMDrequired',			
                header: 'Licence',
                flex: 1,		    
                dataIndex: 'right',	
		sortable: false,		
		menuDisabled: true,				
		editor: new PMDMeta.view.main.ComboBox({
		    store: 'RightsCombo',
		    emptyText: 'please choose a license from the list or enter reuse conditions manually',
                    editable: true
		}),
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="Provide a rights management statement for the resource or reference a service providing such information. ";
                    qtip+=" Include embargo information if applicable. Use the complete title of a license and include version information if applicable. ";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                } 
            },{ 
                header: 'Rights URI',
                flex: 1,		    
                dataIndex: 'uri',
		sortable: false,		
		menuDisabled: true,
       //         hidden: true,                
                editor: {
                    allowBlank: true
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The URI of the license. Example: <i>http://creativecommons.org/licenses/by/3.0/de/deed.en</i>";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                } 	
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,

                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Right',
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
