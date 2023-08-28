// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.cntViewHardware', {
    extend  : 'Ext.Container',
    xtype   : 'cntViewHardware',
    config  : {
        n: undefined,
        r: undefined
    },
    requires	: [
    ],
    padding	: 14,
    cls		: 'grid-widgetcell-rd',
	items	: [
		{
			xtype	: 'container',
			itemId	: 'cntInfo',
			tpl		: new Ext.XTemplate(
				'<div class="item-main">',
					"<tpl if='reboot_flag == \"1\"'>",
						'<i class="fa fa-power-off" style="color:orange;"></i>  ',
					'</tpl>',	
					'{name}',
				'</div>',
				'<div class="two-columns-grid">',
					'<div class="item-value" style="text-align:right;color:#2b3f61;"><i class="fa fa-cubes fa-1x"></i> {ap_profile}</div>',	
					'<div class="item-value" style="color:#2b3f61;"><i class="fa fa-cogs fa-1x"></i> ',
						"<tpl if='config_state == \"never\"'>",
							'<span class="clr-grey-dark">Never Fetched Before</span>',
						'</tpl>',
						"<tpl if='config_state == \"up\"'>",
							'<span class="clr-green">{config_fetched_human}</span>',
						'</tpl>',
						"<tpl if='config_state == \"down\"'>",
							'<span class="clr-grey-dark">{config_fetched_human}</span>',
						'</tpl>',
					'</div>',				
				'</div>',
				'<div class="two-columns-grid">',
					'<div class="item-lbl"><i class="fa fa-heartbeat fa-1x"></i> Heartbeat :</div>',
					'<tpl if="[Ext.ux.isRecent(last_contact_human)]==\'green\'">',
						'<div class="item-value clr-green">{last_contact_human}</div>',
					'<tpl else>',
						'<div class="item-value clr-orange">{last_contact_human}</div>',
					'</tpl>',
				'</div>'
			),
			data 	: {},
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
								"9:": "#20e367"
							}
						}						
					]
				}	
			]		
		}
				
	],
	height	: 130,
	margin  : 12
});
