Ext.define('PMDMeta.view.datacite.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PanelController',
    control: {
        actioncolumn: {
            itemClick: 'onRemoveClick'
        }
   },
beforeInit: function(view){
        Ext.create('PMDMeta.store.datacite.combobox.DescriptiontypeCombo');
	this.callParent(arguments);			
},
onRemoveClick: function(grid, rowIndex){
	grid.getStore().removeAt(rowIndex);
	grid.newEntry();	    
}

});

