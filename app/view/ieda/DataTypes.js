/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.ieda.DataTypes', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'PMDMeta.model.ieda.DataTypesModel',
        'PMDMeta.store.ieda.DataTypes',
        'PMDMeta.view.main.ComboBox'
    ],
    xtype: 'IEDA-DataTypes',
    title: 'IEDA Data Types',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.ieda.DataTypesModel',
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataTypes',
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
                header: 'Keyword',
                dataIndex: 'subject',
                flex: 1,
                sortable: false,        
                menuDisabled: true,             
                editor: {
                    allowBlank: false,
                    editable: false
                }   
            },{
                header: 'Scheme',
                dataIndex: 'subjectScheme',
                width: 130,
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
                editor: {
                    allowBlank: false,
                    editable: false
                }   
            },{
                header: 'Language',
                dataIndex: 'lang',   
                width: 130,
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
        if (!me.thesaurus) {
            me.thesaurus=Ext.create('PMDMeta.view.main.ThesaurusWindow', {
                                    thesaurusList: me.thesaurusList});
        }
        me.thesaurus.setExchangeStore(me.getStore());
        me.thesaurus.show();
    },
    onRemoveClick: function(grid, rowIndex){
        var me=this;
        me.getStore().removeAt(rowIndex);
        me.newEntry();      
    }
});
