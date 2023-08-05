Ext.define('RdMobile.view.aps.gridAccessPointExits', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridAccessPointExits',
    emptyText: 'No Exits Found',
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
            model: 'RdMobile.model.mAccessPointExit', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url     	: '/cake4/rd_cake/ap-profiles/ap-profile-exits-index.json',
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
                	this.up('cntApProfiles').down('#lblMeta').setData(meta);
                },
                scope: this
            }
        }));
        
        me.setColumns( [{
                text	: 'Exits',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
			            '<div class="item-main">',
			            	'<tpl if="type==\'bridge\'"><i class="fa fa-bars"></i> Bridge </tpl>',
                    		'<tpl if="type==\'captive_portal\'"><i class="fa fa-key"></i> Captive Portal </tpl>',
                    		'<tpl if="type==\'nat\'"><i class="fa fa-arrows-alt"></i> NAT+DHCP </tpl>',
                    		'<tpl if="type==\'tagged_bridge\'"><i class="fa fa-tag"></i> Layer 2 Tagged Ethernet Bridge (&#8470; {vlan}) </tpl>',
                    		'<tpl if="type==\'openvpn_bridge\'"><i class="fa fa-quote-right"></i> OpenVPN Bridge </tpl>',
                    		'<tpl if="type==\'tagged_bridge_l3\'"><i class="fa fa-tag"></i> Layer 3 Tagged Ethernet Bridge (&#8470; {vlan}) </tpl>',		            	
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl">Connects With :</div>',
							'<div class="item-value">',
								'<tpl if="(Ext.isEmpty(connects_with)&&(type!=\'tagged_bridge_l3\'))">',//FIXME Try to figure out why it cant connect to no-one 
								 	'<span class="clr-red"><i class="fa fa-exclamation-circle"></i> No One</span>',
								 '</tpl>',
						        '<tpl for="connects_with">', 
						            '<tpl>{name} </tpl>',
						        '</tpl>',
						  	'</div>',
						'</div>',			            
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Firewall Profile :</div>',
							'<div class="item-value">',
								'<tpl if="apply_firewall_profile"><i class="fas fa-fire"></i>  {firewall_profile_name}',
                    			'<tpl else>',
                    				'<i class="fa fa-times-circle"></i> No Active Firewall',
                    			'</tpl>',   
						  	'</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Auto Detect :</div>',
							'<div class="item-value">',
								'<tpl if="auto_detect">',
									'<i class="fa fa-check-circle"></i> Yes',
						        '<tpl else>',
						        	'<i class="fa fa-times-circle"></i> No',
						        '</tpl>', 
						  	'</div>',
						'</div>',			
                    '</div>',
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            }]);	
		this.callParent();    
    }
 });
