/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

// Determine if the form is editable 
var urlparameter=Ext.Object.fromQueryString(location.search.substring(1));
var disabled = (urlparameter.editable == 'False');
var dataset = urlparameter.dataset;
if(urlparameter && urlparameter.extra)
    var extra_fields = JSON.parse(urlparameter.extra.replace(/\'/g, '"'));

// set up the items to display on the form
var items = [ {
                xtype: 'panel',
                height: 182,
                frame: true,
                title: 'Resource Information',
                disabled: disabled,
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
                disabled: disabled,
                xtype: 'DataCite-Rights',
                title: 'Licenses and Rights'
            },{
                disabled: disabled,
                xtype: 'DataCite-Authors',
                title: 'Authors (Persons and/or Institutions)'
            },{
                disabled: disabled,
                xtype: 'isoviewDatasetContact',
                title: 'Contact Person(s) / Point of Contact'
            },{
                disabled: disabled,
                xtype: 'DataCite-Contributors',
                title: 'Contributors (Persons and/or Institutions)'
            },{
                disabled: disabled,
                xtype: 'DataCite-Descriptions'
            },{
                disabled: disabled,
                xtype: 'DataCite-SubjectsGCMD',
                title: 'Thesaurus Keywords'
            },{
                disabled: disabled,
                xtype: 'DataCite-Subjects',
                title: 'Free Keywords (Supply as many keywords as you want)'
            },{                            
                disabled: disabled,
                xtype: 'ISO-Extent'
            },{
                disabled: disabled,
                xtype: 'DataCite-PMDDates'
            },{
                disabled: disabled,
                xtype: 'DataCite-RelatedIdentifiers'                    
            }
    ];

    // add extra items described in the URL
    for (var extra_field in extra_fields) {
        items.push({
                disabled: disabled,
                xtype: extra_fields[extra_field].xtype,
                title: extra_fields[extra_field].title,
                thesaurusList: extra_fields[extra_field].thesaurusList
        });
    }

    items.push({
                disabled: disabled,
                xtype: 'DataCite-AlternateIdentifiers',
                hidden:true
            },{ 
                disabled: disabled,   
                xtype: 'DataCite-Sizes',
                hidden:true
            },{
                disabled: disabled,
                xtype: 'DataCite-Formats',
                hidden:true
            },{
                html:'<h2>The metadata are stored inside your browser. Please save a copy using the Save As button in the upper right of the form. <br><br></h2>'                
            }           
    );


Ext.define('PMDMeta.view.main.DataCiteForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'PMDMeta.view.datacite.Rights'  ,
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
        'PMDMeta.view.ieda.DataTypes'
    ],

    xtype: 'DataCite-Form',
    title: 'DataCite Metadata for Dataset: ' + dataset,
    autoScroll: true,
    bodyPadding: 0,
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
        new PMDMeta.store.ieda.DataTypes();
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
                            title.beginEdit();
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
                };
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

                };

                //sync stores
                resOptTitleStore.on('update',distributeValues);
                resOptTitleStore.on('datachanged',distributeValues);                
                titleStore.on('update',harvestValues);
                titleStore.on('datachanged',harvestValues);    
                resOptStore.on('update',harvestValues);
                resOptStore.on('datachanged',harvestValues);     
                resOptStore.on('clear',function (){resOptTitleStore.removeAll();});
                this.callParent();          
    },

    items: items

});
