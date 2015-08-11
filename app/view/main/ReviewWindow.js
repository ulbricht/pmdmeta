
Ext.define('PMDMeta.view.main.ReviewWindow',{		
    extend: 'Ext.window.Window',
    title: 'Manage Reviewlinks',
    closeAction: 'hide',
    width:600,
    height: 200,
    requires: [
        'PMDMeta.view.main.ReviewGrid'
    ],        
    layout: 'fit',    
    items: [{
          xtype: 'ReviewGrid'
        }],
    listeners:{
        beforeshow: function(){
            Ext.getStore('reviews').reload();
        }
    }

});
