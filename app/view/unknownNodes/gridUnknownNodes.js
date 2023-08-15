// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.unknownNodes.gridUnknownNodes', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridUnknownNodes',
    emptyText: 'No Unknown Nodes Found',
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
		//rows: true,
		mode: 'single',
		//columns: false
	},
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mUnknownNode', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/unknown-nodes/index.json',
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
                	this.up('cntUnknownNodes').down('#lblMeta').setData(meta);
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text	: 'Unknown Nodes',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
			            '<div class="item-main">',
			            	'{mac}',
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl">Last Contact :</div>',
							'<tpl if="[Ext.ux.isRecent(modified_in_words)]==\'green\'">',
								'<div class="item-value clr-green">{modified_in_words}</div>',
							'<tpl else>',
								'<div class="item-value clr-grey-dark">{modified_in_words}</div>',
							'</tpl>',						
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">From IP :</div>',
							'<div class="item-value clr-orange">{from_ip}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Gateway :</div>',
							'<div class="item-value">',
								'<tpl if="gateway"><i class="fa fa-check-circle"></i> Yes',
                    			'<tpl else>',
                    				'<i class="fa fa-times-circle"></i> No',
                    			'</tpl>',   
						  	'</div>',						
						'</div>',							
                    '</div>'                    
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            }]);	
		this.callParent();   
    }
 });
