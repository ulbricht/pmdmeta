Ext.define('PMDMeta.view.main.CheckComboBox', {
    extend: 'PMDMeta.view.main.ComboBox',
    xtype: 'PMD-CheckComboBox',
    multiSelect: 'true',
    listConfig : {          
        getInnerTpl : function() {
            return '<div class="x-combo-list-item" data-qtip="{name}: {qtip}"><img src="' + Ext.BLANK_IMAGE_URL + '" class="chkCombo-default-icon chkCombo" /> {name} </div>';
        }
    }
});
