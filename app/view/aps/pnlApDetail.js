// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.pnlApDetail', {
    extend  	: 'Ext.Panel',
    xtype   	: 'pnlApDetail',
    floated		: true,
    modal		: true,
    centered	: true,
    closable	: true,
    fullscreen 	: true,
    padding		: 6,
    scrollable	: true,
    iconCls 	: 'x-fa fa-info-circle',
    items	: [
		{
			xtype	: 'container',
			itemId	: 'cntInfo',
			tpl		: new Ext.XTemplate(
				'<div style="text-align:center;">',
					 '<img src="/cake4/rd_cake/img/hardwares/{hw_photo}" alt="Harware image" height="80">', 
				'</div>',
				'<div class="two-columns-grid">',
					'<div class="item-lbl">Name :</div>',
					'<div class="item-value">{name}</div>',
				'</div>',
				'<div class="two-columns-grid">',
					'<div class="item-lbl">MAC Address :</div>',
					'<div class="item-value">{mac}</div>',
				'</div>',
				'<div class="two-columns-grid">',
					'<div class="item-lbl">Hardware :</div>',
					'<div class="item-value">{hw_human}</div>',
				'</div>',
				'<div class="two-columns-grid">',
					'<div class="item-lbl">Last Contact :</div>',
					'<tpl if="[Ext.ux.isRecent(last_contact_human)]==\'green\'">',
						'<div class="item-value clr-green">{last_contact_human}</div>',
					'<tpl else>',
						'<div class="item-value clr-orange">{last_contact_human}</div>',
					'</tpl>',						
				'</div>',								
                '<div class="two-columns-grid">',
			        '<div class="item-lbl">Internet Connection :</div>',
			        "<tpl if='wbw_signal'>",
			        	'<div class=\"item-value\"><i class=\"fa fa-wifi\"></i> Wifi</div>',
			        '<tpl else>',
		                "<tpl if='gateway == \"yes\"'>",
		                    '<div class=\"item-value\"><i class=\"fa fa-network-wired\"></i> LAN</div>',
		                '</tpl>', 
		                "<tpl if='gateway == \"no\"'>",
		                    '<div class=\"item-value\"><i class=\"fa fa-dice-d20\"></i> MESH</div>',  
		                '</tpl>',
		           	'</tpl>',
		        '</div>',
				 	
			),
			data 	: {}
		},
		{
			xtype	: 'container',
			layout	: {
				type	: 'hbox',
				pack	: 'center'
			},
			items	: [
				{ 
					xtype	: 'label',
					padding	: 5,
					html	: '<div class="item-lbl" style="text-align:right;">Last 24 Hours :</div>',
					flex	: 1	
				},
				{
					xtype	: 'container',
					padding	: '5 0 5 5',
					flex	: 1,
					layout	: {
						type	: 'hbox',
						align	: 'start',
						pack	: 'start'
					},				
					items	: [
						{
							xtype	: 'sparklinepie',
							itemId	: 'sklPie',
							width	: 25,
							height	: 20,
							values	: [],
							sliceColors : [ 'green', '#a6221f' ],
						},
						{					
							xtype	: 'sparklinebar',
							values	: [],
							width	: 200,
							height	: 20,
							barWidth: 0.7,
							barSpacing  : 0,
							hidden	: false,
							flex	: 1,
							itemId	: 'sklBar',
							colorMap: {
								":8": "#a6221f",
								"9:": "green"
							}
						}						
					]
				}	
			]		
		},
		{
			xtype	: 'container',
			itemId	: 'cntIpInfo',
			tpl		: new Ext.XTemplate(
				"<tpl if='gateway == \"yes\"'>",
				 	'<div class="detail-section" style="margin-top:25px">',
						'IP Related',
					'</div>',
				    '<div class="two-columns-grid">',
						'<div class="item-lbl">Proto :</div>',
						'<div class="item-value">{lan_proto}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl">IP :</div>',
						'<div class="item-value">{lan_ip}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl">Gateway :</div>',
						'<div class="item-value">{lan_gw}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl">Report From IP :</div>',
						'<div class="item-value">{last_contact_from_ip}</div>',
					'</div>',
				'</tpl>'		
			)
		},
		{
			xtype	: 'container',
			items	: [
				{
					xtype	: 'container',
					itemId	: 'cntWbwHeader',
					tpl		: new Ext.XTemplate(
						'<tpl if="wbw_active">',
							'<div class="detail-section" style="margin-top:25px">',
								'Wifi Client Connection',
							'</div>',
						'</tpl>'	
					),
					data	: {}			
				},
				{
					xtype: 'rdCustomProgressBar',
					minGradient: {red: 179, green: 0, blue: 3},
					midGradient: {red: 179, green: 125, blue: 0},
					maxGradient: {red: 2, green: 92, blue: 6},
	                //xtype: 'progress',
	                height: 30,
	                hidden	: true,
	                margin	: 5,
	                padding	: 5,                
				},	
				{
					xtype	: 'container',
					itemId	: 'cntWbwInfo',
					tpl		: new Ext.XTemplate(
						'<tpl if="wbw_active">',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">Channel :</div>',
								'<div class="item-value">{wbw_channel}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">TX Power :</div>',
								'<div class="item-value">{wbw_txpower}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">Quality :</div>',
								'<div class="item-value">{wbw_quality}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">Noise :</div>',
								'<div class="item-value">{wbw_noise}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">TX Packets :</div>',
								'<div class="item-value">{wbw_tx_packets}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">RX Packets :</div>',
								'<div class="item-value">{wbw_rx_packets}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">TX Rate :</div>',
								'<div class="item-value">{wbw_tx_rate}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">RX Rate :</div>',
								'<div class="item-value">{wbw_rx_rate}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">Speed (~) :</div>',
								'<div class="item-value">{wbw_expected_throughput}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl">SSID :</div>',
								'<div class="item-value">{wbw_ssid}</div>',
							'</div>',						
						'</tpl>'	
					),
					data	: {}			
				}
			]
		}
	],
    initialize: function (){
        const me = this;
        me.setTitle(me.ap_name);
     	var d = me.r.getData();
     	me.down('#cntInfo').setData(d);
     	me.down('#cntIpInfo').setData(d);

     	me.down('#sklBar').setValues(me.r.get('dayuptimehist'));
        me.down('#sklPie').setValues(me.r.get('uptimhistpct'));
        
        if(me.r.get('wbw_signal_bar')){
       		me.down('#cntWbwHeader').setData(d);
     		me.down('#cntWbwInfo').setData(d);
        	me.down('rdCustomProgressBar').show();
        	me.down('rdCustomProgressBar').setText(me.r.get('wbw_signal'));
        	me.down('rdCustomProgressBar').setValue(me.r.get('wbw_signal_bar'));
        }
  	}
});
