// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.realms.gridRealms', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridRealms',
    emptyText: 'No Realms Available',
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
            model: 'RdMobile.model.mRealm', 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/realms/index.json',
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
                	this.up('cntRealms').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">REALMS</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text: 'Realms',
                xtype: 'templatecolumn',                             
                cell: {
					encodeHtml: false,
					tpl: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
	                	'<div class="item-main">',
			            	'{name}',
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
