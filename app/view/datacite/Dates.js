/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Dates', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Date',
        'PMDMeta.store.datacite.Date',
	'PMDMeta.store.datacite.combobox.DatetypeCombo',
	'PMDMeta.store.datacite.combobox.DatasetStatusCombo',
	'PMDMeta.view.main.ComboBox',
        'PMDMeta.view.main.ValidatingTextbox'
    ],
    xtype: 'DataCite-Dates',
    title: 'Dates',
    frame: true,
    layout: 'fit',
    modelname:'PMDMeta.model.datacite.Date',	
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

    	Ext.create('PMDMeta.store.datacite.combobox.DatetypeCombo');
    	Ext.create('PMDMeta.store.datacite.combobox.DatasetStatusCombo');
	
        var titlebar=new Ext.Component({        
            height:50, 
            margin: '0 0 0 0',            
            hidden:true
        });         
        
        var me=this; 
        
        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteDate',
            columns: [
        {
                header: 'Type',
                dataIndex: 'dateType',
                width: 130,
		sortable: false,		
                menuDisabled: true,			
                editor: new PMDMeta.view.main.ComboBox({
		    store: 'DatetypeCombo'
		})
            }, {
		    
		header: 'Starting Date',
                dataIndex: 'dateFrom',
                flex: 1,
		sortable: false,		
                menuDisabled: true,                
                getEditor: function(record, defaultfield){
                    //set validation type for the selected type
                    var model=new Ext.data.Model();
                    model.set('type','DATE');
                    var editor=new PMDMeta.view.main.ValidatingTextbox({PMDmodel: model,PMDfield:'type',msgTarget: titlebar.getItemId()});
                    if (defaultfield)
                        editor.setValue(defaultfield.getValue());                    
                    return editor;
                }                
            }, {
		    
		header: 'Starting Time',
                dataIndex: 'timeFrom',
                flex: 1,
		sortable: false,		
                menuDisabled: true,			    
                getEditor: function(record, defaultfield){
                    //set validation type for the selected type
                    var model=new Ext.data.Model();
                    model.set('type','TIME');
                    var editor=new PMDMeta.view.main.ValidatingTextbox({PMDmodel: model,PMDfield:'type',msgTarget: titlebar.getItemId()});
                    if (defaultfield)
                        editor.setValue(defaultfield.getValue());                    
                    return editor;
                }
            }, {
		    
		header: 'End Date',
                dataIndex: 'dateTo',
                flex: 1,
		sortable: false,		
                menuDisabled: true,			    
                getEditor: function(record, defaultfield){
                    //set validation type for the selected type
                    var model=new Ext.data.Model();
                    model.set('type','DATE');
                    var editor=new PMDMeta.view.main.ValidatingTextbox({PMDmodel: model,PMDfield:'type',msgTarget: titlebar.getItemId()});
                    if (defaultfield)
                        editor.setValue(defaultfield.getValue());                    
                    return editor;
                }
            }, {
		    
		header: 'Starting Time',
                dataIndex: 'timeTo',
                flex: 1,
		sortable: false,		
                menuDisabled: true,			    
                getEditor: function(record, defaultfield){
                    //set validation type for the selected type
                    var model=new Ext.data.Model();
                    model.set('type','TIME');
                    var editor=new PMDMeta.view.main.ValidatingTextbox({PMDmodel: model,PMDfield:'type',msgTarget: titlebar.getItemId()});
                    if (defaultfield)
                        editor.setValue(defaultfield.getValue());                    
                    return editor;
                }
            },{
		header: 'Status',
                dataIndex: 'status',
                flex: 1,
		sortable: false,		
                menuDisabled: true,			    
		editor: new PMDMeta.view.main.ComboBox({
		    store: 'DatasetStatusCombo'	
		})		    
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Date',
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
        });

        this.callParent();

    },
    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();	    
    }    

});
