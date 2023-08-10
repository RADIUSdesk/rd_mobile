// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profiles.cntDataLimit', {
    extend      : 'Ext.Container',
    alias       : 'widget.cntDataLimit',
    requires    : [
        'RdMobile.view.profiles.vcDataLimit',
        'RdMobile.view.components.rdSliderData'
    ],
    controller  : 'vcDataLimit',
    layout      : 'vbox',
    margin		: '0 0 30 0',
    padding		: 5,
    style: {
    	'border': '1px solid #027534'
	},
    initialize: function () {
        var me      = this;
        var items    = [
			{
				xtype	: 'container',
				padding	: 0,
				layout      : {
					type        : 'hbox'
				},
				items	: [
					{
						xtype		: 'checkboxfield',
						checked		: false,
						padding		: '0 15 0 5',
						name        : 'data_limit_enabled',
						itemId      : 'data_limit_enabled',
						checked		: true,
						listeners   : {
							change  : 'sldrToggleChange'
						}
					},        
					{
						xtype	: 'label',
						html	: '<i class="fas fa-database"></i> DATA LIMIT',
						margin	: 0,
						style	: {
			   				'font-size' 	: '1.5em',
			   				'color'			: '#027534'
						},
						flex	: 1			
					}							
				]
			},		
			{ 
			    xtype       : 'container',
			    itemId      : 'cntDetail',
			    margin		: '10 0 0 0',
			    style		: {
    				background: '#f0fcf2'
				},
			    items       : [
                    {
			            xtype       : 'rdSliderData',
			            sliderName  : 'data',
			            minValue    : 1,
                        maxValue    : 999
			        },
			        {
						xtype		: 'radiogroup',
						label		: 'Reset',
						vertical	: false,
						items       : [
                            {
                                label  	: 'Daily',
                                name    : 'data_reset',
                                value 	: 'daily',
                                checked	: true
                            }, 
                            {
                                label  : 'Weekly',
                                name   : 'data_reset',
                                value: 'weekly'
                            },
                            {
                                label  	: 'Monthly',
                                name  	: 'data_reset',
                                value	: 'monthly',
                            },
                            {
                                label  	: 'Never',
                                name    : 'data_reset',
                                value	: 'never'
                            },
                            {
                                label 	: 'Top-Up',
                                name    : 'data_reset',
                                value: 'top_up'
                            }
                        ],
                        listeners   : {
					        change  : 'rgrpDataResetChange'
				        }
					},
					{
                        xtype   : 'label',
                        itemId  : 'pnlDataTopUp',
                        hidden  : true,
                        margin	: 0,
						style   : 'background: #fff1b3',
                        html    : "<span style='text-align:center;color:#876f01;font-size:1.5em;'>Top-Up Amount is Per User</span>",
                        padding	: 10
                    },
					{
						xtype		: 'radiogroup',
						label		: 'Type',
						itemId      : 'rgrpDataCap',
						vertical	: false,
						items       : [
                            {
                                boxLabel  : 'Hard',
                                name      : 'data_cap',
                                inputValue: 'hard',
                                margin    : '0 15 0 0',
                                checked   : true
                            }, 
                            {
                                boxLabel  : 'Soft',
                                name      : 'data_cap',
                                inputValue: 'soft',
                                margin    : '0 0 0 15'
                            }
                        ]
					},				
                    {
						xtype		: 'checkboxfield',
						label		: 'Apply Limit Per Device (For Click-To-Connect)',
						name        : 'data_limit_mac',
						itemId		: 'chkDataMac',
					  	labelWidth 	: 300,
						checked		: false         
					}
                ]
            }
        ];       
		me.setItems(items);
    }
});
