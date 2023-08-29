// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.bans.gridBans', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridBans',
    emptyText: 'No Items Available',
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
    selectable: {
		mode: 'single'
	},
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
            fields: [
			   {name: 'id',   	type: 'int'},
			   {name: 'mac', 	type: 'string'},
			   {name: 'alias', 	type: 'string'},
			   {name: 'cloud_wide', 	type: 'bool'},
			   {name: 'mesh_name', 		type: 'string'},
			   {name: 'ap_profile_name',type: 'string'},
			   {name: 'cloud_id', 		type: 'int'},
			   {name: 'mesh_id', 		type: 'int'},
			   {name: 'ap_profile_id', 	type: 'int'},
			   {name: 'created',        type: 'date'},
         	   {name: 'modified',       type: 'date'}
		   	],
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/bans/index.json',
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
                	this.up('cntBans').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">BANS</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                xtype: 'templatecolumn',                             
                cell: {
					encodeHtml: false,
					tpl: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
	                	'<div class="item-main">',
			            	'{mac}',
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl">Created :</div>',	
							'<tpl if="[Ext.ux.isRecent(created_in_words)]==\'green\'">',
								'<div class="item-value clr-green">{created_in_words}</div>',
							'<tpl else>',
								'<div class="item-value">{created_in_words}</div>',
							'</tpl>',								
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Modified :</div>',	
							'<tpl if="[Ext.ux.isRecent(modified_in_words)]==\'green\'">',
								'<div class="item-value clr-green">{modified_in_words}</div>',
							'<tpl else>',
								'<div class="item-value">{modified_in_words}</div>',
							'</tpl>',								
						'</div>',
                    '</div>'
                ),
				},
                flex: 1
            }]);	
		this.callParent();     
    }
 });
