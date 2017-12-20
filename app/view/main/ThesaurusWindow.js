
Ext.define('PMDMeta.view.main.ThesaurusWindow',{		
	extend: 'Ext.window.Window',
	requires:['PMDMeta.view.main.ThesaurusWindowController', 'Ext.tree.Panel'],
        title: 'Thesaurus',
	closeAction: 'hide',
	controller: 'ThesaurusWindowController',		
	items:[
		{
		    xtype: 'treepanel',
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
                                handler: function(grid, rowIndex){
				    var store=grid.getStore();
                                    var elem=store.getAt(rowIndex);
				    if (elem && elem.get("keyword").length >0){
				   	 var keyword={};
					 keyword["subject"]=elem.get("keyword");
					 keyword["lang"]="en";
					 keyword["subjectScheme"]=elem.get("thesaurusname");
					 keyword["subjectSchemeURI"]=elem.get("thesaurusuri");
				   	 this.up('window').fireEvent('PMDnewThesaurusSubject',keyword);
				    }
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
                            }
                        }  
		    ]
		}
	]

});
