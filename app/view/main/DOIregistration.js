Ext.define('PMDMeta.view.main.DOIregistration', {
    extend: 'Ext.window.Window',    
    requires: [    ],
    width:600,
    bodyPadding: 10,
    title: 'DOI registration',
	closeAction: 'hide',
    layout: 'fit',
    setup: function(){
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
             
            var url="http://pmd.gfz-potsdam.de/panmetaworks/showshort.php?id="+itemid;

//         $.ajax({url: 'lookupdoi.php?doi='+doi+'&resolve=1'}).

                   
             this.down("[name='doi']").setValue(doi);             
             this.down("[name='item']").setValue(itemid);
             this.down("[name='dataciteurl']").setValue(url);             
    },
     initComponent: function() {
         
         var me=this;
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


           /*            var xml=Ext.getStore('Item').marshal();
                       Ext.Ajax.request({
                           url: 'resources/doi.php',	
                           method: 'POST',
                           params:{
                               mailcontent: xml
                           },                                                        
                           success: function(response, opts) {
                               var responseData = Ext.decode(response.responseText);
                               if(!responseData.success) {
                                   Ext.Msg.show({
                                       title: 'Submit mail',
                                       msg: 'Submission failed. Please save the XML file and send it via mail.',
                                       icon: Ext.Msg.ERROR,
                                       buttons: Ext.Msg.OK
                                   });
                               }else{
                                   Ext.Msg.show({
                                       title: 'Submit mail',
                                       msg: 'Submission mail sent successfully.',
                                       icon: Ext.Msg.INFO,
                                       buttons: Ext.Msg.OK
                                   });
                               }
                           },
                           failure: function(response, opts) {
                             console.log('server-side failure with status code ' + response.status);
                           }            
                       });*/
                   }    
               }]           
         }   );
         
          this.callParent();       
         
         
     }
    
 
});
