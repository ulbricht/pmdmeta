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
        'PMDMeta.store.dif.Project',
        'PMDMeta.store.iso.GIPPInfo',
        'PMDMeta.store.iso.GIPPInfoHelper',        
        'PMDMeta.view.iso.GIPPInfo'
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
                
                        
                new PMDMeta.store.iso.GIPPInfo();
                new PMDMeta.store.iso.GIPPInfoHelper();
            
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
                            resOptTitle.get("resourceType")!=resOpt.get("resourceType") ||
                            resOptTitle.get("language")!=resOpt.get("language"))){                           
                        if (resOpt) {
                            resOpt.beginEdit();
                            resOpt.set('resourceTypeGeneral',resOptTitle.get("resourceTypeGeneral"));
                            resOpt.set('resourceType',resOptTitle.get("resourceType"));                            
                            resOpt.set('language',resOptTitle.get("language"));
                            resOpt.endEdit();
                        }else{
                            resOptStore.insert(0,{
                                language:resOptTitle.get("language"),
                                resourceTypeGeneral:resOptTitle.get("resourceTypeGeneral"),
                                resourceType:resOptTitle.get("resourceType")});                            
                        }
                    }
                    
                    

                }
                var distributegipp=function(){
                    var gippinfohelper=Ext.getStore('GIPPInfoHelper').getAt(0);
                    var gippinfo=Ext.getStore('GIPPInfo');

                    if (gippinfohelper){
                        var fdsn=gippinfohelper.get('fdsncode');  
                        if (fdsn && fdsn.length>0){
                            var entry=false;
                            gippinfo.each(function(gi){
                                if (!entry && gi.get('subjectScheme')==='FDSNCODE')
                                    entry=gi;
                            })
                            if (entry){                                
                                if (entry.get('subject')!==fdsn)                                                        
                                    entry.set('subject',fdsn)
                            }else
                                gippinfo.insert(0,{subject: fdsn, subjectScheme:'FDSNCODE'})                            
                        }

                        var project=gippinfohelper.get('projectname');
                        if (project && project.length>0){
                            var entry=false;
                            gippinfo.each(function(gi){
                                if (!entry && gi.get('subjectScheme')==='GIPPPROJECT')
                                    entry=gi;
                            })
                            if (entry){
                                if (entry.get('subject')!==project)                            
                                    entry.set('subject',project)
                            }
                            else
                                gippinfo.insert(0,{subject: project, subjectScheme:'GIPPPROJECT'})                            
                        }

                        var grant=gippinfohelper.get('grantnumber');
                        if (grant && grant.length>0){
                            var entry=false;
                            gippinfo.each(function(gi){
                                if (!entry && gi.get('subjectScheme')==='GIPPGRANTNUMBER')
                                    entry=gi;
                            })
                            if (entry){
                                if (entry.get('subject')!==grant)
                                    entry.set('subject',grant)
                            }
                            else
                                gippinfo.insert(0,{subject: grant, subjectScheme:'GIPPGRANTNUMBER'})                            
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
                    

                    if (resOpt && resOptTitle.get("resourceTypeGeneral")!=resOpt.get("resourceTypeGeneral")){
                               resOptTitle.set('resourceTypeGeneral',resOpt.get("resourceTypeGeneral"));                                    
                    }

                    if (resOpt && resOptTitle.get("resourceType")!=resOpt.get("resourceType")){
                               resOptTitle.set('resourceType',resOpt.get("resourceType"));                                    
                    }                    
                    resOptTitle.endEdit();                    

                    resOptTitleStore.removeAll();
                    resOptTitleStore.insert(0,resOptTitle);
                }
                
                var harvestgipp=function(){
                    var gippinfohelperstore=Ext.getStore('GIPPInfoHelper');
                    var gippinfohelper=gippinfohelperstore.getAt(0);
                    var gippinfo=Ext.getStore('GIPPInfo');

                    var fdsn=false;
                    gippinfo.each(function(gi){
                        if (!fdsn && gi.get('subjectScheme')==='FDSNCODE')
                            fdsn=gi.get('subject');
                    })

                    var project=false;
                    gippinfo.each(function(gi){
                        if (!project && gi.get('subjectScheme')==='GIPPPROJECT')
                            project=gi.get('subject');
                    })


                    var grant=false;
                    gippinfo.each(function(gi){
                        if (!grant && gi.get('subjectScheme')==='GIPPGRANTNUMBER')
                            grant=gi.get('subject');
                    });

                    if (!project)
                        project="";
                    if (!grant)
                        grant="";                    
                    if (!fdsn)
                        fdsn="";                    

                    if (gippinfohelper){
                           if (gippinfohelper.get('fdsncode')!==fdsn || gippinfohelper.get('projectname')!==project ||
                            gippinfohelper.get('grantnumber')!==grant){
                                gippinfohelperstore.removeAll();
                                gippinfohelperstore.insert(0,{fdsncode:fdsn,projectname:project,grantnumber:grant});
                            }
                    }else{
                                gippinfohelperstore.insert(0,{fdsncode:fdsn,projectname:project,grantnumber:grant});                        
                    }
                }

                //sync stores
                resOptTitleStore.on('update',distributeValues);
                resOptTitleStore.on('datachanged',distributeValues);                
                titleStore.on('update',harvestValues);
                titleStore.on('datachanged',harvestValues);    
                resOptStore.on('update',harvestValues);
                resOptStore.on('datachanged',harvestValues);     
                resOptStore.on('clear',function (){resOptTitleStore.removeAll()});
                var gippinfo=Ext.getStore('GIPPInfo');      
                var gippinfohelperstore=Ext.getStore('GIPPInfoHelper');            
                gippinfohelperstore.on('update',distributegipp);
                gippinfohelperstore.on('datachanged',distributegipp);                                
                gippinfo.on('update',harvestgipp);
                gippinfo.on('datachanged',harvestgipp);
                gippinfo.on('clear',function(){gippinfohelperstore.removeAll();});                
                
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
				xtype: 'panel',
				height: 100,
				frame: true,
				title: 'Additional Information',
				items:[
                                    {
					xtype: 'GIPPInfo'
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
				title: 'Sponsors (Persons and/or Institutions)'
			},/*{
				xtype: 'DataCite-Titles',
                                hidden:true
			},*/{
				xtype: 'DataCite-Descriptions'
			}/*,{
				xtype: 'DataCite-SubjectsGCMD',
                                title: 'Thesaurus Keywords (Choose at least one keyword from each thesaurus)'
			}*/,{
				xtype: 'DataCite-Subjects',
                                title: 'Free Keywords (Supply as many keywords as you want)'
			},{                            
/*			    
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
