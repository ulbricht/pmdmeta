Ext.define('PMDMeta.view.main.ThesaurusPanel',{
	extend: 'Ext.tree.Panel',
	requires:[ 
		'PMDMeta.store.Thesaurus',
		'PMDMeta.store.ThesaurusCombo',
		'PMDMeta.model.datacite.Subject'
	],
	setModel:function(thesaurusname,model){	
		this.model=model;
	//	this.down('combobox').setValue(thesaurusname);
	},
	xtype: 'thesauruspanel',
	initComponent: function (arguments){
		Ext.create('PMDMeta.store.Thesaurus');	
		Ext.create('PMDMeta.store.ThesaurusCombo');
		var me=this;
		
		Ext.apply(this,{
		    width: 600,
		    height: 500,
		    rootVisible: false,
		    autoLoad:false,
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
                                    var thesaurusstore=Ext.getStore('ThesaurusCombo');
                                    var combobox=grid.up('treepanel').down('radio');
                                    var thesaurus=combobox.getGroupValue();
                                    var thesaurusentity=thesaurusstore.getById(thesaurus);
                                    me.model.beginEdit();
                                    me.model.set("subject",elem.get("keyword"));
                                    me.model.set("lang","en");					
                                    me.model.set("subjectScheme",thesaurus);		
                                    me.model.set("subjectSchemeURI",thesaurusentity.get('uri'));						
                                    me.model.endEdit();
                                }
                            }]
			}
		    ],
		    tbar:[
                        {
                            xtype      : 'fieldcontainer',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1,		
                            listeners:{
                                change: function (elem,newValue, oldValue, eOpts ){	
                                        newValue=elem.getGroupValue();
                                        var thesaurus=this.up('treepanel').store;
                                        thesaurus.getProxy().getExtraParams().thesaurus=newValue;
                                        thesaurus.clearFilter();
                                        thesaurus.removeAll();
                                        thesaurus.load();

                                    }
                                }
                            },
                            layout: 'vbox',
                            items: [              
                                {
                                    boxLabel  : 'GEMET Thesaurus (INSPIRE)',
                                    name      : 'thesaurus',
                                    inputValue: 'GEMET'
                                }, {
                                    boxLabel  : 'NASA GCMD Science Keywords',
                                    name      : 'thesaurus',
                                    inputValue: 'GCMD'
 //                                   ,qtip:'The GCMD vocabulary is developed and maintained by: Olsen, L.M., G. Major, K. Shein, J. Scialdone, S. Ritz, T. Stevens, M. Morahan, A. Aleman, R. Vogel, S. Leicester, H. Weir, M. Meaux, S. Grebas, C.Solomon, M. Holland, T. Northcutt, R. A. Restrepo, R. Bilodeau, 2013. NASA/Global Change Master Directory (GCMD) Earth Science Keywords. Version 8.0.0.0.0'
                                }
                            ]

                        },
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
                                },
                                buffer: 250
                            }
                        }  
		    ]
		});
		this.callParent(arguments);			
	}
});