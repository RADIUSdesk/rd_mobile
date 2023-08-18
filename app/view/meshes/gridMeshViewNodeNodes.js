// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.gridMeshViewNodeNodes', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMeshViewNodeNodes',
    emptyText: 'Do Data Available',
    requires	: [
        'Ext.grid.cell.Number',
        'Ext.grid.cell.Widget',
        'Ext.grid.filters.Plugin',
        'Ext.grid.SummaryRow',
        'RdMobile.view.components.rdCustomProgressBar'
    ],
    grouped: true,
    groupFooter: {
        xtype: 'gridsummaryrow'
    },
    itemConfig: {
        viewModel: true
    },
    rowViewModel: true,
    initialize: function () {
        const me = this; 
        me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mMeshViewNodeNode', 
           /* proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/mesh-reports/view_node_nodes.json',
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
            autoLoad	: false,
            remoteFilter: true,
            remoteSort  : true,*/
            data		: [
            	{
				    "id": 1,
				    "name": "4A-100-GW",
				    "node_id": 7,
				    "mac": "00:13:4B:80:1D:11",
				    "peer_name": "(not known)",
				    "peer_last_contact": "(not known)",
				    "peer_l_contact_human": "(not known)",
				    "peer_state": "(not known)",
				    "tx_bytes": 18742517,
				    "rx_bytes": 47528308,
				    "signal_avg": -43,
				    "signal_avg_bar": 0.9,
				    "signal_bar": 0.9,
				    "signal": -39,
				    "l_tx_bitrate": 634,
				    "l_rx_bitrate": 317,
				    "l_signal": -39,
				    "l_signal_avg": -38,
				    "l_MFP": null,
				    "l_tx_failed": 1,
				    "l_tx_retries": 322,
				    "l_modified": "2023-08-15T18:30:31+00:00",
				    "l_modified_human": "2 days ago",
				    "l_authenticated": 0,
				    "l_authorized": 0,
				    "l_tx_bytes": 0,
				    "l_rx_bytes": 0,
				    "l_contact": "2023-08-18T02:46:54+00:00",
				    "l_contact_human": "4 hours ago",
				    "state": "down"
				},
				{
				    "id": 2,
				    "name": "4A-100-GW",
				    "node_id": 7,
				    "mac": "64-64-4A-D1-2D-67",
				    "peer_name": "4A-100-Remote",
				    "peer_last_contact": "2023-08-18T02:46:47+00:00",
				    "peer_l_contact_human": "4 hours ago",
				    "peer_state": "down",
				    "tx_bytes": 4111389741,
				    "rx_bytes": 4656395897,
				    "signal_avg": -66,
				    "signal_avg_bar": 0.5,
				    "signal_bar": 0.5,
				    "signal": -65,
				    "l_tx_bitrate": 301,
				    "l_rx_bitrate": 314,
				    "l_signal": -65,
				    "l_signal_avg": -64,
				    "l_MFP": null,
				    "l_tx_failed": 1,
				    "l_tx_retries": 94015,
				    "l_modified": "2023-08-18T02:37:24+00:00",
				    "l_modified_human": "4 hours ago",
				    "l_authenticated": 0,
				    "l_authorized": 0,
				    "l_tx_bytes": 959384,
				    "l_rx_bytes": 2050597,
				    "l_contact": "2023-08-18T02:46:54+00:00",
				    "l_contact_human": "4 hours ago",
				    "state": "down"
				},
				{
				    "id": 3,
				    "name": "4A-100-Remote",
				    "node_id": 8,
				    "mac": "00:13:4B:80:1D:11",
				    "peer_name": "(not known)",
				    "peer_last_contact": "(not known)",
				    "peer_l_contact_human": "(not known)",
				    "peer_state": "(not known)",
				    "tx_bytes": 9956131,
				    "rx_bytes": 36543492,
				    "signal_avg": -77,
				    "signal_avg_bar": 0.3,
				    "signal_bar": 0.3,
				    "signal": -77,
				    "l_tx_bitrate": 126,
				    "l_rx_bitrate": 95,
				    "l_signal": -77,
				    "l_signal_avg": -76,
				    "l_MFP": null,
				    "l_tx_failed": 1,
				    "l_tx_retries": 828,
				    "l_modified": "2023-08-15T18:29:55+00:00",
				    "l_modified_human": "2 days ago",
				    "l_authenticated": 0,
				    "l_authorized": 0,
				    "l_tx_bytes": 0,
				    "l_rx_bytes": 0,
				    "l_contact": "2023-08-18T02:46:47+00:00",
				    "l_contact_human": "4 hours ago",
				    "state": "down"
				},
				{
				    "id": 4,
				    "name": "4A-100-Remote",
				    "node_id": 8,
				    "mac": "64-64-4A-DD-07-FC",
				    "peer_name": "4A-100-GW",
				    "peer_last_contact": "2023-08-18T02:46:54+00:00",
				    "peer_l_contact_human": "4 hours ago",
				    "peer_state": "down",
				    "tx_bytes": 3696451703,
				    "rx_bytes": -2405092362,
				    "signal_avg": -67,
				    "signal_avg_bar": 0.5,
				    "signal_bar": 0.1,
				    "signal": -65,
				    "l_tx_bitrate": 304,
				    "l_rx_bitrate": 317,
				    "l_signal": -65,
				    "l_signal_avg": -65,
				    "l_MFP": null,
				    "l_tx_failed": 1,
				    "l_tx_retries": 80655,
				    "l_modified": "2023-08-18T02:44:26+00:00",
				    "l_modified_human": "4 hours ago",
				    "l_authenticated": 0,
				    "l_authorized": 0,
				    "l_tx_bytes": 658533,
				    "l_rx_bytes": 1921650,
				    "l_contact": "2023-08-18T02:46:47+00:00",
				    "l_contact_human": "4 hours ago",
				    "state": "down"
				}
            
            ],
            groupField	: 'name',
    		sorters: ['peer_name', 'name']
        }));
               
       /* me.setStore(Ext.create(Ext.data.Store,{
           model   : 'RdMobile.model.mMeshViewNodeNode',
			remoteSort: false,
			proxy: {
				    type    : 'ajax',
				    format  : 'json',
				    batchActions: true, 
				    url     : '/cake4/rd_cake/mesh-reports/view_node_nodes.json',
				    reader  : {
				        type            : 'json',
				        rootProperty    : 'items',
				        messageProperty : 'message',
				        totalProperty   : 'totalCount' //Required for dynamic paging
				    }
			},
			autoLoad    : false,
			groupField  : 'name'
		}));*/
        
        me.setColumns( [
		    { 
				text		: 'Nearby Nodes',
				dataIndex	: 'peer_name',
				groupHeaderTpl: '{columnName}: {value:htmlEncode}',
				flex	: 1
		   	},
		  /* 	{ 
				text		: 'Last Seen',
				dataIndex	: 'l_contact_human',
				flex		: 1 
		   	},*/
		   	{
		        text		: 'Signal Avg',
				flex		: 1,
				hidden		: true,
		        cell		: {
		            xtype: 'widgetcell',
		            widget: {
		            	xtype: 'rdCustomProgressBar',
						minGradient: {red: 179, green: 0, blue: 3},
						midGradient: {red: 179, green: 125, blue: 0},
						maxGradient: {red: 2, green: 92, blue: 6},
		                //xtype: 'progress',
		                height: 30,
		                bind: {
                            value	: '{record.signal_avg_bar}',
                            text	: '{record.signal_avg} dBm'
                            
                        },
		                margin: 5
		            }
		        }
		    },
		   	{
		        text		: 'Latest Signal',
				flex		: 1,
		        cell		: {
		            xtype: 'widgetcell',
		            widget: {
		            	xtype: 'rdCustomProgressBar',
						minGradient: {red: 255, green: 51, blue: 0},
						midGradient: {red: 255, green: 204, blue: 0},
						maxGradient: {red: 2, green: 92, blue: 6},
		                //xtype: 'progress',
		                height: 30,
		                bind: {
                            value	: '{record.signal_bar}',
                            text	: '{record.signal} dBm'
                            
                        },
		                margin: 5
		            }
		        }
		    }		   	  
	   	]);	
		this.callParent();    
    }
 });
