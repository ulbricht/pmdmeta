Ext.define('PMDMeta.model.dif.Project', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'shortname',  type: 'string',mapping :function(data) {
            return Ext.DomQuery.selectValue('dif|Short_Name',data);
	}}
    ],
    asDifXML: function(){            
        var result="";
        if (this.get('shortname').length>0) 
                result+='<dif:Short_Name>'+this.get('shortname')+'</dif:Short_Name>';			
        return result;
    }
});