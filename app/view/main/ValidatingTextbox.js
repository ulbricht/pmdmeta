Ext.define('PMDMeta.view.main.ValidatingTextbox', {
    extend: 'Ext.form.field.Text',
    xtype: 'validatingtextbox',
    validateOnChange:false, //we validate on our own
    allowBlank: false,
    initComponent: function() {
        var me=this;
              
        this.callParent();      
        me.on('change',function(elem, newValue, oldValue, eOpts){
                    me.fireEvent('PMDvalidate');
                });
        me.on('PMDvalidate',function(){
                    var vtypes=Ext.form.field.VTypes;
                    var vtype=me.PMDmodel.get(me.PMDfield);
                    var errdisplay=Ext.getCmp(me.msgTarget);
                 
                    if (!vtype){
                        errdisplay.setVisible(!isValid);   
                        me.markInvalid("Please select type of the identifier to the left!");
                        return;
                    }
                    
                    //reading the value allows to fire change event on focus
                    var newValue=me.getValue();

                    var isValid=vtypes[vtype](newValue);                    
                    var message=vtypes[vtype +'Text'];
                    errdisplay.setVisible(!isValid);
                    if (isValid)
                        me.clearInvalid();
                    else
                        me.markInvalid(message);
                    
                    me.PMDmodel.set('identifier',newValue);
                })
                
        me.on('blur',function (elem,event,eOpts){
                    Ext.getCmp(me.msgTarget).setVisible(false);
                    me.clearInvalid();
                });
        me.on('focus', function (){
                    me.fireEvent('PMDvalidate');              
                })

    },
    setPMDmodel: function(model){
        this.PMDmodel=model;
    }

});

