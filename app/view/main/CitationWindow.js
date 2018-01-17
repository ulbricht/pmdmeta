
Ext.define('PMDMeta.view.main.CitationWindow',{		
	extend: 'Ext.window.Window',
	requires:[
			'PMDMeta.view.main.CitationWindowController',
			'Ext.grid.Panel',
		        'Ext.selection.CellModel'
	],
        title: 'Citation Editor',
	closeAction: 'hide',
	controller: 'CitationWindowController',		
	items:[
		{
		    xtype: 'grid',
		    width: 900,
		    height: 500,
		    store: 'Citation',
		    plugins: [{
			ptype: 'cellediting'
		    }],
		    columns: [

			    {
				header: 'URL',
				dataIndex: 'url',
				flex: 2,        
				filter: {
				    type: 'string'
				},
				editor: {
				    allowBlank: false
				},
				renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				    var qtip="Put here the URL you wish to add a citation. For DOIs please use <b>http://doi.org/</b>";
				    qtip+=" as prefix to avoid double entries.";
				    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
				    return value;
				}
			    },
			    {
				header: 'Citation',
				dataIndex: 'citation',
				flex: 4,
				filter: {
				    type: 'string'
				},
				editor: { xtype: 'textarea', height:120},
				renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				    var qtip="Add here the citation text.";
				    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
				    return value;
				}
			    },
			    {
				header: 'Timestamp',
				dataIndex: 'datetimecopied',
				flex: 1,
				filter: {
				    type: 'string'
				},
				editor: {
				    allowBlank: true
				},
				renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				    var qtip="Set this field blank for manually entered citations.<br>";
				    qtip+="This field contains the date and time the citation was copied from CrossRef/DataCite!";
				    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
				    return value;
				}
			    }, {
				xtype: 'actioncolumn',
				width: 30,
				sortable: false,
				menuDisabled: true,
				items: [{
				    icon: 'resources/images/icons/fam/delete.gif',
				    tooltip: 'Delete Citation',
				    scope: this,
				    handler: function(grid, rowIndex){
				   	 grid.up('window').fireEvent('RemoveItem',grid,rowIndex);
                                    }
				}]
			    }
		    ],
		    tbar:[
                        '->',
                        {
                            labelWidth: 60,
                            xtype: 'textfield',
                            fieldLabel: 'Search',
                            triggers:{
                                    clearfield:{
                                            cls: 'x-form-clear-trigger',
                                            handler: function() {
                                                     var store = this.up('grid').store;
                                                     this.reset();
                                                     store.clearFilter();
                                                     this.focus();
                                            }				

                                    }
                            }
                        }  
		    ]
		}
		
	]

});
