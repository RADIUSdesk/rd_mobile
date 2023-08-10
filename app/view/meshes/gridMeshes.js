// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.gridMeshes', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMeshes',
    emptyText: 'No MESH Networks Found',
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
            model: 'RdMobile.model.mMesh', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/meshes/index.json',
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
                	this.up('cntMeshes').down('#lblMeta').setData(meta);
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text	: 'Meshes',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
			            '<div class="item-main">',
			            	'{name}',
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl">Last Seen:</div>',
							 "<tpl if='last_contact_state ==\"never\"'>",
                                "<div class=\"item-value clr-grey-dark\">Awaiting Deployment</div>",
                            "</tpl>",
                             "<tpl if='last_contact_state ==\"online\"'>",
                                "<div class=\"item-value clr-green\">{last_contact_in_words}</div>",
                            "</tpl>",
                            "<tpl if='last_contact_state ==\"offline\"'>",
                                "<div class=\"item-value clr-orange\">{last_contact_in_words}</div>",
                            "</tpl>",
						'</div>',
                    	'<div class="two-columns-grid">',
							'<div class="item-lbl"><span style="font-size:larger;color:#6c7275;">{node_count}</span> Nodes :</div>',					
							'<div class="item-value">',
                                '<tpl if="nodes_up &gt; 0">',
                                    '<span class="clr-green">{nodes_up} ONLINE  </span>/',
                                '<tpl else>',
                                    '<span class="clr-grey-dark">{nodes_up} ONLINE </span>/',
                                '</tpl>',
                                '<tpl if="nodes_down &gt; 0">',
                                    '<span class="clr-orange"> {nodes_down} OFFLINE</span>',
                                '<tpl else>',
                                    '<span class="clr-grey-dark"> {nodes_down} OFFLINE</span>',
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
		//console.log(this._record)      
    }
 });
