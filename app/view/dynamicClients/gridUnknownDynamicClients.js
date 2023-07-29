Ext.define('RdMobile.view.dynamicClients.gridUnknownDynamicClients', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridUnknownDynamicClients',
    emptyText: 'No Unknown Dynamic Clients Available',
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
            model: 'RdMobile.model.mUnknownDynamicClient', 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/unknown-dynamic-clients/index.json',
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
                	this.up('cntUnknownDynamicClients').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">New Arrivals</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text	: 'UnknownDynamicClients',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
                		'<div class="two-columns-grid">',
							'<div class="item-lbl">NAS-Identifier :</div>',					
							'<div class="item-value">{nasidentifier}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Last Contact :</div>',
							'<tpl if="[Ext.ux.isRecent(last_contact_human)]==\'green\'">',
								'<div class="item-value clr-green">{last_contact_human}</div>',
							'<tpl else>',
								'<div class="item-value">{last_contact_human}</div>',
							'</tpl>',						
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">From IP :</div>',					
							'<div class="item-value">{last_contact_ip}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Town / City :</div>',					
							'<div class="item-value">',
								"<tpl if='Ext.isEmpty(city)'><div>-</div><tpl else>",
		                    		'<div><b>{city}</b>  ({postal_code})</div>',
		                		"</tpl>",
							'</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Country :</div>',					
							'<div class="item-value">',
								"<tpl if='Ext.isEmpty(country_name)'><div>-</div><tpl else>",
		                    		'<div><b>{country_name}</b> ({country_code})</div>',
		                		"</tpl>",
							'</div>',
						'</div>',
                    '</div>'
                ),                            
                cell	: {
					encodeHtml: false,
				},
                flex: 1
            }]);
        me.getStore().reload()		
		this.callParent();     
    }
 });
