Ext.define('PMDMeta.store.escidoc.Item', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.escidoc.Item',
    storeId: 'Item',
    autoSync: false,
    requires:['PMDMeta.store.datacite.Contributor',
	'PMDMeta.model.publish.Htmlcontent'],
//    autoLoad: true,
    proxy:{
            type: 'localstorage'
    },
    parsers: new Array(
                            //DataCite
                                'DataCiteAuthor','DataCiteTitle','DataCiteAlternateIdentifier','DataCiteSubject',
                                'DataCiteSize','DataCiteDate','DataCiteRight','DataCiteResourceOpt','DataCiteResource',
                                'DataCiteRelatedIdentifier','DataCiteGeoLocation','DataCiteFormat','DataCiteDescription',
                                /*'DataCiteContributor','DataCiteContact',*/'DataCiteSubjectGCMD','DataTypes'
                            //ISO    
                            ,'isoCitedResponsibleParty','isoIdentificationInfo','isoMD_Metadata','isoMetadataContact','isoDatasetContact','isoExtent',
                            'difSpatialCoverage','difProject'
                           ),
    eventListeningStores: new Array(
                            //DataCite
                                'DataCiteAuthor','DataCiteTitle','DataCiteAlternateIdentifier','DataCiteSubject',
                                'DataCiteSize','DataCiteDate','DataCiteRight','DataCiteResourceOpt','DataCiteResource',
                                'DataCiteRelatedIdentifier'/*,'DataCiteGeoLocation'*/,'DataCiteFormat','DataCiteDescription',
                                /*'DataCiteContributor','DataCiteContact',*/'DataCiteSubjectGCMD','DataCiteResourceOptAndTitle','DataTypes'
                            //ISO    
                            ,'isoCitedResponsibleParty','isoIdentificationInfo','isoMD_Metadata','isoMetadataContact','isoDatasetContact','isoExtent'
                           ),
                   
    changefuncon:false,                   
    changefunc: function(){
        var store=Ext.getStore('Item');
        if (!store.changefuncon)
            return;

        var xml=store.marshal();
        var elem=store.getAt(0);
        if (!elem || elem.get('local')!=xml){
		var href=null;
		if (elem)
			href=elem.get("href");
		store.suspendEvents(false);
		store.removeAll();
		store.insert(0,{id:null,href:href,local:xml});
		store.resumeEvents();
	    
		store.validate(xml);	    
	    
        }
    },
	validate: function(xml){
		var store=Ext.getStore("validationresult");

		Ext.Ajax.request({
			url: 'resources/validate.php',	
			method: 'POST',
			params:{
				validationdata: xml
			},                                                        
			success: function(response, opts) {
				var model=new PMDMeta.model.publish.Htmlcontent();
				var responseData = Ext.decode(response.responseText);
				var htmlcontent;
				if (responseData.success){
					htmlcontent=responseData.message;
				}else{
					htmlcontent="Error validating Metadata. Missing Internet?";
				}
				model.set("html",htmlcontent);
				store.insert(0,model);
				store.removeAt(1);
			},
			   failure: function(response, opts) {
			      console.log('server-side failure with status code ' + response.status);
			}            
		});   
		
	},   
    listeners:{
 
        load: function (store){  
                var item=store.getAt(0);
                var itemstore=Ext.getStore('Item'); 
                
                if (!item)
                    return;
                var local=item.get('local');
                var href=item.get('href');

                if (local){               
           //         console.log("found item with content: "+local);
                    var dom=false;
                    if ( window.DOMParser ) { // Standard
                       var parser = new DOMParser();
                       dom = parser.parseFromString( local , "text/xml" );
                    } else { // IE
                        dom= new ActiveXObject( "Microsoft.XMLDOM" );
                        dom.async = "false";
                        dom.loadXML( local );
                    }
                    itemstore.unmarshal(dom);
                    
                }else{
                    itemstore.loaddata({id:null,href:href,local:null});
                }
                           
            Ext.each(itemstore.eventListeningStores, function(storename){
                Ext.getStore(storename).on('datachanged',itemstore.changefunc);
                Ext.getStore(storename).on('update',itemstore.changefunc);            
            });    
            Ext.getStore('DataCiteContributor').on('datachanged',itemstore.changefunc);
            Ext.getStore('DataCiteContributor').on('update',itemstore.changefunc);
                
        },
        datachanged:function(store,eOpts){
 
//console.log(store.getCount());

        }
    },  
    loaddata: function(data){
	var me=this;
        var item=new PMDMeta.model.escidoc.Item(data);
 
        var href=false;
        var local=false;
        if  (item){
            href=item.get('href');
            local=item.get('local');
        }       

        if (!local || local.length==0){
            var store=Ext.getStore('Item');

            if (!href){
               Ext.Ajax.request({
                 url: 'resources/datacitetemplate.php',							
                 success: function(response, opts) {
                       if (response.responseText.length==0)
                           return;

                       store.unmarshal(response); 
                       store.suspendEvents(false);
                       store.removeAll();
                       store.insert(0,{href:href});
                       store.resumeEvents(true);
                       
                       Ext.getStore('Files').removeAll();
                       Ext.getStore('ItemVersions').removeAll();
		       
		       store.changefunc();

                },
                failure: function(response, opts) {
                   console.log('server-side failure with status code ' + response.status);
                }            
               });                  
            }else{
               Ext.Ajax.request({
                   url: 'resources/retrieve.php?object='+href,							
                   success: function(response, opts) {

                       if (response.responseText.length==0)
                           return;

                       store.unmarshal(response);
                       store.suspendEvents(false);
                       store.removeAll();
                       store.insert(0,{href:href});
                       store.resumeEvents(true);                       

                       store.changefunc();
                       
                       Ext.apply(Ext.getStore('Files').getProxy().extraParams, {
                           object: href, files: 'true'
                       });                        

                       Ext.getStore('Files').reload();

                       Ext.apply(Ext.getStore('ItemVersions').getProxy().extraParams, {
                           object: href, history: 'true'
                       });                          
                  },
                  failure: function(response, opts) {
                     console.log('response: ' + response.responseText)
                     console.log('server-side failure with status code ' + response.status);
                  }
               });                  
           }

            Ext.each(store.eventListeningStores, function(storename){
                Ext.getStore(storename).on('datachanged',store.changefunc);
                Ext.getStore(storename).on('update',store.changefunc);            
            });    
            Ext.getStore('DataCiteContributor').on('datachanged',store.changefunc);
            Ext.getStore('DataCiteContributor').on('update',store.changefunc);

       }      
    },
    loadtemplatedata: function(data){

        var item=new PMDMeta.model.escidoc.Item(data);
        var href=item.get('href');
        var store=Ext.getStore('Item');
        Ext.Ajax.request({
            url: 'resources/retrieve.php?object='+href,							
            success: function(response, opts) {

                if (response.responseText.length==0)
                    return;

                store.unmarshal(response);
                store.suspendEvents(false);
                store.removeAll();
                store.insert(0,{href:null});
                store.resumeEvents(true);
                store.changefunc();
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        });                        
    },    
    unmarshal: function (response){
        var itemstore=Ext.getStore('Item');
        itemstore.changefuncon=false;
           
        Ext.each(itemstore.parsers, function(storename){   
           var store=Ext.getStore(storename);
           store.loadRawData(response);
        }); 
        var contributorstore=Ext.getStore('DataCiteContributor');
        contributorstore.loadRawData(response);
                
        var contributorroles=new Object();
        var citedpartyroles=new Object();
        var authorkeys=new Object();
               
        var titleindex;
        var titleremove=new Array();
        for (titleindex=1;titleindex<Ext.getStore('DataCiteTitle').getCount();titleindex++)
            titleremove.push(titleindex);       
        Ext.getStore('DataCiteTitle').remove(titleremove);
        
        //collect cited responsible party roles
        var isoCitedResponsiblePartyStore = Ext.getStore('isoCitedResponsibleParty');
        isoCitedResponsiblePartyStore.loadRawData(response);
        isoCitedResponsiblePartyStore.each(function(citedparty){                         
        var key=citedparty.get('name').trim()+citedparty.get('affiliation');           
        if (key){
            if (!citedpartyroles[key])
                citedpartyroles[key]=new Array();
                var role=citedparty.get('isorole').trim();
                if (role.length>0)
                    citedpartyroles[key].push(role);                 
            }
        });

        //collect author keys
        Ext.getStore('DataCiteAuthor').each(function(author){
            var key=author.getKey();
            if (!authorkeys[key])
                authorkeys[key]=new Array();            
        });
        //set roles for authors
        Ext.getStore('DataCiteAuthor').each(function(author){
            var key=author.get('name').trim()+author.get('affiliation').trim();

            if (citedpartyroles[key] && citedpartyroles[key].length>0){
                var role="";
                Ext.each(citedpartyroles[key], function(rolename){
                    if (role.length>0)
                        role+=",";
                    role+=rolename;
                });
                author.set("role",role);
            }
        });	

        //collect contributor roles
        contributorstore.each(function(contributor){                         
            var key=contributor.getKey();           
            if (key){
                if (!contributorroles[key])
                    contributorroles[key]=new Array();
                var role=contributor.get('role').trim();
                if (role.length>0)
                    contributorroles[key].push(role);           
            }
        });

        //delete contributors that are authors
        var delcontrib=new Array();
        contributorstore.each(function(contributor){
            var key=contributor.getKey();
            if (authorkeys[key]){
                delcontrib.push(contributor);
            }
        });
        contributorstore.remove(delcontrib);

        var contributorgroup=new Object();
        contributorstore.each(function(contributor){
            var key=contributor.getKey();
            if (!contributorgroup[key])
                contributorgroup[key]=new Array();
            contributorgroup[key].push(contributor);            
        });
        
        delcontrib=new Array();
        for (var key in contributorgroup){
            var c=contributorgroup[key].pop();
            
            if (c && contributorroles[key] && contributorroles[key].length>0){
                var role="";
                Ext.each(contributorroles[key], function(rolename){
                    if (role.length>0)
                        role+=",";
                    role+=rolename;
                });
                c.set("role",role);
            }
            
            
            Ext.each(contributorgroup[key], function(elem){
                delcontrib.push(elem);
            });
        }
        contributorstore.remove(delcontrib);
        
        //Thesaurus Keywords
        var delkeywords=[];
        Ext.getStore('DataCiteSubjectGCMD').each(function(keyword){
           var subject=keyword.get('subject');
           var subjectScheme=keyword.get('subjectScheme');
           if (!subject || (subject && subject.length===0) || (subjectScheme.length===0))
                delkeywords.push(keyword);   
        });
        Ext.getStore('DataCiteSubjectGCMD').remove(delkeywords);
        
        //IEDA Keywords
        delkeywords = [];
        Ext.getStore('DataTypes').each(function(keyword){
           subject=keyword.get('subject');
           subjectScheme=keyword.get('subjectScheme');
           if (subjectScheme.indexOf("IEDA") === -1 || !subject || (subject && subject.length===0) || (subjectScheme.length===0))
                delkeywords.push(keyword);   
        });
        Ext.getStore('DataTypes').remove(delkeywords);

        //Free Keywords
        delkeywords = [];
        Ext.getStore('DataCiteSubject').each(function(keyword){
           subject=keyword.get('subject');
           subjectScheme=keyword.get('subjectScheme');
           //Remove any IEDA keywords
           if (subjectScheme.indexOf("IEDA") !== -1 || !subject || (subject && subject.length===0) || (subjectScheme.length===0))
                delkeywords.push(keyword);
           // Ext.getStore('DataTypes').each(function(IEDAkeyword){
           //      IEDAsubject=IEDAkeyword.get('subject');
           //      if (subject == IEDAsubject)
           //          delkeywords.push(keyword); 
           //  }); 
        });
        Ext.getStore('DataCiteSubject').remove(delkeywords);


       //points only have "min"-Values
        var extentstore=Ext.getStore('isoExtent'); 
        extentstore.each( function (isogeo){                
                        if (isogeo.get('lonmin')===isogeo.get('lonmax'))
                            isogeo.set('lonmax',"");
                        if (isogeo.get('latmin')===isogeo.get('latmax'))
                            isogeo.set('latmax',"");        
        });
        //compare iso and datacite stores for geographical references and copy missing ones to the iso store
        Ext.getStore('DataCiteGeoLocation').each(
            function(dcgeo){
                var found=false;
                var extentstore=Ext.getStore('isoExtent');
                extentstore.each(
                    function(isogeo){
                        if (
                                (dcgeo.get('latmin')===isogeo.get('latmin') && //compare bboxes
                                dcgeo.get('latmax')===isogeo.get('latmax') &&
                                dcgeo.get('lonmin')===isogeo.get('lonmin') &&
                                dcgeo.get('lonmax')===isogeo.get('lonmax') &&
                                dcgeo.get('place')===isogeo.get('description')) 
                                ||
                                (dcgeo.get('latmin')===isogeo.get('latmin') && //compare geolocation-point with iso bbox
                                dcgeo.get('latmin')===isogeo.get('latmax') &&
                                dcgeo.get('lonmin')===isogeo.get('lonmin') &&
                                dcgeo.get('lonmin')===isogeo.get('lonmax') &&
                                dcgeo.get('place')===isogeo.get('description'))     
                            )
                            found=true;
                });
                if (!found){
                    var count=extentstore.getCount();
                    if (count>0)
                        count--;
                    extentstore.insert(count,
                        {latmin:dcgeo.get('latmin'),latmax:dcgeo.get('latmax'),
                         lonmin:dcgeo.get('lonmin'),lonmax:dcgeo.get('lonmax'),
                         description:dcgeo.get('place')});
                }
         });

        
        //points only have "min"-Values
        var difspatialcoveragestore=Ext.getStore('difSpatialCoverage'); 
        difspatialcoveragestore.each( function (difgeo){                
                        if (difgeo.get('lonmin')===difgeo.get('lonmax'))
                            difgeo.set('lonmax',"");
                        if (difgeo.get('latmin')===difgeo.get('latmax'))
                            difgeo.set('latmax',"");        
        });
        //compare iso and dif stores for geographical references and copy missing ones to the iso store         
        difspatialcoveragestore.each(
            function(difgeo){
                var found=false;
                var extentstore=Ext.getStore('isoExtent');
                extentstore.each(
                    function(isogeo){
                        if (
                                (difgeo.get('latmin')===isogeo.get('latmin') && //compare bboxes
                                difgeo.get('latmax')===isogeo.get('latmax') &&
                                difgeo.get('lonmin')===isogeo.get('lonmin') &&
                                difgeo.get('lonmax')===isogeo.get('lonmax'))     
                            )
                            found=true;
                });
                if (!found){
                    var count=extentstore.getCount();
                    if (count>0)
                        count--;
                    extentstore.insert(count,
                        {latmin:difgeo.get('latmin'),latmax:difgeo.get('latmax'),
                         lonmin:difgeo.get('lonmin'),lonmax:difgeo.get('lonmax')});
                }
         });         
         
        var dcdates=new Array();
        Ext.getStore('DataCiteDate').each(function(date){
            if (date.get('dateType')==='Collected')
                dcdates.push(date);            
        });
        Ext.each(dcdates, function(dcdate){ 
            var found=false;
            var extentstore=Ext.getStore('isoExtent');
            extentstore.each(function(isodate){
               if (!found && isodate.get('dateFrom')===dcdate.get('dateFrom') && isodate.get('dateTo')===dcdate.get('dateTo') &&
                   isodate.get('timeFrom')===dcdate.get('timeFrom') && isodate.get('timeTo')===dcdate.get('timeTo'))
                   found=true;
            });
            if (!found){
                var count=extentstore.getCount();
                if (count>0)
                    count--;
                extentstore.insert(count,
                    {dateFrom:dcdate.get('dateFrom'),dateTo:dcdate.get('dateTo'),
                     timeFrom:dcdate.get('timeFrom'),timeTo:dcdate.get('timeTo')});                                
            }
        })
        Ext.getStore('DataCiteDate').remove(dcdates);
      
  //      Ext.getStore('isoDatasetContact').uniqueByKey();
  //      Ext.getStore('isoCitedResponsibleParty').uniqueByKey();
  
        var isoauthorswithpositoin=new Array();
        var dcauthorswithotherrole=new Array();
         Ext.getStore('isoCitedResponsibleParty').each(function(isoauthor){
             if (isoauthor.get('isoposition') && isoauthor.get('isoposition').length>0 && isoauthor.get('isorole')=='author')
                 isoauthorswithpositoin.push(isoauthor);
         });
         
         Ext.getStore('DataCiteAuthor').each(function(dcauthor){
             if (dcauthor.get('role') && dcauthor.get('role').indexOf('Other')>-1)
                 dcauthorswithotherrole.push(dcauthor);
         });
         
         Ext.each(isoauthorswithpositoin, function(isoauthor){
             Ext.each(dcauthorswithotherrole, function(dcauthor){
                 if (dcauthor.get('name')===isoauthor.get('name') && 
                      dcauthor.get('affiliation')===isoauthor.get('affiliation'))
                  dcauthor.set('position',isoauthor.get('isoposition'));
             });
         })
         
         if (Ext.getStore('DataCiteResource').getCount()>0){
             var rs=Ext.getStore('DataCiteResource').getAt(0);
             if (rs.get("identifiertype")!=="DOI")
                 rs.set("identifiertype","DOI"); 
         }
         
        if (Ext.getStore('isoMD_Metadata').getCount()==0)
            Ext.getStore('isoMD_Metadata').add(Ext.create("PMDMeta.model.iso.MD_Metadata"));

        if (Ext.getStore('isoIdentificationInfo').getCount()==0)
            Ext.getStore('isoIdentificationInfo').add(Ext.create("PMDMeta.model.iso.IdentificationInfo"));
        
       
        itemstore.changefuncon=true;
        
        Ext.getStore('DataCiteDate').fireEvent("load");
    },
    marshal: function (){ 

        var resjson=this.marshalJSON();
        var resource="";
        var iso="";
        var dif="";
        
        Ext.each(resjson,function(data){
                for (var key in data){
                    var item=data[key];
                    var mdrecords=item['mdrecords'];
                    Ext.each(mdrecords, function(mdrecord){
                        if (mdrecord['datacite'])
                            resource=mdrecord['datacite'];
                        if (mdrecord['iso19115'])
                            iso=mdrecord['iso19115'];
                        if (mdrecord['dif'])
                            dif=mdrecord['dif'];
                    });
                }

        });

        var retval="";
        if (iso.length>0)
            retval= '<?xml version="1.0" encoding="UTF-8"?>\n<envelope>\n\n'+resource+'\n\n'+iso+'\n\n'+dif+'\n\n</envelope>'
        else
            retval=resource;
              
        return retval;


    },
    marshalJSON: function(){

        
        var mdrecord=new Object();
        mdrecord['datacite']=this.marshalDataCite();
        var item=new Object();
        item.mdrecords=new Array();
        item.mdrecords.push(mdrecord);       

        mdrecord=new Object();
        mdrecord['escidoc']=this.marshalEscidoc();
        item.mdrecords.push(mdrecord);

        mdrecord=new Object();
        mdrecord['iso19115']=this.marshalISO();
        item.mdrecords.push(mdrecord);

        mdrecord=new Object();
        mdrecord['dif']=this.marshalDIF();
        item.mdrecords.push(mdrecord);
        
        
        item.components=Ext.getStore("Files").asXML();

        var escidocitem=new Object();
        var href=null;
        if (this.getAt(0))
            href=this.getAt(0).get('href');
        escidocitem[href]=item;
       
//        console.log(JSON.stringify(escidocitem));        
        
        return escidocitem;
                
    },
    marshalEscidoc: function(){
        var resource='<resource>';
    //    resource+=Ext.getStore('EscidocTitle').asXML();
    //    resource+=Ext.getStore('EscidocDate').asXML();
    //    resource+=Ext.getStore('EscidocAuthor').asXML();
        resource+=Ext.getStore('DataCiteTitle').asEscidocXML();
        resource+=Ext.getStore('DataCiteDate').asEscidocXML();
        resource+=Ext.getStore('DataCiteAuthor').asEscidocXML();    
    
        resource+='</resource>';
        return resource;
    },
    marshalDataCite: function(){
        var dcgeostore=Ext.getStore('DataCiteGeoLocation');
        dcgeostore.removeAll(true);
        Ext.getStore('isoExtent').each(function (isogeo){
           dcgeostore.add({latmin:isogeo.get('latmin'),latmax:isogeo.get('latmax'),
                          lonmin:isogeo.get('lonmin'),lonmax:isogeo.get('lonmax'),
                          place:isogeo.get('description')});      
        });
        
        var resource='<resource xsi:schemaLocation="http://datacite.org/schema/kernel-3 http://schema.datacite.org/meta/kernel-3/metadata.xsd" xmlns="http://datacite.org/schema/kernel-3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
        var dcrs=Ext.getStore('DataCiteResource');
        var dcrsopt=Ext.getStore('DataCiteResourceOpt');
        resource+=dcrs.asXML('identifier');
        
//console.log(dcrs.asXML('identifier'));
        
        resource+=Ext.getStore('DataCiteAuthor').asXML();
        resource+=Ext.getStore('DataCiteTitle').asXML();
        resource+=dcrs.asXML('publisher');
        resource+=dcrs.asXML('publicationYear');
        var subjects="";
        subjects+=Ext.getStore('DataCiteSubject').asXML();  
        subjects+=Ext.getStore('DataTypes').asXML();
        if (subjects.length>0)
            resource+="<subjects>"+subjects+"</subjects>";

        var contributors="";
        contributors+=Ext.getStore('DataCiteAuthor').asContributorXML();
	    contributors+=Ext.getStore('DataCiteContributor').asXML();
        if (contributors.length>0)
            resource+="<contributors>"+contributors+"</contributors>";

      //  resource+=Ext.getStore('DataCiteDate').asXML();	

        var dates=Ext.getStore('DataCiteDate').asXML();
 //       console.log(dates);
        dates+=Ext.getStore('isoExtent').asDataCiteXML();
        if (dates.length>0)
            resource+='<dates>'+dates+'</dates>';
        
        resource+=dcrsopt.asXML('language');
        resource+=dcrsopt.asXML('resourceType');							
        resource+=Ext.getStore('DataCiteAlternateIdentifier').asXML();	
        resource+=Ext.getStore('DataCiteRelatedIdentifier').asXML();	
//        resource+=Ext.getStore('DataCiteSize').asXML();
//        resource+=Ext.getStore('DataCiteFormat').asXML();
        resource+=Ext.getStore('Files').asDataCiteXML('size');
        resource+=Ext.getStore('Files').asDataCiteXML('format');        
        resource+=dcrsopt.asXML('version');							
        resource+=Ext.getStore('DataCiteRight').asXML();
        resource+=Ext.getStore('DataCiteDescription').asXML();
        resource+=Ext.getStore('DataCiteGeoLocation').asXML();
        resource+='</resource>';
        return resource;
     },
  marshalISO: function(){
        var mdmeta=Ext.getStore('isoMD_Metadata');
        var datasetcontact=Ext.getStore('isoDatasetContact');
        var identificationinfo=Ext.getStore('isoIdentificationInfo');
        var iso='<gmd:MD_Metadata xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.isotc211.org/2005/gmd http://www.isotc211.org/2005/gmd/gmd.xsd" >';
        iso+=mdmeta.asXML('fileidentifier');
        iso+=mdmeta.asXML('language');
        iso+=mdmeta.asXML('characterset');
        iso+=mdmeta.asXML('hierarchylevel');
        iso+=mdmeta.asXML('hierarchylevelname');
        iso+=this.getISOMetadataContact();
        iso+=mdmeta.asXML('datestamp');            
        iso+=mdmeta.asXML('referencesystem'); 
        iso+='<gmd:identificationInfo>';
        iso+='<gmd:MD_DataIdentification>';
        iso+='<gmd:citation><gmd:CI_Citation>';
       // iso+=identificationinfo.asXML('title');
        iso+=Ext.getStore('DataCiteTitle').asISOXML();
        
        var creationdate=Ext.getStore('DataCiteDate').asISOXML('created');  
        
        if (creationdate && creationdate.length>0){
            iso+=creationdate;
        }else{
            var dt=new Date();
            dt.setTime(Date.now());          
            var revisiondate="";
            revisiondate+='<gmd:date>';
            revisiondate+='<gmd:CI_Date>';
            revisiondate+='<gmd:date>';
            revisiondate+='<gco:Date>'+Ext.Date.format(dt,'Y-m-d')+'</gco:Date>';
            revisiondate+='</gmd:date>';
            revisiondate+='<gmd:dateType>';
            revisiondate+='<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="revision">revision</gmd:CI_DateTypeCode>';
            revisiondate+='</gmd:dateType>';
            revisiondate+='</gmd:CI_Date>';
            revisiondate+='</gmd:date>';
            iso+=revisiondate;
        }
        
       // iso+=Ext.getStore('isoCitedResponsibleParty').asXML();
        iso+=Ext.getStore('DataCiteAuthor').asISOXML();
        iso+="</gmd:CI_Citation></gmd:citation>";
        iso+=Ext.getStore('DataCiteDescription').asISOXML();        
       // iso+=identificationinfo.asXML('abstract');
        iso+=identificationinfo.asXML('status');                
        iso+=datasetcontact.asXML();
        iso+=Ext.getStore('DataCiteSubject').asISOXML();
        iso+=Ext.getStore('DataCiteSubjectGCMD').asISOXML();
        iso+=Ext.getStore('DataTypes').asISOXML();
        iso+=Ext.getStore('DataCiteRight').asISOXML();        
        iso+=identificationinfo.asXML('language');
        iso+=identificationinfo.asXML('isotopic');
//        iso+=Ext.getStore('DataCiteGeoLocation').asISOXML();
        iso+=Ext.getStore('isoExtent').asXML();
        iso+=Ext.getStore('DataCiteDate').asISOXML('coverage');
        iso+='</gmd:MD_DataIdentification>';
        iso+='</gmd:identificationInfo>';             
	
	iso+=mdmeta.asXML('distributioninfo');

        iso+='</gmd:MD_Metadata>';
        return iso;
  },
  marshalDIF: function(){
      
    var dif="";
    dif+='<dif:DIF xmlns:dif="http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/ http://gcmd.nasa.gov/Aboutus/xml/dif/dif_v9.8.2.xsd">';
    dif+=Ext.getStore('DataCiteResource').asDifXML('entryid');
    dif+=Ext.getStore('DataCiteTitle').asDifXML('entry');
    dif+='<dif:Data_Set_Citation>'
    dif+=Ext.getStore('DataCiteAuthor').asDifXML();
    dif+=Ext.getStore('DataCiteTitle').asDifXML('citation');
    dif+=Ext.getStore('DataCiteResource').asDifXML('publicationYear');
    dif+='<dif:Dataset_Release_Place>Potsdam, Germany</dif:Dataset_Release_Place>';
    dif+=Ext.getStore('DataCiteResource').asDifXML('publisher');
    dif+=Ext.getStore('DataCiteResource').asDifXML('identifierlink');  
    dif+='</dif:Data_Set_Citation>'
    dif+=Ext.getStore('DataCiteSubjectGCMD').asDifXML('scienceparamenters');
    dif+='<dif:ISO_Topic_Category>geoscientificInformation</dif:ISO_Topic_Category>'
    dif+=Ext.getStore('DataCiteSubjectGCMD').asDifXML('keyword');
    dif+=Ext.getStore('DataCiteSubject').asDifXML('keyword');
    dif+=Ext.getStore('DataTypes').asDifXML('scienceparamenters'); 
    dif+=Ext.getStore('isoExtent').asDifXML(); 
    dif+=Ext.getStore('difProject').asDifXML();   
    dif+='<dif:Data_Center>';
    dif+='<dif:Data_Center_Name>';
    dif+='<dif:Short_Name>Deutsches GeoForschungsZentrum GFZ</dif:Short_Name>';
    dif+='<dif:Long_Name>GFZ</dif:Long_Name>';
    dif+='</dif:Data_Center_Name>';
    dif+='<dif:Personnel>';
    dif+='<dif:Role>DATA CENTER CONTACT</dif:Role>';
    dif+='<dif:Last_Name>Deutsches GeoForschungsZentrum GFZ</dif:Last_Name>';
    dif+='</dif:Personnel>';
    dif+='</dif:Data_Center>';
    dif+=Ext.getStore('DataCiteDescription').asDifXML();
    dif+='<dif:Metadata_Name>DIF</dif:Metadata_Name>';
    dif+='<dif:Metadata_Version>9.8.2</dif:Metadata_Version>';
    dif+='</dif:DIF>';
    return dif;
  },
    synccontent: function (){
        var param=this.marshalJSON();
        var stringparam=JSON.stringify(param);
        var me =this;
       
        var progress=Ext.Msg.wait('Please wait', 'Syncing dataset');
       
        var oldhref=Ext.getStore('Item').getAt(0).get("href");

//        console.log(oldhref); //display ID
      
        Ext.Ajax.request({
            url:'resources/update.php',
            method: 'POST',
            params:{
                objects: stringparam
            },
            success: function(response, opts){
                var data=Ext.JSON.decode(response.responseText);
                if (data.success){
                    if (oldhref.length===0){
                        window.location.href="?object="+data.object+"&formview=bib";
                    }else{                    
                        var store=Ext.getStore('Item');
                        store.loaddata({href:data.object});
                        progress.close();

                        if (data.message.length>0)
                            Ext.Msg.alert("Dataset saved. But there are errors",data.message);                    
                    }
                    
                }else{
                    progress.close();
                    Ext.Msg.alert("Could not save dataset",data.message);
                }              
            },
            failure: function(response, opts) {
                progress.close();
                Ext.Msg.alert("Could not save dataset","Server returned status code " + response.status + " " + response.statusText);               
            }
        });
    },    
    getISOMetadataContact: function(){
        var ret="";
        ret+='<gmd:contact>';
        ret+='<gmd:CI_ResponsibleParty>';
        ret+='<gmd:organisationName>';
        ret+='<gco:CharacterString>GFZ German Research Center for Geosciences</gco:CharacterString>';
        ret+='</gmd:organisationName>';
        ret+='<gmd:contactInfo>';         
        ret+='<gmd:CI_Contact>';         
        ret+='<gmd:address>';
        ret+='<gmd:CI_Address>';
        ret+='<gmd:electronicMailAddress>';
        ret+='<gco:CharacterString></gco:CharacterString>';
        ret+='</gmd:electronicMailAddress>';
        ret+='</gmd:CI_Address>';
        ret+='</gmd:address>';
        ret+='<gmd:onlineResource>';
        ret+='<gmd:CI_OnlineResource>';
        ret+='<gmd:linkage>';
        ret+='<gmd:URL>http://www.gfz-potsdam.de/</gmd:URL>';
        ret+='</gmd:linkage>';
        ret+='<gmd:function>';
        ret+='<gmd:CI_OnLineFunctionCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="information" >information</gmd:CI_OnLineFunctionCode>';
        ret+='</gmd:function>';
        ret+='</gmd:CI_OnlineResource>';
        ret+='</gmd:onlineResource>';
        ret+='</gmd:CI_Contact>';            
        ret+='</gmd:contactInfo>';            
        ret+='<gmd:role>';
        ret+='<gmd:CI_RoleCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_RoleCode" codeListValue="pointOfContact" >pointOfContact</gmd:CI_RoleCode>';
        ret+='</gmd:role>';
        ret+='</gmd:CI_ResponsibleParty>';
        ret+='</gmd:contact>';    
        return ret;
    }
  
});

