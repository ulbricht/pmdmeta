Ext.define('PMDMeta.view.main.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'PMD-ComboBox',
    triggerAction: 'all',
    displayField: 'name',
    valueField: 'abbr',	
//    typeAhead: true,
    editable: false,    
    queryMode: 'local',
    emptyText: 'please choose',
    listConfig: {
		getInnerTpL: function () {return '<div data-qtip="{name}: {qtip}">{name}</div>';}
    },
    initComponent: function() {
        var me=this;
        this.callParent();    
        if (me.multiSelect){ //multi selection in a grid comes as delimited string
            me.on('expand',function (){
                    var value=me.getValue(); 
                    if (Array.isArray(value) && value.length==1){
                        me.setValue(me.value[0].split(me.delimiter.trim()));
                    }
                }
            );
        }
    }
    });
