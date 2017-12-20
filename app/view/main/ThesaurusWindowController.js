Ext.define('PMDMeta.view.main.ThesaurusWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ThesaurusWindowController',
    control: {
        textfield: {
            change: 'onSearchChange'
        },
	'#':{
	   PMDThesaurusChange: 'PMDThesaurusChange'
	}
   },
onSearchChange: function( textfield, newValue, oldValue){
    var tree = textfield.up('treepanel'),
        v,
        matches = 0;
    try {
        v = new RegExp(newValue, 'i');
        tree.store.filter({
            filterFn: function(node) {
                var children = node.childNodes;
                var len = children && children.length;

                    // Visibility of leaf nodes is whether they pass the test.
                    // Visibility of branch nodes depends on them having visible children.

                var ismatched=v.test(node.get('keyword'));
                var visible=node.isLeaf() ? ismatched : false;
                var i;	

                // We're visible if one of our child nodes is visible.
                // No loop body here. We are looping only while the visible flag remains false.
                // Child nodes are filtered before parents, so we can check them here.
                // As soon as we find a visible child, this branch node must be visible.
                for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                if (ismatched && !node.isLeaf()) {
                    matches++;
                }
                return visible;
            },
            id: 'titleFilter'
        });
//					    tree.down('#matches').setValue(matches);
        if (matches<100 && this.getValue().length>0)
            tree.expandAll();						    
    } catch (e) {
        textfield.markInvalid('Invalid regular expression');
    }
},
beforeInit: function(view){
	Ext.create('PMDMeta.store.Thesaurus');	
	this.callParent(arguments);			
},
PMDThesaurusChange: function(thesauruses){
	var store = this.getStore();
	store.getStore().removeAll();
        store.getProxy().extraParams = thesauruses;
	store.load();
}

});

