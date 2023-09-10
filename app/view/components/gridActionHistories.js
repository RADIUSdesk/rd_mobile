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
		        metachange : function(store,meta,options) {
                	this.up('cntActionHistories').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">ACTIONS</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl">Action :</div>',					
							"<tpl if='action == \"execute\"'><div class=\"item-value clr-grey-dark\"><i class=\"fa fa-cogs\"></i> Execute</div></tpl>",
              				"<tpl if='action == \"execute_and_reply\"'><div class=\"item-value clr-green\"><i class=\"fa fa-cogs\"></i> Execute <i class=\"fa fa-comment\"></i> Reply</div></tpl>",  							
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Command :</div>',					
							'<div class="item-value" style="font-size:xx-small;">{command}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Status :</div>',
							"<tpl if='status == \"awaiting\"'><div class=\"item-value fieldBlue\"><i class=\"fa fa-clock\"></i> Awaiting</div></tpl>",
                            "<tpl if='status == \"fetched\"'><div class=\"item-value fieldGreenWhite\"><i class=\"fa fa-check-circle\"></i> Fetched</div></tpl>",
                            "<tpl if='status == \"replied\"'><div class=\"item-value fieldTealWhite\"><i class=\"fa fa-comment\"></i> Replied</div></tpl>",                  
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Created :</div>',					
							'<div class="item-value">{created_in_words}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Modified :</div>',					
							'<div class="item-value">{modified_in_words}</div>',
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
