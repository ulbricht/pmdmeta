/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */

Ext.define('PMDMeta.view.main.FileDownloader', {
    extend:'Ext.window.Window',
    xtype: 'PMDFileDownloader',
    title:'Click metadata file to download',
    height: 200,
    width: 400,
    bodyPadding: 10, 
    pmdchildid:false,
    layout:  {
                 type: 'vbox'
    },
    setlink: function(url, filename){      
             var c=Ext.create('Ext.Component',{
                             autoEl: {tag: 'a',target:"_blank", href: url, html: filename}                                               
                             });
             if (this.pmdchildid)
                 this.remove(this.pmdchildid);
             this.add(c);          
    }
});