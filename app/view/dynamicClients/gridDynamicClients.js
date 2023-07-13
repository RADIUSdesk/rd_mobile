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
                text	: 'DynamicClients',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
	            	'<div class="grid-tpl-item">',
			            '<div class="item-main">',
			            	'{name}',
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl">NAS-Identifier :</div>',
							"<tpl if='Ext.isEmpty(nasidentifier)'>",
								'<div class="item-value clr-grey-dark">(Not Specified)</div>',
							'<tpl else>',
								'<div class="item-value">{nasidentifier}</div>',
	                		'</tpl>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Called-Station-Id :</div>',
							"<tpl if='Ext.isEmpty(calledstationid)'>",
								'<div class="item-value clr-grey-dark">(Not Specified)</div>',
							'<tpl else>',
								'<div class="item-value">{calledstationid}</div>',
							'</tpl>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Last Contact :</div>',
							"<tpl if='Ext.isEmpty(last_contact)'>",
								'<div class="item-value clr-grey-dark">(Never)</div>',
							'<tpl else>',
								'<tpl if="[this.isRecent(last_contact_human)]==\'green\'">',
									'<div class="item-value clr-green">{last_contact_human}</div>',
								'<tpl else>',
									'<div class="item-value">{last_contact_human}</div>',
								'</tpl>',								
							'</tpl>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">From IP :</div>',
							"<tpl if='Ext.isEmpty(last_contact_ip)'>",
								'<div class="item-value clr-grey-dark">(Not Available)</div>',
							'<tpl else>',
								'<div class="item-value">{last_contact_ip}</div>',
							"</tpl>",
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Realms :</div>',
							'<tpl if="Ext.isEmpty(realms)">',
								'<div class="item-value clr-orange">Available to all!</div><tpl else>',
								'<div class="item-value">',
								'<tpl for="realms">',     
                            		"{name}<br>",
                        		'</tpl>',
                        		'</div>',
							'</tpl>',		                        
						'</div>',
	                '</div>',
	                {
			            isRecent: function(value_human) {
			            	var color = 'grey';
			            	if(
					            (value_human.match(/just now/g))||
					            (value_human.match(/minute/g))||
					            (value_human.match(/second/g))
					        ){
					            color = 'green';
					        }
	        				return color;
	    				}
	    			}
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
