Ext.define('PMDMeta.store.datacite.combobox.FunderIDCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'FunderIDCombo',
    data: [
			{abbr:'ISNI',name:'ISNI'},
			{abbr:'GRID',name:'GRID'},
			{abbr:'Crossref Funder ID',name:'Crossref Funder ID'},
			{abbr:'Other',name:'Other'}
]});			

				

