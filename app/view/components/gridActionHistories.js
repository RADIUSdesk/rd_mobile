// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.gridActionHistories', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridActionHistories',
    emptyText: 'No Items Found',

    hideHeaders: true,
    rowLines: true,
    trackMouseOver: false,
    viewConfig: {
        stripeRows: false
    },
    rowLines: false,
    disableSelection: true,
    plugins: {
        gridpagingtoolbar: true
    },
    selectable: {
		//rows: true,
		mode: 'single',
		//columns: false
	},
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
        	autoLoad: false,
            model: 'RdMobile.model.mApList', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/aps/index.json',
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
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text	: 'APs',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
			            '<div class="item-main">',
			            	"<tpl if='reboot_flag == \"1\"'>",
		            			'<i class="fa fa-power-off" style="color:orange;"></i>  ',
		            		'</tpl>',	
			            	'{name}',
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-cubes fa-1x"></i> AP Profile :</div>',					
							'<div class="item-value">{ap_profile}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-cogs fa-1x"></i> Config Fetched :</div>',
							'<tpl if="[Ext.ux.isRecent(config_fetched_human)]==\'green\'">',
								'<div class="item-value clr-green">{config_fetched_human}</div>',
							'<tpl else>',
								'<div class="item-value clr-grey-dark">{config_fetched_human}</div>',
							'</tpl>',						
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-heartbeat fa-1x"></i> Heartbeat :</div>',
							'<tpl if="[Ext.ux.isRecent(last_contact_human)]==\'green\'">',
								'<div class="item-value clr-green">{last_contact_human}</div>',
							'<tpl else>',
								'<div class="item-value clr-orange">{last_contact_human}</div>',
							'</tpl>',
						'</div>',					
                    '</div>',
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            }]);
		this.callParent();
		//console.log(this._record)      
    }
 });
