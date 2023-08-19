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
    collapsible: {
	     footer: false  // show footers when collapsed
	},
   	groupHeader: {
     	tpl: [
            '<span class="{children:this.formatColor}">{name}</span><span class="grpInfo"> {children:this.getLastContact}</span>',
            {
                formatColor: function(children) {
                    var fc = children[0];
                    var state = fc.get('state');
                    if(state == 'never'){
                        return 'grpNever';
                    }
                    if(state == 'down'){
                        return 'grpDown';
                    }
                    if(state == 'up'){
                        return 'grpUp';
                    }
                }
            },
            {
                getLastContact: function(children) {
                    var fc = children[0];
                    var c = fc.get('l_contact_human');
                    if(c == null){
                        return '(never)';
                    }
                    return c;
                }
            }
        ]
 	},
	groupFooter: {
        xtype: 'gridsummaryrow',
        cls: 'summary-row',
        collapsible: {
		     footer: false  // show footers when collapsed
		}
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
				flex		: 1,
				summaryRenderer: function (a,b,c) {
					var value = b.records.length
				    return Ext.String.format('({0} peer{1})', value, value !== 1 ? 's' : '');
				}
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
				dataIndex   : 'signal_bar',
				summaryCell : 'numbercell',
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
