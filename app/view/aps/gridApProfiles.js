// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.gridApProfiles', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridApProfiles',
    emptyText: 'No AP Profiles Found',
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
        	autoLoad: false,
            model: 'RdMobile.model.mApProfile', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/ap-profiles/index.json',
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
                	this.up('cntApProfiles').down('#lblMeta').setData(meta);
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text	: 'AP Profiles',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
			            '<div class="item-main">',
			            	'{name}',
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
