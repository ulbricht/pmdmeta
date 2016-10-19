/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.ResourceOptAndTitle', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.ResourceOptAndTitle',
	'PMDMeta.store.datacite.ResourceOptAndTitle',
	'PMDMeta.store.datacite.combobox.ResourcetypeGeneralCombo',
	'PMDMeta.store.datacite.combobox.LanguageCombo',
	'PMDMeta.store.datacite.combobox.TitletypeCombo',        
	'PMDMeta.view.main.ComboBox'	
    ],
    xtype: 'DataCite-ResourceOptAndTitle',
    layout: 'fit',	
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
	
	Ext.create('PMDMeta.store.datacite.combobox.LanguageCombo');	
	Ext.create('PMDMeta.store.datacite.combobox.ResourcetypeGeneralCombo');	
        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: 'DataCiteResourceOptAndTitle',
            columns: [
		{
		cls: 'PMDrequired',			
                header: 'Resource Type',
                dataIndex: 'resourceTypeGeneral',
		sortable: false,		
                menuDisabled: true,			
                width: 180,
                editor: new PMDMeta.view.main.ComboBox({
		    store: 'ResourcetypeGeneralCombo'
		})
            },{
		cls: 'PMDrequired',                
                header: 'Title',
                dataIndex: 'title',
		sortable: false,		
                menuDisabled: true,		    
                flex: 2,
                editor: {
                    allowBlank: false
                }
            },{
                header: 'Title Type',
                dataIndex: 'titleType',
                width: 130,
		sortable: false,		
		menuDisabled: true,	
		editor: new  PMDMeta.view.main.ComboBox({
 		    store: 'TitletypeCombo'
                }),
                hidden: true
            },{
                header: 'Version',
                dataIndex: 'version',
		sortable: false,		
                menuDisabled: true,			    
                width: 80,
                editor: {
                    allowBlank: true
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The suggested practice is to use a pair of <i>major_version.minor_version</i> to indicate changes in the dataset. Major changes typically require registration of a new DOI.";
                    qtip+="  <b>If unsure leave blank.</b>";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }		    
            },{
                header: 'Language of dataset',
                dataIndex: 'language',   
                width: 170,
		sortable: false,		
                menuDisabled: true,			    
                editor: new PMDMeta.view.main.ComboBox({
                    store: 'LanguageCombo'
		})
            }],
            selModel: {
                selType: 'cellmodel'
            }
        });

        this.callParent();

        if (Ext.supports.Touch) {
            this.addDocked({
                xtype: 'header',
                title: '<b>Note that cell editing is not recommeded on keyboardless touch devices.</b>'
            });
        }

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });
    },

    loadStore: function() {
     //   this.getStore().load();
        var rec = Ext.create('PMDMeta.model.datacite.ResourceOptAndTitle');
        var store=this.getStore();
        if (store.getCount()==0)
            store.insert(0, rec);
        /*this.cellEditing.startEditByPosition({
            row: 0,
            column: 0
        });	    */
    }
});
