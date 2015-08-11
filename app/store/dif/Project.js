Ext.define('PMDMeta.store.dif.Project', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.dif.Project',
    storeId: 'difProject',
    proxy:{
        type: 'memory',
        reader:{
                type: 'xml',
                record: 'dif|Project'
        }
    },    
    asDifXML: function(){
        var ret="";
        this.each(function(data){			
                var name=data.asDifXML();
                if (name.length>0){
                    ret+=name;
                }
        });

        if (ret.length>0)
            return '<dif:Project>'+ret+'</dif:Project>';
        else
            return "";
    }
});			

