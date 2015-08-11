Ext.define('PMDMeta.store.datacite.combobox.RelationtypeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'RelationtypeCombo',
    data: [
					{abbr:'IsCitedBy',name:'IsCitedBy', group:'Citation', qtip:'This dataset is cited by a manuscript. For initial publication consider using IsSupplementTo.'},	
					{abbr:'Cites',name:'Cites', group:'Citation', qtip:'This dataset is a manuscript and cites dataset ...'},	
					{abbr:'IsSupplementTo',name:'IsSupplementTo', group:'Citation',qtip:'This dataset is published as supplement to a written manuscript.'},						
					{abbr:'IsSupplementedBy',name:'IsSupplementedBy', group:'Citation', qtip:'This dataset is a manuscript and has a supplementary dataset ...'},	
					{abbr:'IsReferencedBy',name:'IsReferencedBy', group:'Citation',  qtip:''},
					{abbr:'References',name:'References', group:'Citation',  qtip:''},

					{abbr:'IsPartOf',name:'IsPartOf', group:'Compilation',  qtip:'This dataset is part of a series ...'},	
					{abbr:'HasPart',name:'HasPart', group:'Compilation',  qtip:'This dataset forms a series with the following datasets ...'},	
					{abbr:'IsCompiledBy',name:'IsCompiledBy', group:'Compilation',  qtip:'This dataset is part of a compilation'},
					{abbr:'Compiles',name:'Compiles', group:'Compilation',  qtip:'This dataset compiles ...'},

					{abbr:'IsContinuedBy',name:'IsContinuedBy', group:'Versions',  qtip:'This dataset is continued by ...'},	
					{abbr:'Continues',name:'Continues', group:'Versions',  qtip:'This datset continues ...'},	
					
					{abbr:'IsVariantFormOf',name:'IsVariantFormOf', group:'Versions',  qtip:'This dataset is a repackaged form of ...'},	
					{abbr:'IsOriginalFormOf',name:'IsOriginalFormOf', group:'Versions',  qtip:'This dataset is the original form of the repackaged dataset ...'},
					{abbr:'IsIdenticalTo',name:'IsIdenticalTo', group:'Versions',  qtip:'This dataset is identical to ...'},
					{abbr:'IsNewVersionOf',name:'IsNewVersionOf', group:'Versions',  qtip:'This dataset is a new edition of ...'},	
					{abbr:'IsPreviousVersionOf',name:'IsNewVersionOf', group:'Versions',  qtip:'This dataset is a previous edition of ...'},						
					
					

					{abbr:'HasMetadata',name:'HasMetadata', group:'Documentation',  qtip:'Metadata for this dataset can be found at ...'},	
					{abbr:'IsMetadataFor',name:'IsMetadataFor', group:'Documentation',  qtip:'This dataset is metadata for ...'},						
					{abbr:'IsDocumentedBy',name:'IsDocumentedBy', group:'Documentation',  qtip:'This dataset is documented by ...'},	
					{abbr:'Documents',name:'Documents', group:'Documentation',  qtip:'This dataset is a manuscript and documents dataset ...'},	
					{abbr:'IsReviewedBy',name:'IsReviewedBy', group:'Documentation',  qtip:'This dataset is reviewed in ...'},	
					{abbr:'Reviews',name:'Reviews', group:'Documentation',  qtip:'This dataset is a manuscript and reviews ...'},	
					
					{abbr:'IsDerivedForm',name:'IsDerivedForm', group:'Derivation',  qtip:'This dataset is a derivative of an original resource, e.g. a subset of the data with recalculated values.'},
					{abbr:'IsSourceOf',name:'IsSourceOf', group:'Derivation',  qtip:'The original form of a derived dataset.'}
]
});				
				
