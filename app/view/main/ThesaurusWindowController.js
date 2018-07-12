Ext.define('PMDMeta.view.main.ThesaurusWindowController', {
    extend: 'Ext.app.ViewController',
    requires: ['PMDMeta.store.Thesaurus'],
    alias: 'controller.ThesaurusWindowController',
    control: {
        textfield: {
            change: 'onSearchChange',
	    keyup: 'expandifenter'
        },
	'#':{
	   PMDThesaurusChange: 'PMDThesaurusChange'
	}
   },
expandifenter: function (textfield, event, eOpts ){
    var tree = textfield.up('treepanel');
    if (event.getKey()==event.ENTER)
	tree.expandAll();
},
onSearchChange: function( textfield, newValue, oldValue){
    var tree = textfield.up('treepanel');

    if (textfield.getValue().length==0){
	tree.store.clearFilter();
	tree.collapseAll();
	return;
    }else if (textfield.getValue().length <3){
	return;	
    }

    var matchednodes={};
    var matchedparents={};
    var matchedchildren={};
    var casecadenodes={};
    try {

	var v = new RegExp(newValue, 'i');
	tree.store.getRoot().cascadeBy(function(node){
		if (v.test(node.get('keyword')) || v.test(node.get('qtip'))){
			matchednodes[node.getId()]=node;
			if (!node.isLeaf()){
				casecadenodes[node.getId()]=node;
			}
		}
	});

	for (var nodeid in matchednodes){
		var node=matchednodes[nodeid];
		for (var parent=node.parentNode;parent!=null;parent=parent.parentNode){
			matchedparents[parent.getId()]=true;
			//do not cascade subsets
			if (matchednodes[parent.getId()])
				casecadenodes[nodeid]=false;					
		}
	}

	for (var nodeid in casecadenodes){
		var cascadenode=casecadenodes[nodeid];
		if (cascadenode){
			cascadenode.cascadeBy(function(node){
				matchedchildren[node.getId()]=true;
			});
		}
	}

        tree.store.filter({
            filterFn: function(node) {	
		if (matchednodes[node.getId()] ||
			matchedparents[node.getId()] ||
			matchedchildren[node.getId()]){
			return true;
		}
            },
            id: 'titleFilter'
        });
        if (Object.keys(matchednodes).length<500 && textfield.getValue().length>0){
		tree.expandAll();
	}

    } catch (e) {
        textfield.markInvalid('Invalid regular expression');
    }
},
beforeInit: function(view){
	Ext.create('PMDMeta.store.Thesaurus');	
	this.callParent(arguments);			
},
PMDThesaurusChange: function(thesauruses){
	var panel=this.getView().down('treepanel');
	var store = panel.getStore();
	store.removeAll();
        store.getProxy().extraParams = thesauruses;
	store.load();
}

});

