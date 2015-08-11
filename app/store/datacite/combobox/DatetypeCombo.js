Ext.define('PMDMeta.store.datacite.combobox.DatetypeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'DatetypeCombo',
    data: [
					{abbr:'Accepted',name:'Accepted', qtip:'The date that the publisher accepted the resource into their system. (To indicate the start of an embargo period, use Submitted or Accepted, as appropriate. )'},	
					{abbr:'Available',name:'Available', qtip:'The date the resource is made publicly available. May be a range. (To indicate the end of an embargo period, use Available. )'},	
					{abbr:'Copyrighted',name:'Copyrighted', qtip:'The specific, documented date at which the resource receives a copyrighted status, if applicable. '},
					{abbr:'Collected',name:'Collected', qtip:'The date or date range in which the resource content was collected. (To indicate precise or particular timeframes in which research was conducted. )'},	
					{abbr:'Created',name:'Created', qtip:'The date the resource itself was put together; this could be a date range or a single date for a final component, e.g., the finalised file with all of the data. (Recommended for discovery.)'},	
					{abbr:'Issued',name:'Issued', qtip:'The date that the resource is published or distributed e.g. to a data center '},
					{abbr:'Submitted',name:'Submitted', qtip:'The date the creator submits the resource to the publisher. This could be different from Accepted if the publisher then applies a selection process. (Recommended for discovery. To indicate the start of an embargo period, use Submitted or Accepted, as appropriate.)'},	
					{abbr:'Updated',name:'Updated', qtip:'The date of the last update to the resource, when the resource is being added to. May be a range. '},	
					{abbr:'Valid',name:'Valid', qtip:'The date or date range during which the dataset or resource  is accurate.'}
]
});			

