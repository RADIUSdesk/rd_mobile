// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.devices.gridDevices', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridDevices',
    emptyText: 'No Devices Found',
    config  : {
        compdata: undefined,
    },
    requires: [
        'Ext.grid.plugin.PagingToolbar'
    ],
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
		mode: 'single'
	},
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mDevice', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/devices/index.json',
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
                	this.up('cntDevices').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">DEVICES</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text	: 'Devices',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
			            '<div class="item-main">',
			            	'{description}',
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-user fa-1x"></i> Owner :</div>',					
							'<div class="item-value">{permanent_user}</div>',
						'</div>',
                    	'<div class="two-columns-grid">',
							'<div class="item-lbl">MAC Address :</div>',					
							'<div class="item-value">{name}</div>',
						'</div>',				
			            '<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-cubes fa-1x"></i> Profile :</div>',					
							'<div class="item-value">{profile}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-volleyball-ball fa-1x"></i> Realm :</div>',					
							'<div class="item-value">{realm}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Last Accept :</div>',
							"<tpl if='last_accept_time_in_words==\"Never\"'>",
								'<div class="item-value clr-grey-dark">(Never)</div>',
							'<tpl else>',
								'<div class="item-value">{last_accept_time_in_words}</div>',
							'</tpl>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Last Reject :</div>',
							"<tpl if='last_reject_time_in_words==\"Never\"'>",
								'<div class="item-value clr-grey-dark">(Never)</div>',
							'<tpl else>',
								'<div class="item-value">{last_reject_time_in_words}</div>',
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
    }
 });
