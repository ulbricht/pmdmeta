Ext.define('PMDMeta.view.main.ThesaurusPanel',{
    extend: 'Ext.tree.Panel',
    requires:[ 
        'PMDMeta.store.Thesaurus'
    ],
    setExchangeStore:function(store){   
        this.exchangeStore=store;
    },
    xtype: 'thesauruspanel',
    initComponent: function(){
        var thesaurusList = this.up("thesauruswindow").getThesaurusList();
        var thesaurusParams = {};
        for (var i=0; i<thesaurusList.length; i++) {
            thesaurusParams['thesaurus' + (i+1)] = thesaurusList[i];
        }
        Ext.create("PMDMeta.store.Thesaurus", {proxy: {extraParams:thesaurusParams}});
        var me=this;

        Ext.apply(this,{
            width: 600,
            height: 500,
            rootVisible: false,
            store: "Thesaurus",
            columns: [
                { xtype: 'treecolumn', header: 'Name', dataIndex: 'name', flex: 1 },
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: 'resources/images/icons/fam/add.gif',
                        tooltip: 'Add Keyword',
                        scope: me,
                        handler: function(grid, rowIndex){
                            var elem=grid.getStore().getAt(rowIndex);
                            if (elem.get("keyword") && elem.get("keyword").length >0)
                                me.exchangeStore.insert(0,{"subject":elem.get("keyword"),
                                                           "lang":"en",
                                                           "subjectScheme":elem.get("thesaurusname"),
                                                           "subjectSchemeURI":elem.get("thesaurusuri"),
                                                           "codeListValue":elem.get("codelistvalue")}
                                                        );
                                                        }
                    }]
                }
            ],
            tbar:[
            '->',
            {
                labelWidth: 130,
                xtype: 'textfield',
                fieldLabel: 'Filter on keyword',
                triggers:{
                    clearfield:{
                        cls: 'x-form-clear-trigger',
                        handler: function() {
                           var store = this.up('treepanel').store;
                           this.reset();
                           store.clearFilter();
                           this.focus();
                       }               

                   }
               },
               listeners: {
                change: function() {
                    var tree = this.up('treepanel'),
                    v,
                    matches = 0;
                    try {
                        v = new RegExp(this.getValue(), 'i');
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

                        if (matches<100 && this.getValue().length>0)
                            tree.expandAll();                           
                    } catch (e) {
                        this.markInvalid('Invalid regular expression');
                    }
                }
            }
        }  
        ]
    });


        this.callParent([]);    
    }

});
