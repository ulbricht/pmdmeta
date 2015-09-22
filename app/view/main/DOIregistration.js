Ext.define('PMDMeta.view.main.DOIregistration', {
    extend: 'Ext.window.Window',    
    requires: [    ],
    width:600,
    bodyPadding: 10,
    title: 'DOI registration',
	closeAction: 'hide',
    layout: 'fit',
    landingpageurl:'http://pmd.gfz-potsdam.de/',
    landingpagelayout: 'panmetaworks',
    landingpageappendix: '/showshort.php?id=',   
    setup: function(){
            var me=this;
            var itemid="";
            var content=Ext.getStore('Item').getAt(0);
            if (content){
                 var href=content.get('href');
                 if (href){
                     var itemhrefary=href.split("/");
                     if (itemhrefary.length==4){
                        itemid=itemhrefary[3];
                    }
                 }
             } 
             
             var doi=Ext.getStore("DataCiteResource").getAt(0).get("identifier");
             
            var url=me.landingpageurl+me.landingpagelayout+me.landingpageappendix+itemid;
                   
             me.down("[name='doi']").setValue(doi);             
             me.down("[name='item']").setValue(itemid);
             me.down("[name='dataciteurl']").setValue(url);             
    },
     initComponent: function() {
         
         var me=this;
        new PMDMeta.store.publish.Layouts();         
         Ext.apply(me, {
                items: {
                   xtype: 'form',
                   layout:{type:'vbox', align:'stretch'},
                   items: [{
                       xtype: 'textfield',
                       name: 'item',
                       fieldLabel: 'Item',
                       allowBlank: false,
                       hidden:true
                   },{
                       xtype: 'textfield',
                       name: 'doi',
                       readOnly: true,
                       fieldLabel: 'DOI',
                       allowBlank: false
                   },{
                       xtype: 'textfield',
                       name: 'dataciteurl',
                       fieldLabel: 'URL',
                       allowBlank: false
                   },{
                       xtype: 'combobox',
                       name: 'dataciteregistry',
                       fieldLabel: 'Mode',
                       queryMode: 'local',
                       editable: false,
                       forceSelection: true,
                       displayField: 'name',
                       valueField: 'abbr',
                       store: new Ext.data.Store({model:'Ext.data.Model',data:[{abbr:'register', name:'register DOI'},{abbr:'metadata', name:'update DOI metadata'},{abbr:'deactivate', name:'deactivate DOI'}]})
                   },{
                    xtype: 'combobox',
                    store: 'layouts',
                    fieldLabel: 'Layout',
                    emptyText: 'Standard Layout',                    
                    valueField: 'id',
                    displayField: 'id',
                    listeners:{
                        select:function(elem){
                            var value=elem.getValue();
                            if (value && value.length>0){
                                var itemid=me.down("[name='item']").getValue();
                                var url=me.landingpageurl+value+me.landingpageappendix+itemid;
                                 me.down("[name='dataciteurl']").setValue(url);                                  
                            }

                        }
                    }
                }]
               },

               buttons: [{
                   text: 'Do it!',
                   handler: function() {	  



                       var form = me.down('form').getForm();                    
                       if(form.isValid()){                          
                           form.submit({
                               url: 'resources/doi.php?',
                               waitMsg: 'Registering..',
                               success: function(fp, o) {

                                   if (!o.result.success){                                                               
                                       Ext.Msg.alert('DOI registration failed', '' + o.result.message);
                                       return;
                                   }

                                Ext.Msg.alert('Ok', '' + o.result.message);

                               },
                               failure:function(fp, o) {
                                   Ext.Msg.alert('DOI registration failed', '' + o.result.message);
                               }
                           });
                       }           


                   }    
               }]           
         }   );
         
          this.callParent();       
         
         
     }
    
 
});
