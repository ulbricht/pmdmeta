Ext.define('PMDMeta.view.main.ThesaurusPanel',{
	extend: 'Ext.tree.Panel',
	requires:[ 
		'PMDMeta.store.Thesaurus',
		'PMDMeta.store.ThesaurusCombo',
		'PMDMeta.model.datacite.Subject'
	],
	setExchangeStore:function(store){	
		this.exchangeStore=store;
	},
	setThesauruses:function(thesauruses){
		this.getStore().removeAll();
                this.getStore().getProxy().extraParams = thesauruses;
		this.getStore().load();
	},
	setWalktreeup: function(walktreeup){
		this.walktreeup=walktreeup;
	},
	xtype: 'thesauruspanel',
	initComponent: function (arguments){
		Ext.create('PMDMeta.store.Thesaurus');	
		Ext.create('PMDMeta.store.ThesaurusCombo');
		var me=this;
		
		Ext.apply(this,{
		    walktreeup: true,
		    width: 600,
		    height: 500,
		    rootVisible: false,
		    store: 'Thesaurus',
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
				    var keyword="";
				    var lang="";
				    var thesaurusname="";
				    var thesaurusuri="";




				    if (elem && elem.get && elem.get("keyword") && elem.get("keyword").length >0){
					lang="en";
					thesaurusname=elem.get("thesaurusname");
					thesaurusuri=elem.get("thesaurusuri");

				    }

				    while ( elem  && elem.get && elem.get("keyword")){
					if (elem.get("keyword").length >0 ){
						if (keyword.length >0){
							keyword=" > "+keyword;
						}
						keyword=elem.get("keyword")+keyword;
					}
					if (!me.walktreeup)
						break;	 
					elem=elem.parentNode;
				   }

				   if (keyword.length>0) 
					   me.exchangeStore.insert(0,{"subject":keyword,"lang":lang,"subjectScheme":thesaurusname,"subjectSchemeURI":thesaurusuri});

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
//					    tree.down('#matches').setValue(matches);
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
		this.callParent(arguments);			
	}
});
