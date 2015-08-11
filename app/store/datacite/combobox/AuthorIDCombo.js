Ext.define('PMDMeta.store.datacite.combobox.AuthorIDCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.ComboboxURI',
    storeId: 'AuthorIDCombo',
    data: [
        {abbr:'ORCID',name:'ORCID',uri:'http://orcid.org',qtip:'an ID for authors maintained by the ORCID. ORCID is an acronym, sort for Open Researcher and Contributor ID. See http://www.orcid.org'},
        {abbr:'Researcher.id',name:'Researcher.id',uri:'http://www.researcherid.com',qtip:'an ID for authors maintained by Thomson Reuters\' Web of Science. See http://www.researcherid.com.'},
        {abbr:'ScopusID',name:'Scopus',uri:'http://www.scopus.com',qtip:'an ID for authors maintained Elsevier\'s Scopus. See http://www.scopus.com.'},
        {abbr:'INSI',name:'INSI',uri:'http://www.insi.org',qtip:'an ID for institutions. See http://www.insi.org.'}
]});			

