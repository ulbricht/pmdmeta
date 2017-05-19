Ext.define('PMDMeta.store.datacite.combobox.PublisherCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'PublisherCombo',
    data: [
			{abbr:'IEDA Hub',name:'IEDA Hub'},
			{abbr:'ECL',name:'EarthChem Library'},
			{abbr:'MGDS',name:'Marine Geoscience Data System'},
			{abbr:'USAP-DC',name:'United States Antarctic Program Data Center'}

]});			

				

