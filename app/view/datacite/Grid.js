/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Grid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*'
    ],
    xtype: 'DataCite-Grid',
    title: 'Authors',
    frame: true,
    layout: 'fit',
    numEntries: -1, 
    initComponent: function() {
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
	var me=this;
	me.newEntry();
	var store=me.getStore();
	store.on('update', me.newEntry,me);
	store.on('datachanged', me.newEntry,me);	    
    },    
    newEntry: function(){
	var me=this;
	var store=me.getStore();
        if (me.delimiter){
            var model=store.getAt(store.getCount()-1);
            if (model && model.get('subject') && model.get('subject').length>0){
                var elemsstring=model.get('subject');
                var elems=elemsstring.split(me.delimiter);
                store.suspendEvents(false);
                model.set('subject',elems.shift().trim());                
                Ext.each(elems,function(elem){
                    var newmodel=model.copy(null);
                    newmodel.set('subject',elem.trim());
                    store.add(newmodel);
                });
                store.resumeEvents();
            }
        }
	var invalidexists=false;
        store.each(function(model){
		if (!invalidexists && !model.isValid())
			invalidexists=true;			
	});
	if (!invalidexists && (me.numEntries<0 || (me.numEntries>0 && store.getCount()<me.numEntries)))
		me.onAddClick();		    
    },    
    onAddClick: function(){
        // Create a model instance
	var me=this;
        var rec = Ext.create(me.modelname);
        this.getStore().add(rec);
     }
    
});
