/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.SubjectsGCMD6', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Subject',
        'PMDMeta.store.datacite.SubjectGCMD6',
	'PMDMeta.view.main.ComboBox'
    ],
    xtype: 'DataCite-SubjectsGCMD6',
    title: 'NASA GCMD Science Keywords',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.datacite.Subject',
    initComponent: function() {

	var me=this;

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
		listeners: {
		    beforeedit: function(editor,context){
			if (context.field==='subject'){
				me.onAddViaThesaurus(context.grid, context.rowIdx);                                 
			}
			return  false;
		    }
		}
        });

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteSubjectGCMD6',
            columns: [	
		{
		cls: 'PMDrequired',			
                header: 'Apparatus',
                dataIndex: 'subject',
                flex: 1,
		sortable: false,		
		menuDisabled: true,				
                editor: {
                    allowBlank: false,
 		    emptyText: 'click here'
                }
	
            },{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Subject',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }],
            selModel: {
                selType: 'cellmodel'
            }
        });
        this.callParent();
   },
    onAddViaThesaurus:function (grid, rowIndex){
	var me=this;
	if (!me.thesaurus)
	    me.thesaurus=Ext.create('PMDMeta.view.main.ThesaurusWindow');
	me.thesaurus.setThesauruses({thesaurus3: 'eposwp16apparatus'});
        me.thesaurus.setExchangeStore(me.getStore());
        me.thesaurus.show();
    },
    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();	    
    }

});
