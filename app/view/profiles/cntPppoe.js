Ext.define('RdMobile.view.profiles.cntPppoe', {
    extend      : 'Ext.Container',
    alias       : 'widget.cntPppoe',
    requires    : [
        'RdMobile.view.profiles.vcPppoe'
    ],
    controller  : 'vcPppoe',
    layout      : 'vbox',
    margin		: '0 0 30 0',
    padding		: 5,
    style		: {
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
						name        : 'fup_enabled',
			    		itemId      : 'fup_enabled',
			    		checked		: true,
						listeners   : {
							change  : 'sldrToggleChange'
						}
					},        
					{
						xtype	: 'label',
						html	: '<i class="fas fa-tachometer-alt"></i> SPEED LIMITS',
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
			            xtype       : 'rdSliderSpeed',
			            sliderName  : 'fup_upload',
			            label  		: "<i class='fa fa-arrow-up'></i> Up"
			        },
                    {
			            xtype       : 'rdSliderSpeed',
			            sliderName  : 'fup_download',
			            label  		: "<i class='fa fa-arrow-down'></i> Down",
			        },
                    {
                        xtype       : 'checkbox',
                        itemId      : 'chkBurstEnable',
                        label  		: 'Enable Bursting',
                        name        : 'fup_bursting_on'
                    },
                    {
                        xtype       : 'numberfield',
                        label  		: 'Burst Limit(%)',
                        value       : 100,
                        maxValue    : 200,
                        minValue    : 1,
                        name        : 'fup_burst_limit',
                        disabled    : true,
                        itemId      : 'nrFupBurstLimit'
                    },
                    {
                        xtype       : 'numberfield',
                        label  		: 'Burst Time (Seconds)',
                        value       : 100,
                        maxValue    : 600,
                        minValue    : 1,
                        name        : 'fup_burst_time',
                        disabled    : true,
                        itemId      : 'nrFupBurstTime'
                    },
                    {
                        xtype       : 'numberfield',
                        label  		: 'Burst Threshold(%)',
                        value       : 100,
                        maxValue    : 200,
                        minValue    : 1,
                        name        : 'fup_burst_threshold',
                        disabled    : true,
                        itemId      : 'nrFupBurstThreshold'
                    },
                    {
			            xtype       : 'textfield',
			            label  		: 'IP Pool (Optional)',
			            name        : 'fup_ip_pool',
			            blankText   : 'Supply a value',
			            value		: ''
		            }
                ]
            }
        ];       
		me.setItems(items);
    }
});
