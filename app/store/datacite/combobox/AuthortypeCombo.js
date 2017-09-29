Ext.define('PMDMeta.store.datacite.combobox.AuthortypeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'AuthortypeCombo',	
    data: [
    				{abbr:'Author',name:'Author', qtip:'The primary author of the dataset.'},
					{abbr:'CoAuthor',name:'Co-Author', qtip:'A co-author of the dataset.'},
					{abbr:'Editor',name:'Editor', qtip:'A person who oversees the details related to the publication format of the resource. Note: if the Editor is to be credited in place of multiple authors, the Editor\'s name may be supplied as Author, with &quot;(Ed.)&quot; appended to the name. '}
			]				
});
