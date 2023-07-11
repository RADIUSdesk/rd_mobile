Ext.define('RdMobile.view.nas.gridNas', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridNas',
    emptyText: 'No NAS Available',
    config  : {
        compdata: undefined,
    },
    hideHeaders: true,
    rowLines: true,
    trackMouseOver: false,
    viewConfig: {
        stripeRows: false
    },
    rowLines: false,
    disableSelection: true,
    selectable: {
		mode: 'single'
	},
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mNas', 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/nas/index.json',
                pageSize	: 50,
                batchActions: true,
                format      : 'json',
                reader: {
			        type: 'json',
			        rootProperty: 'items',
			        messageProperty: 'message',
			        totalProperty: 'totalCount' //Required for  paging
			    }
            },
            listeners: {
            	load: function(store, records, successful) {
                    if(!successful){
                        console.log('Error encountered');
                    } 
                },
                exception: function(proxy, response, options) {
		            var jsonData = response.responseJson;
		            console.log('Error encountered');
		        },
		        metachange : function(store,meta,options) {
                	this.up('cntNas').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">NASes</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text: 'NAS',
                xtype: 'templatecolumn',                             
                cell: {
					encodeHtml: false,
					tpl: new Ext.XTemplate(
                	'<div style="border-radius: 5px;border: 1px solid #a3aeb8;padding: 2px; margin: 2px;text-align: center; color:#0677c7">',
		                '<div style="font-size: large;">',
		                	' {nasname}',
		                '</div>',
                    '</div>',
                ),
				},
                flex: 1
            }]);
        me.getStore().reload()		
		this.callParent();     
    }
 });
