/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.ResourceOpt', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.ResourceOpt',
	'PMDMeta.store.datacite.ResourceOpt',
	'PMDMeta.store.datacite.combobox.ResourcetypeGeneralCombo',
	'PMDMeta.store.datacite.combobox.LanguageCombo',
	'PMDMeta.view.main.ComboBox'	
    ],
    xtype: 'DataCite-ResourceOpt',
    layout: 'fit',	
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
	
	Ext.create('PMDMeta.store.datacite.combobox.LanguageCombo');	
	Ext.create('PMDMeta.store.datacite.combobox.ResourcetypeGeneralCombo');	
        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: 'DataCiteResourceOpt',
            columns: [
		{
		cls: 'PMDrequired',			
                header: 'Resource Type General',
                dataIndex: 'resourceTypeGeneral',
		sortable: false,		
                menuDisabled: true,			
                width: 180,
                editor: new PMDMeta.view.main.ComboBox({
		    store: 'ResourcetypeGeneralCombo'
		})
            },{
                header: 'Resource Type',
                dataIndex: 'resourceType',
		sortable: false,		
                menuDisabled: true,		    
                flex: 2,
                editor: {
                    allowBlank: true
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The format for this field is open, but the preferred format is a single term of some detail so that a pair can be formed with <i>Resource Type General</i>, e.g.";
                    qtip+=" to to express a Dataset is Census Data, use Dataset in the <i>Resource Type General</i> field  and Census Data in the <i>Resource Type</i> field. <b>If unsure leave blank.</b>";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }
            },{
                header: 'Resource Version',
                dataIndex: 'version',
		sortable: false,		
                menuDisabled: true,			    
                flex: 1,
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
                header: 'Language',
                dataIndex: 'language',   
                width: 130,
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
        var rec = Ext.create('PMDMeta.model.datacite.ResourceOpt');

        var store=this.getStore();
        if (store.getCount()==0)
            store.insert(0, rec);	    
    }
});
