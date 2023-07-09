Ext.define('RdMobile.view.profiles.cntTimeLimit', {
    extend      : 'Ext.Container',
    alias       : 'widget.cntTimeLimit',
    requires    : [
        'RdMobile.view.profiles.vcTimeLimit',
        'RdMobile.view.components.rdSliderTime'
    ],
    controller  : 'vcTimeLimit',
    layout      : 'vbox',
    margin		: '0 0 30 0',
    padding		: 5,
    style: {
    	'border': '1px solid #005691'
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
						name        : 'time_limit_enabled',
			    		itemId      : 'time_limit_enabled',
			    		checked		: true,
						listeners   : {
							change  : 'sldrToggleChange'
						}
					},        
					{
						xtype	: 'label',
						html	: '<i class="fas fa-clock"></i> TIME LIMIT',
						margin	: 0,
						style	: {
			   				'font-size' 	: '1.5em',
			   				'color'			: '#005691'
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
    				background: '#f0f6fc'
				},
			    items       : [
                    {
			            xtype       : 'rdSliderTime',
			            sliderName  : 'time',
			            fieldLabel  : "Amount",
                        minValue    : 1,
                        maxValue    : 120
			        },
			        {
						xtype		: 'radiogroup',
						label		: 'Reset',
						itemId      : 'rgrpTimeReset',
						vertical	: false,
						items       : [
                            {
                                label  	: 'Daily',
                                name    : 'time_reset',
                                value 	: 'daily',
                                checked	: true
                            }, 
                            {
                                label  : 'Weekly',
                                name   : 'time_reset',
                                value: 'weekly'
                            },
                            {
                                label  	: 'Monthly',
                                name  	: 'time_reset',
                                value	: 'monthly',
                            },
                            {
                                label  	: 'Never',
                                name    : 'time_reset',
                                value	: 'never'
                            },
                            {
                                label 	: 'Top-Up',
                                name    : 'time_reset',
                                value: 'top_up'
                            }
                        ],
                        listeners   : {
					        change  : 'rgrpTimeResetChange'
				        }
					},
					{
                        xtype   : 'label',
                        itemId  : 'pnlTimeTopUp',
                        hidden  : true,
                        margin	: 0,
						style   : 'background: #fff1b3',
                        html    : "<span style='text-align:center;color:#876f01;font-size:1.5em;'>Top-Up Amount is Per User</span>",
                        padding	: 10
                    },
					{
						xtype		: 'radiogroup',
						label		: 'Type',
						itemId      : 'rgrpTimeCap',
						vertical	: false,
						items       : [
                            {
                                boxLabel  : 'Hard',
                                name      : 'time_cap',
                                inputValue: 'hard',
                                margin    : '0 15 0 0',
                                checked   : true
                            }, 
                            {
                                boxLabel  : 'Soft',
                                name      : 'time_cap',
                                inputValue: 'soft',
                                margin    : '0 0 0 15'
                            }
                        ]
					},				
                    {
						xtype		: 'checkboxfield',
						label		: 'Apply Limit Per Device (For Click-To-Connect)',
						name        : 'time_limit_mac',
						itemId		: 'chkTimeMac',
					  	labelWidth 	: 300,
						checked		: false         
					}
                ]
            }
        ];       
		me.setItems(items);
    }
});
