Ext.define('PMDMeta.store.publish.ValidationResult', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.publish.Htmlcontent',
    storeId: 'validationresult',
    data: [{xml: ""}]
});