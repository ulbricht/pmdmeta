/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.main.Files', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.store.escidoc.Files',
        'PMDMeta.store.escidoc.Mimetypes'
    ],
    xtype: 'Files',
    layout: 'fit',
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        new PMDMeta.store.escidoc.Mimetypes();
        
        Ext.apply(this, {
            //height: 200,
	//	width: 500,
            plugins: [this.cellEditing],
            store: 'Files',
            columns: [
		{
                header: 'Filename',
                dataIndex: 'name',
		sortable: false,	
                menuDisabled: true,	
                flex: 1,
                 renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The name of the file on a hard disk. It will be used when somebody wants to download data and it ";
                    qtip+=" will be displayed on the download page if there is no <b>Visible name </b> present.";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                 },
                 editor:{
                    allowBlank: false
                 }
            },{
                header: 'Visible name',
                dataIndex: 'description',
		sortable: false,	
                menuDisabled: true,	
                flex: 1,
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The <b>Visible name</b> is used to display a more declarative name for a filename. ";
                    qtip+="Leaving this blank will display the Filename on the download page.";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                },
                 editor:{
                    allowBlank: true
                 }               
            },{
                header: 'visibility',
                dataIndex: 'visibility',
		sortable: false,	
                menuDisabled: true,
		editor: new PMDMeta.view.main.ComboBox({
		    store: new Ext.data.Store({model:  'PMDMeta.model.Combobox',data:[{abbr:'public', name:'public'},{abbr:'private', name:'private'}]})	
		}),                
                width: 70,
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The visibility can be used in case of embargos or for non-public datasets.";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }      
            },{
                header: 'Embargo until',
                dataIndex: 'available',
		sortable: false,	
                menuDisabled: true,             
                xtype: 'datecolumn',   
                format:'Y-m-d',
                flex:1,
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                },              
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="Place here a date at which the datasets will be available to the public.";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }     
            },{
                header: 'Size',
                dataIndex: 'size',
		sortable: false,	
                menuDisabled: true,	
                width: 100,
                editor: {
                    allowBlank: false,
                    vtype: 'intval'                    
                },                
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="a numeric byte value";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }                
            },{
                header: 'MimeType',
                dataIndex: 'type',
		sortable: false,	
                menuDisabled: true,
		editor: new PMDMeta.view.main.ComboBox({
		    store: 'Mimetypes',
                    editable: true,
                    typeAhead: true
		}),                 
		flex: 1,
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The mime-type influences what a browser will do with a file by making a hint about the file's content.";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }                   
            },{
                header: 'Storage',
                dataIndex: 'storage',
		sortable: false,	
                menuDisabled: true,                               
		width: 130,
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="Files uploaded through this formular are <b>internally-managed</b> by the eSciDoc repository. For large files (or for other reasons) it is";
                        qtip+=" also possible to point to an <b>external-url</b> location. External locations should be entered in the content field to the right.";                    
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }                      
            },{
                header: 'Content',
                dataIndex: 'content',
		sortable: false,	
                menuDisabled: true,	
		flex: 1,
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="In case of <b>external-url</b> storage this field contains the external URL (Website or FTP).";
                    qtip+=" For internally managed objects the content of this field is generated by the repository."
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }                  
            },{
                header: 'Status',
                dataIndex: 'href',
		sortable: false,	
                menuDisabled: true,	
                width: 120,            
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    if (value.length>0)
                        return "stored on server";
                    else
                        return "please sync";
                }                   
            },{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Unqueue File',
                    scope: this,
                    handler: this.onRemoveClick
                }]
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
 //       this.getStore().load();
    },
    onRemoveClick: function(grid, rowIndex){
        this.getStore().removeAt(rowIndex);
    }
});
