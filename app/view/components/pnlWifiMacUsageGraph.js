// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.pnlWifiMacUsageGraph', {
    extend  	: 'Ext.Panel',
    xtype   	: 'pnlWifiMacUsageGraph',
    floated		: true,
    modal		: true,
    centered	: true,
    closable	: true,
    fullscreen 	: true,
    padding		: 6,
    scrollable	: true,
    layout		: 'vbox',
    iconCls 	: 'x-fa fa-chart-bar',    
    initialize	: function (){
        const me = this;
        me.setTitle(me.mac);
        
        var store_bar  = Ext.create(Ext.data.Store,{model: 'RdMobile.model.mUserStat'});
        store_bar.setData(me.bigData.graph.items);
     	var items = [
     		{	
		 		xtype	: 'container',
		 		itemId	: 'cntUsage', 	
			 	tpl		: new Ext.XTemplate(
					'<div class="detail-section">',
					'Data Usage',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="padding:5px;">IN : </div>',
						'<div class="item-value" style="padding:5px;">{data_in}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="padding:5px;">OUT : </div>',
						'<div class="item-value" style="padding:5px;">{data_out}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="padding:5px;">TOTAL : </div>',
						'<div class="item-value" style="padding:5px;">{data_total}</div>',
					'</div>'
				),
				data : {}
			},
			{
	 			xtype	: 'cartesian',
	 			itemId	: 'crtTopTen',
	 			flex	: 1,
	 			store	: store_bar,
	 			axes: [
			        {
			            type        : 'numeric',
			            position    : 'left',
			            adjustByMajorUnit: true,
			            grid        : true,
			            fields      : ['data_in', 'data_out'],
			            renderer    : function(axis, label, layoutContext) {
			                return Ext.ux.bytesToHuman(label);
			            },
			            minimum: 0
			        }, {
			            type        : 'category',
			            position    : 'bottom',
			            grid        : false,
			            fields      : ['time_unit']
			        }
			    ],
			   	series: [
			        {
			            type    : 'bar',
			            title   : [ 'Data In', 'Data out' ],
			            xField  : 'time_unit',
			            yField  : ['data_in', 'data_out'],
			            stacked : true,
			            style   : {
			                opacity: 0.80
			            },
			            highlight: {
			                fillStyle: 'yellow'
			            }
			        }
			    ]		 		
	 		}	 	
		];    	
     	me.setItems(items);
     	me.down('#cntUsage').setData(me.bigData.totals);     	       	
  	}
});
