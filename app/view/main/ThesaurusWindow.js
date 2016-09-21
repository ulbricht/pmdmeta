
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
	}

});
