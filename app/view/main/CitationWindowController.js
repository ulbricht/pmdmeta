Ext.define('PMDMeta.view.main.CitationWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CitationWindowController',
    control: {
	'#':{
	   RemoveItem: 'RemoveItem',
	   show: 'reload'
	}
   },
beforeInit: function(view){
	Ext.create('PMDMeta.store.Citation');	
	this.callParent(arguments);
},
RemoveItem: function(grid,rowIndex){
	grid.getStore().removeAt(rowIndex);
},
reload: function(window){
	window.down("grid").getStore().load();
}

});

