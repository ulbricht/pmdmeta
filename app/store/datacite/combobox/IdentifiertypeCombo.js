Ext.define('PMDMeta.store.datacite.combobox.IdentifiertypeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'IdentifiertypeCombo',
    data: [
					{abbr:'ARK',name:'ARK', qtip:'Archival Resource Key; URL designed to support long-term access to information objects. In general, ARK syntax is of the form (brackets indicate [optional] elements: [http://NMA/]ark:/NAAN/Name[Qualifier]]'},	
					{abbr:'arXiv',name:'arXiv', qtip:'arXiv identifier; arXiv.org is a repository of preprints of scientific papers in the fields of mathematics, physics, astronomy, computer science, quantitative biology, statistics, and quantitative finance.'},	
					{abbr:'bibcode',name:'bibcode', qtip:'Astrophysics Data System bibliographic codes; a standardized 19 character identifier according to the syntax yyyyjjjjjvvvvmppppa.'},						
					{abbr:'DOI',name:'DOI', qtip:'Digital Object Identifier; a character string used to uniquely identify an object. A DOI name is divided into two parts, a prefix and a suffix, separated by a slash. '},	
					{abbr:'EAN13',name:'EAN13', qtip:'European Article Number, now renamed International Article Number, but retaining the original acronym, is a 13-digit barcoding standard which is a superset of the original 12-digit Universal Product Code (UPC) system. '},	
					{abbr:'eISSN',name:'eISSN', qtip:'Electronic International Standard Serial Number; ISSN used to identify periodicals in electronic form (eISSN or e-ISSN). '},	
					{abbr:'Handle',name:'Handle', qtip:'A handle is an abstract reference to a resource. '},	
					{abbr:'ISBN',name:'ISBN', qtip:'International Standard Book Number; a unique numeric book identifier. There are 2 formats: a 10-digit ISBN format and a 13-digit ISBN.'},	
					{abbr:'ISSN',name:'ISSN', qtip:'International Standard Serial Number; a unique 8-digit number used to identify a print or electronic periodical publication.  '},						
					{abbr:'ISTC',name:'ISTC', qtip:'International Standard Text Code; a unique "number" assigned to a textual work. An ISTC consists of 16 numbers and/or letters.'},	
					{abbr:'LISSN',name:'LISSN', qtip:'The linking ISSN or ISSN-L enables collocation or linking among different media versions of a continuing resource.'},	
					{abbr:'LSID',name:'LSID', qtip:'Life Science Identifiers; a unique identifier for data in the Life Science domain. Format: urn:lsid:authority:namespace:identifier:revision'},
					{abbr:'PMID',name:'PMID', qtip:'PubMed identifier; a unique number assigned to each PubMed record.'},
					{abbr:'PURL',name:'PURL', qtip:'Persistent Uniform Resource Locator. A PURL has three parts: (1) a protocol, (2) a resolver address, and (3) a name.'},	
					{abbr:'UPC',name:'UPC', qtip:'Universal Product Code is a barcode symbology used for tracking trade items in stores. Its most common form, the UPC-A, consists of 12 numerical digits.'},	
					{abbr:'URL',name:'URL', qtip:'Uniform Resource Locator, also known as web address, is a specific character string that constitutes a reference to a resource. The syntax is: scheme://domain:port/path?query_string#fragment_id '},
					{abbr:'URN',name:'URN', qtip:'Uniform Resource Name; is a unique and persistent identifier of an electronic document. The syntax is: urn: &amp;&lt;NID&amp;&gt;:&amp;&lt;NSS&amp;&gt;  The leading urn: sequence is case-insensitive, &amp;&lt;NID&amp;&gt; is the namespace identifier, &amp;&lt;NSS&amp;&gt; is the namespace-specific string.'}					
    ]
});				
