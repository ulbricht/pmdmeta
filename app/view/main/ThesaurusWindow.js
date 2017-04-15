
Ext.define('PMDMeta.view.main.ThesaurusWindow',{		
	extend: 'Ext.window.Window',
	requires:['PMDMeta.view.main.ThesaurusPanel'],
        title: 'Thesaurus',
	closeAction: 'hide',		
	items:[
		{
			xtype: 'thesauruspanel'
		}
	],
	setExchangeStore:function(store){
		this.down("thesauruspanel").setExchangeStore(store);
	},
	setThesauruses:function(thesauruses){
		this.down("thesauruspanel").setThesauruses(thesauruses);
	},
	setWalktreeup:function(walktreeup){
		this.down("thesauruspanel").setWalktreeup(walktreeup);
	}
});
