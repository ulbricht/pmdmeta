Ext.define('PMDMeta.store.datacite.combobox.ResourcetypeGeneralCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'ResourcetypeGeneralCombo',
    data: [
					{abbr:'Audiovisual',name:'Audiovisual', qtip:'A series of visual representations imparting an impression of motion when shown in succession. May or may not include sound. (May be used for films, video, etc,) '},	
					{abbr:'Collection',name:'Collection', qtip:'An aggregation of resources of various types. If a collection exists of a single type, use the single type to describe it.  (A collection of samples, or various files making up a report.)'},
					{abbr:'Dataset',name:'Dataset', qtip:'Data encoded in a defined structure. (Data file or files,)'},						
					{abbr:'Event',name:'Event', qtip:'A non-persistent, time-based occurrence. (Descriptive information and/or content that is the basis for discovery of the purpose, location, duration, and responsible agents associated with an event such as a webcast or convention.)'},						
					{abbr:'Image',name:'Image', qtip:'A visual representation other than text. (Digitized or born digital images, drawings or photographs.)'},	
					{abbr:'InteractiveResource',name:'InteractiveResource', qtip:' resource requiring interaction from the user to be understood, executed, or experienced. (Training modules, files that require use of a viewer (e.g., Flash), or query/response portals.)'},	
					{abbr:'Model',name:'Model', qtip:'An abstract, conceptual, graphical, mathematical or visualization model that represents empirical objects, phenomena, or physical processes. Modelled descriptions of, for example, different aspects of languages or a molecular biology reaction chain.'},	
					{abbr:'PhysicalObject',name:'PhysicalObject', qtip:'An inanimate, three-dimensional object or substance. (Artifacts, specimens. )'},	
					{abbr:'Service',name:'Service', qtip:'A system that provides one or more functions of value to the end-user. (Data management service, authentication service, or photocopying service.)'},	
					{abbr:'Software',name:'Software', qtip:'A computer program in source code (text) or compiled form. (Software supporting research.)'},						
					{abbr:'Sound',name:'Sound', qtip:'A resource consisting primarily of words for reading. (Audio recording.)'},	
					{abbr:'Text',name:'Text', qtip:'A resource consisting primarily of words for reading. (Grey literature, lab notes, accompanying materials. )'},	
					{abbr:'Workflow',name:'Workflow', qtip:'A structured series of steps which can be executed to produce a final outcome, allowing users a means to specify and enact their work in a more reproducible manner.Computational workflows involving sequential operations made on data by wrapped software and may be specified in a format belonging to a workflow management system, such as Taverna'},
					{abbr:'Other',name:'Other', qtip:'If selected, supply a value for ResourceType.'}					
    ]
});
