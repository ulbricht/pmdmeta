Ext.define('PMDMeta.store.datacite.combobox.TitletypeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'TitletypeCombo',
    data: [
					{'abbr':'AlternativeTitle','name':'Alternative Title'},	
					{'abbr':'Subtitle','name':'Subtitle'},	
					{'abbr':'TranslatedTitle','name':'Translated Title'}						

]});			

