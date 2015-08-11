Ext.define('PMDMeta.store.datacite.combobox.RightsCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.ComboboxURI',
    storeId: 'RightsCombo',
    data: [
					{abbr:'CC0 Universal 1.0', name:'CC0 1.0 Universal', uri:'http://creativecommons.org/publicdomain/zero/1.0/'},		
					{abbr:'CC BY 4.0', name:'CC Attribution 4.0 (CC BY 4.0)', uri:'http://creativecommons.org/licenses/by/4.0/'},	
					{abbr:'CC BY 3.0', name:'CC Attribution 3.0 (CC BY 3.0)', uri:'http://creativecommons.org/licenses/by/3.0/'},	
//					{abbr:'CC BY 2.5', name:'CC Attribution 2.5 (CC BY 2.5)', uri:'http://creativecommons.org/licenses/by/2.5/'},						
//					{abbr:'CC BY 2.0', name:'CC Attribution 2.0 (CC BY 2.0)', uri:'http://creativecommons.org/licenses/by/2.0/'},
//					{abbr:'CC BY 1.0', name:'CC Attribution 1.0 (CC BY 1.0)', uri:'http://creativecommons.org/licenses/by/1.0/'},					
					{abbr:'CC BY-SA 4.0', name:'CC Attribution-ShareAlike 4.0 (CC BY-SA 4.0)', uri:'http://creativecommons.org/licenses/by-sa/4.0/'},	
					{abbr:'CC BY-SA 3.0', name:'CC Attribution-ShareAlike 3.0 (CC BY-SA 3.0)', uri:'http://creativecommons.org/licenses/by-sa/3.0/'}
//					{abbr:'CC BY-SA 2.5', name:'CC Attribution-ShareAlike 2.5 (CC BY-SA 2.5)', uri:'http://creativecommons.org/licenses/by-sa/2.5/'},						
//					{abbr:'CC BY-SA 2.0', name:'CC Attribution-ShareAlike 2.0 (CC BY-SA 2.0)', uri:'http://creativecommons.org/licenses/by-sa/2.0/'},
//					{abbr:'CC BY-SA 1.0', name:'CC Attribution-ShareAlike 1.0 (CC BY-SA 1.0)', uri:'http://creativecommons.org/licenses/by-sa/1.0/'}
]});			

