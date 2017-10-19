/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.FundingReference', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.FundingReference',
        'PMDMeta.store.datacite.FundingReference',
	'PMDMeta.view.main.ComboBox',
	'PMDMeta.store.datacite.combobox.FunderCombo',
	'PMDMeta.store.datacite.combobox.FunderIDCombo'
    ],
    xtype: 'DataCite-FundingReference',
    title: 'FundingReference',
    frame: true,
    layout: 'fit',
    modelname: 	'PMDMeta.model.datacite.FundingReference',
    delimiter: ",",
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
		clicksToEdit: 1,
		listeners: {
		    edit: function(editor,context){
			    if (context.field==='funderName'){
				    var found=false;
                                    Ext.getStore('FunderCombo').each(function(data){
                                            if (!found && data.get('name')===context.value){
                                                    context.record.set('funderIdentifier',data.get('uri'));
                                                    context.record.set('funderIdentifierType',"Crossref Funder ID");
                                                    found=true;
                                            }
                                    });
                                    if (!found)
                                        context.record.set('uri',"");                                        
				}
		    }
		}		
        });

	new PMDMeta.store.datacite.combobox.FunderCombo();
	new PMDMeta.store.datacite.combobox.FunderIDCombo();

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteFundingReference',
            columns: [
		{
                header: 'Funder',
                dataIndex: 'funderName',
                flex: 1,
		sortable: false,		
		menuDisabled: true,				
                editor: new PMDMeta.view.main.ComboBox({	
                    store: 'FunderCombo',
                    editable: true,
		    displayField: 'name',
		    valueField: 'name',
		    enableRegEx: true,
		    anyMatch: true,
		    typeAhead: true,
		    minChars: 2
		})
            },{
                header: 'Funder ID',
                dataIndex: 'funderIdentifier',
                flex: 1,
		sortable: false,		
		menuDisabled: true,			    
                editor: {
                    allowBlank: true
                }	
            },{
                header: 'Funder ID Type',
                dataIndex: 'funderIdentifierType',
                flex: 1,
		sortable: false,		
		menuDisabled: true,	
                editor: new PMDMeta.view.main.ComboBox({	
                    store: 'FunderIDCombo'
		})	
            },{
                header: 'Grant Number',
                dataIndex: 'awardNumber',   
                flex: 1,
		sortable: false,		
		menuDisabled: true,
		editor: {
                    allowBlank: true
                }			    
            },{
                header: 'Grant Name',
                dataIndex: 'awardTitle',   
                flex: 1,
		sortable: false,		
		menuDisabled: true,			    
		editor: {
                    allowBlank: true
                }
            },{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Subject',
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
