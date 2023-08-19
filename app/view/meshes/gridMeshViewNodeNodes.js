// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.gridMeshViewNodeNodes', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMeshViewNodeNodes',
    emptyText: 'No Data Available',
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
    girdStore	: undefined,
    initialize: function () {
        const me = this;
        
        me.gridStore = Ext.create(Ext.data.Store,{
            model		: 'RdMobile.model.mMeshViewNodeNode', 
            groupField	: 'name',
    		sorters		: ['peer_name', 'name']
        });
        me.setStore(me.gridStore);
         
        me.setColumns( [
		    { 
				text		: 'Nearby Nodes',
				dataIndex	: 'peer_name',
				groupHeaderTpl: '{columnName}: {value:htmlEncode}',
				flex	: 1
		   	},
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
