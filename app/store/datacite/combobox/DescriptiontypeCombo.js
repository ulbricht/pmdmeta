Ext.define('PMDMeta.store.datacite.combobox.DescriptiontypeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'DescriptiontypeCombo',
    data: [
				{abbr:'Abstract',name:'Abstract', qtip:'A brief description of the resource and the context in which the resource was created. (Recommended for discovery. Use &quot;&amp;lt;br&amp;gt;&quot; to indicate a line break for improved rendering of multiple paragraphs, but otherwise no html markup.)'},	
				{abbr:'Methods',name:'Methods', qtip:'The methodology employed for the study or research. (Recommended for discovery.)'},	
				{abbr:'SeriesInformation',name:'SeriesInformation', qtip:'Information about a repeating series, such as volume, issue, number. <br>For dataset series, indicate relationships below &quot;Related Work&quot; to other datasets. Use isPartOf or HasPart to characterise the relationship.<br>For use with grey literature. If providing an ISSN, use &quot;Related Work&quot; and characterize the relationship with an ISSN identifier.'},						
				{abbr:'TableOfContents',name:'TableOfContents', qtip:'A listing of the Table of Contents. (Use &quot;&amp;lt;br&amp;gt;&quot; to indicate a line break for improved rendering of multiple paragraphs, but otherwise no html markup.) '},	
				{abbr:'Other',name:'Other', qtip:'Other description information that does not fit into an existing category.(Use for any other description type.)'}		
]});			

