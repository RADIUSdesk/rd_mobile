Ext.define('RdMobile.view.profiles.cntDataLimit', {
    extend      : 'Ext.Container',
    alias       : 'widget.cntDataLimit',
    requires    : [
        'RdMobile.view.profiles.vcDataLimit',
        'RdMobile.view.components.rdSliderData'
    ],
    controller  : 'vcDataLimit',
    layout      : 'vbox',
    initialize: function () {
        var me      = this;
        var items    = [
			{
				xtype	: 'container',
				layout      : {
					type        : 'hbox'
				},
				items	: [
					{
						xtype	: 'label',
						html	: 'Data Limit',
						margin	: 0,
						padding : 5,
						style	: {
			   				'font-size' 	: '1.5em',
			   				'border-bottom' : '5px solid #667078',
			   				'color'			: '#027534'
						},
						flex	: 1			
					},
					{
						xtype		: 'checkboxfield',
						name        : 'data_limit_mac',
					  	labelWidth 	: 300,
						checked		: false         
					}
					{
						xtype		: 'togglefield',
						label		: 'Enabled',
						labelWidth	: '40%',
						name        : 'data_limit_enabled',
			    		itemId      : 'data_limit_enabled',
			    		value       : 1,
						listeners   : {
							change  : 'sldrToggleChange'
						}
					}			
				]
			},		
			{ 
			    xtype       : 'container',
			    itemId      : 'cntDetail',
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
					        //change  : 'rgrpDataResetChange'
				        }
					},
					{
						xtype		: 'radiogroup',
						label		: 'Type',
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
                        xtype   : 'label',
                        itemId  : 'pnlDataTopUp',
                        hidden  : true,
                        html    : "<h3 style='text-align:center;color:#876f01'>Top-Up Amount is Per User</h3>",
                        margin  : 10
                    },
                    {
						xtype		: 'radiogroup',
						label		: 'Type',
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
					  	labelWidth 	: 300,
						checked		: false         
					}
                ]
            }
        ];       
		me.setItems(items);
    }
});
