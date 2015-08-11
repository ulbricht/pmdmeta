/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.main.ReviewGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.publish.Review',
        'PMDMeta.store.publish.Reviews'
    ],
    xtype: 'ReviewGrid',
    layout: 'fit',
    initComponent: function() {
        var me=this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        new PMDMeta.store.publish.Reviews();
        
        Ext.apply(Ext.getStore('reviews').getProxy().extraParams, {
            id: me.getEscidocItemId()
        });                        

//        Ext.getStore('reviews').reload();

        Ext.apply(this, {
            height: 300,
            plugins: [this.cellEditing],
            store: 'reviews',
            columns: [
	    {
                header: 'Web Link',
                dataIndex: 'href',
                flex: 1,
		sortable: false,	
                menuDisabled: true,		    
                editor: {
                    allowBlank: false
                }
            },{
                header: 'id',
                dataIndex: 'id',
                flex: 1,
		sortable: false,	
                menuDisabled: true,		    
                editor: {
                    allowBlank: false
                },
                hidden: true
            },{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/application_go.png',
                    tooltip: 'Preview',
                    scope: this,
                    handler: this.onPreview
                }]
            },{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Review Link',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }],
            tbar:[
                {
                    xtype: 'button',
                    buttonOnly: true,
                    hideLabel:true,            
                    text: 'Add Review',            
                    margin: '5 5 5 5',
                    listeners: {
                        click: function() {
                            me.onAddClick();
                        }
                    }
                }
            ]
       
        });

        this.callParent();

    },
    onRemoveClick: function(grid, rowIndex){
        var me=this;        
        var model=me.getStore().getAt(rowIndex);
        var id=model.get("id");

        var progress=Ext.Msg.wait('Please wait', "deleting review");        
        Ext.Ajax.request({
            url: 'resources/reviewdelete.php?dir='+id+'&item='+me.getEscidocItemId(),	
            success: function(response, opts) {

                progress.close();                    
                var responseData = Ext.decode(response.responseText);
                if (!responseData.success){
                    Ext.Msg.show({
                        title: 'Error',
                        msg: "Can not delete review.<br>"+responseData.message,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });                                    
                }
                Ext.getStore('reviews').reload();
           },
           failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                progress.close();   
                Ext.getStore('reviews').reload();
           }            
        });        
    },
    onPreview: function(grid, rowIndex){
        var me=this;        
        var model=me.getStore().getAt(rowIndex);
        var href=model.get("href");
        window.open(href,"_blank");
    },
    onAddClick:function(){
        var me=this;
        var progress=Ext.Msg.wait('Please wait', "creating review");        
        Ext.Ajax.request({
            url: 'resources/reviewcreate.php?item='+me.getEscidocItemId(),	
            success: function(response, opts) {
                progress.close();                    
                var responseData = Ext.decode(response.responseText);
                if (!responseData.success){
                    Ext.Msg.show({
                        title: 'Error',
                        msg: "Can not create review.<br>"+responseData.message,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });                                    
                }
               Ext.getStore('reviews').reload();                
           },
           failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                progress.close();
                Ext.getStore('reviews').reload();
           }            
        });         
        
        
    },
    getEscidocItemId: function(){
        var item=Ext.getStore('Item').getAt(0);
        if (!item) return;
        var itemhref=item.get("href");
        if (!itemhref) return;
        var itemid=itemhref.substr(itemhref.lastIndexOf("/")+1,itemhref.length-1);
        if (!itemid) return;       
        return itemid;
    }
    
});

