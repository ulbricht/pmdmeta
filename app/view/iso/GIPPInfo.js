/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.iso.GIPPInfo', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.iso.GIPPInfoHelper',
	'PMDMeta.store.iso.GIPPInfoHelper'
    ],
    xtype: 'GIPPInfo',  
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

    layout: 'fit',	
        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: 'GIPPInfoHelper',
            columns: [
	    {
		cls: 'PMDrequired',
                header: 'Project Name',
                dataIndex: 'projectname',
                flex: 1,    
		sortable: false,		
                menuDisabled: true,			    
                editor: {
                    allowBlank: false
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="Project name according to GIPP application";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }
            }, {
		cls: 'PMDrequired',                
                header: 'GIPP Grant Number',
                dataIndex: 'grantnumber',
                flex: 1,
		sortable: false,		
                menuDisabled: true,			    
                editor: {
                    allowBlank: false
                }
            },{		    
                header: 'FDSN network code',
                dataIndex: 'fdsncode',
                flex: 1, 
		sortable: false,		
                menuDisabled: true,			    
                editor: {
                    allowBlank: false
                },
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="FDSN network code for seismological networks; if applicable";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }                
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
        var rec = Ext.create('PMDMeta.model.iso.GIPPInfoHelper');

        var store=this.getStore();
        if (store.getCount()==0)
            store.insert(0, rec);    
    }
});
