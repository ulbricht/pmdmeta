
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
	setModel:function(thesaurusname,model){
		this.down("thesauruspanel").setModel(thesaurusname,model);
	}

});