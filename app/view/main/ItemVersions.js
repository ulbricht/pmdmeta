 
Ext.define('PMDMeta.view.main.ItemVersions', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'ItemVersions',		
    requires: [
	'PMDMeta.store.escidoc.ItemVersions'
    ],
    title: 'Versions',
    frame:true,  
    displayField: 'name',
    labelWidth:45,
    width:'100%',
    fieldLabel: 'Version',
    valueField: 'href',	
    initComponent: function() {
        Ext.apply(this, {	
            store: new PMDMeta.store.escidoc.ItemVersions()
        });

        this.callParent();
    },
    displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{name}', '</tpl>'),
    listeners:{
        change: function( elem, newValue, oldValue, eOpts ){
            Ext.getStore('Item').insert(0,{href:newValue});   
        }
        
    }
	
});
