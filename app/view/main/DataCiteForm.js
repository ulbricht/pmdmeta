/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

Ext.define('PMDMeta.view.main.DataCiteForm', {
    extend: 'Ext.form.Panel',
    requires: [
	'PMDMeta.view.datacite.Rights'	,
	'PMDMeta.view.datacite.Formats',
	'PMDMeta.view.datacite.Sizes',
	'PMDMeta.view.datacite.Authors',
	'PMDMeta.view.datacite.Contributors',	
	'PMDMeta.view.datacite.Resource',
	'PMDMeta.view.datacite.ResourceOpt',	
	'PMDMeta.view.datacite.Titles',
	'PMDMeta.view.datacite.Subjects',
	'PMDMeta.view.datacite.SubjectsGCMD',
	'PMDMeta.view.datacite.SubjectsGCMD1',
	'PMDMeta.view.datacite.SubjectsGCMD2',
	'PMDMeta.view.datacite.SubjectsGCMD3',
	'PMDMeta.view.datacite.SubjectsGCMD4',
	'PMDMeta.view.datacite.SubjectsGCMD5',
	'PMDMeta.view.datacite.SubjectsGCMD6',
	'PMDMeta.view.datacite.SubjectsGCMD7',
	'PMDMeta.view.datacite.SubjectsGCMD8',
	'PMDMeta.view.datacite.SubjectsGCMD9',
	'PMDMeta.view.datacite.SubjectsGCMD10',
	'PMDMeta.view.datacite.SubjectsGCMD11',
	'PMDMeta.view.datacite.SubjectsGCMD12',
	'PMDMeta.view.datacite.SubjectsGCMD13',
//	'PMDMeta.view.datacite.SubjectsGEMET',	
	'PMDMeta.view.datacite.AlternateIdentifiers',
	'PMDMeta.view.datacite.RelatedIdentifiers',
	'PMDMeta.view.datacite.Descriptions',
	'PMDMeta.view.datacite.GeoLocations',
	'PMDMeta.view.datacite.Dates',
        'PMDMeta.view.datacite.ResourceOptAndTitle',
//	'PMDMeta.view.iso.TemporalCoverage',	
	'PMDMeta.view.main.ThesaurusWindow',
        'PMDMeta.store.escidoc.Author',
        'PMDMeta.store.escidoc.Title',
        'PMDMeta.store.escidoc.Date',
        'PMDMeta.store.datacite.combobox.TitletypeCombo',
        'PMDMeta.view.datacite.PMDDates',
        'PMDMeta.view.iso.DatasetContact',
        'PMDMeta.model.datacite.ResourceOptAndTitle',
        'PMDMeta.store.iso.Extent',
        'PMDMeta.view.iso.Extent',
        'PMDMeta.store.dif.SpatialCoverage',
        'PMDMeta.store.dif.Project'
    ],

	xtype: 'DataCite-Form',
	title: 'DataCite Metadata',
	autoScroll: true,
	bodyPadding: 10,
	defaults:{margin: '0 0 10 0'},   
	layout:  {type: 'vbox', align: 'stretch'},
	initComponent: function() {
		new PMDMeta.store.datacite.Author();
		new PMDMeta.store.datacite.Title();
		new PMDMeta.store.datacite.AlternateIdentifier();
		new PMDMeta.store.datacite.Subject();
		new PMDMeta.store.datacite.SubjectGCMD();
		new PMDMeta.store.datacite.SubjectGCMD1();
		new PMDMeta.store.datacite.SubjectGCMD2();
		new PMDMeta.store.datacite.SubjectGCMD3();
		new PMDMeta.store.datacite.SubjectGCMD4();
		new PMDMeta.store.datacite.SubjectGCMD5();
		new PMDMeta.store.datacite.SubjectGCMD6();
		new PMDMeta.store.datacite.SubjectGCMD7();
		new PMDMeta.store.datacite.SubjectGCMD8();
		new PMDMeta.store.datacite.SubjectGCMD9();
		new PMDMeta.store.datacite.SubjectGCMD10();
		new PMDMeta.store.datacite.SubjectGCMD11();
		new PMDMeta.store.datacite.SubjectGCMD12();
		new PMDMeta.store.datacite.SubjectGCMD13();
//		new PMDMeta.store.datacite.SubjectGEMET();		
		new PMDMeta.store.datacite.Size();
		new PMDMeta.store.datacite.Date();
		new PMDMeta.store.datacite.Right(); 
		new PMDMeta.store.datacite.ResourceOpt();
		new PMDMeta.store.datacite.Resource();
		new PMDMeta.store.datacite.RelatedIdentifier();
		new PMDMeta.store.datacite.GeoLocation();
		new PMDMeta.store.datacite.Format();
		new PMDMeta.store.datacite.Description();
		new PMDMeta.store.datacite.Contributor();

//		new PMDMeta.store.iso.TemporalCoverage();
		new PMDMeta.store.escidoc.Author();
		new PMDMeta.store.escidoc.Title();
		new PMDMeta.store.escidoc.Date();
                
                if (!Ext.getStore('isoDatasetContact'))
                    new PMDMeta.store.iso.DatasetContact();
                
                if (!Ext.getStore('isoExtent'))
                    new PMDMeta.store.iso.Extent();  
                
                new PMDMeta.store.dif.SpatialCoverage();
                new PMDMeta.store.dif.Project();
                
                new PMDMeta.store.datacite.ResourceOptAndTitle();
                new PMDMeta.store.datacite.combobox.TitletypeCombo();
            
                var resOptTitleStore=Ext.getStore('DataCiteResourceOptAndTitle');
                var titleStore=Ext.getStore('DataCiteTitle');
                var resOptStore=Ext.getStore('DataCiteResourceOpt');


                //distribute values to associated stores
                var distributeValues=function(){
                    var resOptTitle=resOptTitleStore.getAt(0);
                    var title=titleStore.getAt(0);
                    var resOpt=resOptStore.getAt(0);
                    if (resOptTitle && (!title || resOptTitle.get("title")!=title.get("title") ||
                            resOptTitle.get("titleType")!=title.get("titleType")||
                            resOptTitle.get("language")!=title.get("lang"))){                           
                        if (title) {
                            title.beginEdit()
                            title.set('title',resOptTitle.get("title"));
                            title.set('titleType',resOptTitle.get("titleType"));
                            title.set('lang',resOptTitle.get("language"));
                            title.endEdit(true);
                        }else{
                            titleStore.insert(0,{title:resOptTitle.get("title"),titleType:resOptTitle.get("titleType"),lang:resOptTitle.get("language")});
                        }
                    }
                    if (resOptTitle && (!resOpt || resOptTitle.get("resourceTypeGeneral")!=resOpt.get("resourceTypeGeneral") ||
                            resOptTitle.get("language")!=resOpt.get("language")||
                            resOptTitle.get("version")!=resOpt.get("version"))){                           
                        if (resOpt) {
                            resOpt.beginEdit();
                            resOpt.set('resourceTypeGeneral',resOptTitle.get("resourceTypeGeneral"));
                            resOpt.set('language',resOptTitle.get("language"));
                            resOpt.set('version',resOptTitle.get("version"));
                            resOpt.endEdit();
                        }else{
                            resOptStore.insert(0,{
                                version:resOptTitle.get("version"),
                                language:resOptTitle.get("language"),
                                resourceTypeGeneral:resOptTitle.get("resourceTypeGeneral")});
                        }
                    }                    
                }
                //pull information from associated stores
                var harvestValues=function(){
                    var resOptTitle=resOptTitleStore.getAt(0);
                    var title=titleStore.getAt(0);
                    var resOpt=resOptStore.getAt(0);
                    var language=null;
                    
                    if (!resOptTitle){
                        resOptTitle=new PMDMeta.model.datacite.ResourceOptAndTitle();
                    }
                    
                    resOptTitle.beginEdit();                    
                    if (title && (resOptTitle.get("title")!=title.get("title") ||
                            resOptTitle.get("titleType")!=title.get("titleType"))){ 
                            resOptTitle.set('title',title.get("title"));
                            resOptTitle.set('titleType',title.get("titleType"));

                    }

                    if (resOpt && resOptTitle.get("language")!=resOpt.get("language")){
                            language=resOpt.get("language");
                    }
                    if (title && title.get("lang").length>0 && (!language || language.length===0)){                        
                            language=title.get("lang");
                    }                    
                    if (language)
                        resOptTitle.set('language',language);

                    if (resOpt && resOptTitle.get("version")!=resOpt.get("version")){
                            resOptTitle.set('version',resOpt.get("version"));  
                    }                    

                    if (resOpt && resOptTitle.get("resourceTypeGeneral")!=resOpt.get("resourceTypeGeneral")){
                               resOptTitle.set('resourceTypeGeneral',resOpt.get("resourceTypeGeneral"));                                    
                    }
                    resOptTitle.endEdit();                    

                    resOptTitleStore.removeAll();
                    resOptTitleStore.insert(0,resOptTitle);

                }

                //sync stores
                resOptTitleStore.on('update',distributeValues);
                resOptTitleStore.on('datachanged',distributeValues);                
                titleStore.on('update',harvestValues);
                titleStore.on('datachanged',harvestValues);    
                resOptStore.on('update',harvestValues);
                resOptStore.on('datachanged',harvestValues);     
                resOptStore.on('clear',function (){resOptTitleStore.removeAll()});
                this.callParent();   		
	},
	items:[         {
				xtype: 'panel',
				height: 182,
				frame: true,
				title: 'Resource Information',
				items:[
                                    {
					xtype: 'DataCite-Resource'
                                    },{
					xtype: 'DataCite-ResourceOpt',
                                        hidden:true
                                    },{
					xtype: 'DataCite-ResourceOptAndTitle'	
                                    }
                                ]
			},{
				xtype: 'DataCite-Rights',
				title: 'Licenses and Rights'
			},{
				xtype: 'DataCite-Authors',
				title: 'Authors (Persons and/or Institutions)'
			},{
				xtype: 'isoviewDatasetContact',
				title: 'Contact Person(s) / Point of Contact'
			},{
				xtype: 'DataCite-Contributors',
				title: 'Contributors (Persons and/or Institutions)'
			},/*{
				xtype: 'DataCite-Titles',
                                hidden:true
			},*/{
				xtype: 'DataCite-Descriptions'
			},{
				xtype: 'panel',
				frame: true,
      	                        title: 'Analogue Models',
				layout: {type: 'hbox'},
				items:[{
						xtype: 'DataCite-SubjectsGCMD1',
	      	                       		 title: '',
						cls: 'PMD-grid-border',
						flex:1,
						frame: false
					},{
						xtype: 'DataCite-SubjectsGCMD2',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
					},{
						xtype: 'DataCite-SubjectsGCMD3',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
					},{
						xtype: 'DataCite-SubjectsGCMD4',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				}]
			},{
				xtype: 'panel',
				frame: true,
      	                        title: 'Analogue Models - Experimental Setup',
				layout: {type: 'hbox'},
				items:[{
						xtype: 'DataCite-SubjectsGCMD5',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				},{
						xtype: 'DataCite-SubjectsGCMD6',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				},{
						xtype: 'DataCite-SubjectsGCMD8',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				},{
						xtype: 'DataCite-SubjectsGCMD7',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				},{
						xtype: 'DataCite-SubjectsGCMD13',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				}]
			},{
				xtype: 'panel',
				frame: true,
      	                        title: 'Rock Physics',
				layout: {type: 'hbox'},
				items:[{
						xtype: 'DataCite-SubjectsGCMD9',
	      	                       		 title: '',
						cls: 'PMD-grid-border',
						flex:1,
						frame: false
					},{
						xtype: 'DataCite-SubjectsGCMD10',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				},{
						xtype: 'DataCite-SubjectsGCMD11',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				},{
						xtype: 'DataCite-SubjectsGCMD12',
						flex:1,
						cls: 'PMD-grid-border',
	      	                       		 title: '',
						frame: false
				}]
			},{
				xtype: 'DataCite-SubjectsGCMD'
			},{
				xtype: 'DataCite-Subjects',
                                title: 'Free Keywords (Supply as many keywords as you want)'
			},{                            
/*				xtype: 'DataCite-SubjectsGEMET'
			},{    
				xtype: 'DataCite-GeoLocations'
			},{    
*/				xtype: 'ISO-Extent'
/*			},{
				xtype: 'ISO-TemporalCoverage'				    
*/			},{
				xtype: 'DataCite-PMDDates'
			}/*,{
				xtype: 'DataCite-Dates',
                                disabled: false
			}*/,{
				xtype: 'DataCite-RelatedIdentifiers'				    

			},{
				xtype: 'DataCite-AlternateIdentifiers',
				hidden:true
			},{    
				xtype: 'DataCite-Sizes',
				hidden:true
			},{
				xtype: 'DataCite-Formats',
				hidden:true
			},{
                            html:'<h2>The metadata are stored inside your browser. Please save a copy using the SAVE button in the upper right of the form. <br><br></h2> '
                            
                        }			
	]

});
