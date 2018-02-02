Ext.define('PMDMeta.view.main.CitationWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CitationWindowController',
    control: {
        'toolbar > textfield': {
            change: 'onSearchChange'
        },
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
},
onSearchChange: function( textfield, newValue, oldValue){
    var grid = textfield.up('grid'),
        v;
    try {
        v = new RegExp(newValue, 'i');
        grid.store.filter({
            filterFn: function(node) {
		
		var urlmatch=v.test(node.get('url'));
		var citationmatch=v.test(node.get('citation'));

                var visible= urlmatch || citationmatch;
                return visible;
            },
	    id: 'titleFilter'
        });
    } catch (e) {
        textfield.markInvalid('Invalid regular expression');
    }
}

});

