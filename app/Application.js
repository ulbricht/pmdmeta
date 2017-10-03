/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('PMDMeta.Application', {
    extend: 'Ext.app.Application',
    requires: [
	'PMDMeta.store.escidoc.Item',
    'PMDMeta.view.main.MainController',
    'PMDMeta.view.main.MainModel'
    ],    
    name: 'PMDMeta',

    launch: function () {

        Ext.Ajax.setTimeout(60*5*1000);//5 minutes ajax timout
        
        // TODO - Launch the application
	var urlparameter=Ext.Object.fromQueryString(location.search.substring(1));
        new PMDMeta.store.escidoc.Item();   
        var itemstore=Ext.getStore('Item'); 
        
        if (urlparameter.formview==="bib"){
		
		
	}else{
		var tabs=Ext.ComponentQuery.query("tab");
		 tabs[1].hide();
		 tabs[2].hide();
		Ext.getCmp('loadbutton').hide();
	}
	    
        if (urlparameter.action==="new"){
            itemstore.loaddata({id:null,href:null,local:null});
        }else if (urlparameter.object && urlparameter.object.length>0){
            if (urlparameter.action==="template"){
                itemstore.loadtemplatedata({id:null,href:urlparameter.object,local:null});                
            }else{
                itemstore.loaddata({id:null,href:urlparameter.object,local:null});
            }
        }else{
            itemstore.load();
        }
        

        Ext.apply(Ext.form.field.VTypes, {
            DataCitePublicationYear:  function(v) {
                var match=/^\d{4}$/;
                return match.test(v);
            },
            DataCitePublicationYearText: 'Must be a four digit year.',
            DataCitePublicationYearMask: /[\d]/i
        });
        Ext.apply(Ext.form.field.VTypes, {
            ARK:  function(v) {
                var match=/^(http:\/\/[a-zA-Z0-9])?ark:\/[\d]+\/.+/;
                return match.test(v);
            },
            ARKText: 'An ark link has to begin with <b>http://NMA/ark:</b> or <b>ark:</b>.',
            ARKMask: /[a-zA-Z0-9_\-\/.:]/i,
            ARKDefault: '10.'
        });
        Ext.apply(Ext.form.field.VTypes, {
            arXiv:  function(v) {
                var match=/^arxiv:.+/;
                return match.test(v);
            },
            arXivText: 'An arxiv link has to begin with <b>arxiv:</b>.',
            arXivMask: /[a-zA-Z0-9_\-\/.:]/i,
            arXivDefault: 'arxiv:'
        });        
        Ext.apply(Ext.form.field.VTypes, {
            bibcode:  function(v) {
                var match=/^[\d{4}].+/;
                return match.test(v);
            },
            bibcodeText: 'The first characters of a bibcode should be a for digit year.',
            bibcodeMask: /[a-zA-Z0-9_\-\/.:]/i
        });
        Ext.apply(Ext.form.field.VTypes, {
            DOI:  function(v) {
                var match=/^10\.[\d]+\/.+/;
                return match.test(v);
            },
            DOIText: 'A DOI has to begin with <b>10.xxxx/<b>.',
            DOIMask: /[a-zA-Z0-9_\-\/\.:]/i,
            DOIDefault: '10.'
        });
        Ext.apply(Ext.form.field.VTypes, {
            EAN13:  function(v) {
                var match=/^[\d{13}]/;
                return match.test(v);
            },
            EAN13Text: 'EAN13 should be 13 digits<b>.',
            EAN13Mask: /[0-9]\-/i
        });        
        Ext.apply(Ext.form.field.VTypes, {
            eISSN:  function(v) {
                var match=/^[\d]+-[\d]+/;
                return match.test(v);
            },
            eISSNText: 'EISSN is made of digits and a hyphen',
            eISSNMask: /[0-9\-]/i
        });        
        Ext.apply(Ext.form.field.VTypes, {
            Handle:  function(v) {
                var match=/^[\d\.]+\/.+/;
                return match.test(v);
            },
            HandleText: 'A handle has to begin with digits or periods and a slash.',
            HandleMask: /[a-zA-Z0-9_\-\/.:]/i
        });        
        Ext.apply(Ext.form.field.VTypes, {
            ISBN:  function(v) {
                var isbn10=/^[\d{1}]((-)?\d){9}/;//old isbn
                var isbn1310=/^978((-)?\d){10}/; //old isbn converted into isbn13               
                var isbn13=/^979(-)?[1-9]((-)?\d){9}/; //isbn13
                return isbn1310.test(v) || isbn10.test(v) || isbn13.test(v);
            },
            ISBNText: 'Enter ISBN10 or ISBN13 number. The position of hyphens does not matter.',
            ISBNMask: /[0-9\-]/i
        });    
        Ext.apply(Ext.form.field.VTypes, {
            ISSN:  function(v) {
                var match=/^[\d]+-[\d]+/;
                return match.test(v);
            },
            ISSNText: 'Enter ISSN number. The position of hyphens does not matter.',
            ISSNMask: /[a-zA-Z0-9_\-\/.:]/i
        });                   
        Ext.apply(Ext.form.field.VTypes, {
            ISTC:  function(v) {
                var match=/^[\d\ a-zA-Z]/;
                return match.test(v);
            },
            ISTCText: 'ISTC consists of 16 numbers or letters.',
            ISTCMask: /[0-9a-zA-Z\ ]/i
        });           
        Ext.apply(Ext.form.field.VTypes, {
            LISSN:  function(v) {
                var match=/^\d{1}((-)?\d)+/;
                return match.test(v);
            },
            LISSNText: 'Enter ISSN number. The position of hyphens does not matter.',
            LISSNMask: /[0-9\-]/i
        });                   
        Ext.apply(Ext.form.field.VTypes, {
            LSID:  function(v) {
                var match=/^[a-zA-Z\d\.]+:[a-zA-Z\d\.]+:[a-zA-Z\d\.]+:[a-zA-Z\d\.]+:[a-zA-Z\d\.]+/;
                return match.test(v);
            },
            LSIDText: 'Enter LSID number. The position of hyphens does not matter.',
            LSIDMask: /[0-9a-zA-Z]/i
        });                           
        Ext.apply(Ext.form.field.VTypes, {
            PMID:  function(v) {
                var match=/^[\d]+/;
                return match.test(v);
            },
            PMIDText: 'A PubMed identifier consists of numbers.',
            PMIDMask: /[0-9]/i
        });                   
        Ext.apply(Ext.form.field.VTypes, {
            PURL:  function(v) {
                var match=/^http:\/\/[a-zA-Z0-9\-\.](\/.*)+/;
                return match.test(v);
            },
            PURLText: 'A PURL identifier starts with http://.',
            PURLMask: /[0-9\-]/i,
            PURLDefault: 'http://'
        });                   
        Ext.apply(Ext.form.field.VTypes, {
            UPC:  function(v) {
                var match=/^[\d]+/;
                return match.test(v);
            },
            UPCText: 'A UPC identifier consists of numbers.',
            UPCMask: /[0-9]/i
        });        
        Ext.apply(Ext.form.field.VTypes, {
            URL:  function(v) {
                var match=/^http:\/\/[a-zA-Z0-9\-\.](\/.*)+/;
                return match.test(v);
            },
            URLText: 'An URL identifier starts with http://.',
            URLMask: /[0-9\-]/i,
            URLDefault: 'http://'
        });              
        Ext.apply(Ext.form.field.VTypes, {
            URN:  function(v) {
                var match=/^urn:[a-zA-Z]+:[a-zA-Z]+:[a-zA-Z]+:/;
                return match.test(v);
            },
            URNText: 'An URN has the syntax <b>urn:<i>NID</i>:<i>NSS</i>:suffix</b>.',
            URNMask: /[a-zA-Z0-9_\-\/\.:]/i,
            URNDefault: 'urn:'
        }); 
        Ext.apply(Ext.form.field.VTypes, {
            floatval:  function(v) {
                var match=/^[\-]?[\d]+[\.\d]*/;
                return match.test(v);
            },
            floatvalText: 'Specify signed numbers in the WGS84 system. Preferably specify 5 decimal places after the decimal point.',
            floatvalMask: /[0-9\.\-]/i
        });  
        Ext.apply(Ext.form.field.VTypes, {
            intval:  function(v) {
                var match=/^[\d]+/;
                return match.test(v);
            },
            intvalText: 'Specify a number.',
            intvalMask: /[0-9]/i
        });          
        Ext.apply(Ext.form.field.VTypes, {
            DATE:  function(v) {
                var match=/^([0-9][0-9][0-9][0-9])(\-(0[1-9]|1[0-2])(\-(0[0-9]|[1-2][0-9]|3[0-1]))?)?$/i;
                return match.test(v);
            },
            DATEText: 'Specify a date in format YYYY, YYYY-MM, or YYYY-MM-DD.',
            DATEMask: /[0-9\-]/i
        });          
        Ext.apply(Ext.form.field.VTypes, {
            TIME:  function(v) {
                var match=/^(0?[1-9]|1[0-9]|2[0-3])(:([0-5][0-9]):([0-5][0-9]))?$/i
                return match.test(v);
            },
            TIMEText: 'Specify a time in format HH:MM:SS.',
            TIMEMask: /[0-9:]/i
        });       
        
Ext.tip.QuickTipManager.init();

// Apply a set of config properties to the singleton
Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
    showDelay: 50,      // Show 50ms after entering target
    dismissDelay: 20000
});        
        
    }
});
