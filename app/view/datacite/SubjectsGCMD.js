/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.SubjectsGCMD', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Subject',
        'PMDMeta.store.datacite.SubjectGCMD',
	'PMDMeta.view.main.ComboBox'
    ],
    xtype: 'DataCite-SubjectsGCMD',
    title: 'NASA GCMD Science Keywords',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.datacite.Subject',
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteSubjectGCMD',
            columns: [
		{
		xtype: 'actioncolumn',
		width: 30,
		sortable: false,
		menuDisabled: true,
		items: [{
		    icon: 'resources/images/icons/fam/page_white_edit.png',
		    tooltip: 'Add via Thesaurus',
		    scope: this,
		    handler: this.onAddViaThesaurus
		}]
		},		
		{
		cls: 'PMDrequired',			
                header: 'Keyword',
                dataIndex: 'subject',
                flex: 2,
		sortable: false,		
		menuDisabled: true,				
                editor: {
                    allowBlank: false,
                    editable: false
                }	
            },{
                header: 'Thesaurus',
                dataIndex: 'subjectScheme',
		flex: 1,
		sortable: false,		
		menuDisabled: true,			    
                editor: {
                    allowBlank: false,
                    editable: false
                }	
            },{
                header: 'Scheme URI',
                dataIndex: 'subjectSchemeURI',
                width: 130,					    
		sortable: false,		
		menuDisabled: true,
		hidden:true,	
                editor: {
                    allowBlank: false,
                    editable: false
                }	
            },{
                header: 'Language',
                dataIndex: 'lang',   
                width: 130,
		hidden:true,	
		sortable: false,		
		menuDisabled: true,			    
                editor: {
                    allowBlank: false,
                    editable: false
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
	me.thesaurus.setThesauruses({thesaurus3: 'gcmd'});
	me.thesaurus.setWalktreeup(false);
        me.thesaurus.setExchangeStore(me.getStore());
        me.thesaurus.show();
    },
    onRemoveClick: function(grid, rowIndex){
        var me=this;
	me.getStore().removeAt(rowIndex);
	me.newEntry();	    
    }

});
