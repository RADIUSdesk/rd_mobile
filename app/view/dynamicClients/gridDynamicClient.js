Ext.define('RdMobile.view.dynamicClients.gridDynamicClients', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridDynamicClients',
    emptyText: 'No Dynamic Clients Available',
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
            model: 'RdMobile.model.mDynamicClient', 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/dynamic-clients/index.json',
                pageSize	: 50,
                batchActions: true,
                format      : 'json',
                reader: {
			        type: 'json',
			        rootProperty: 'items',
			        messageProperty: 'message',
			        totalProperty: 'totalCount' //Required for dynamic paging
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
                	this.up('cntDynamicClients').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">RADIUS Clients</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text: 'DynamicClients',
                xtype: 'templatecolumn',                             
                cell: {
					encodeHtml: false,
					tpl: new Ext.XTemplate(
                	'<div style="border-radius: 5px;border: 1px solid #a3aeb8;padding: 2px; margin: 2px;text-align: center; color:#0677c7">',
		                '<div style="font-size: large;">',
		                	' {name}',
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
