Ext.define('RdMobile.view.profiles.cntSpeedLimit', {
    extend      : 'Ext.Container',
    alias       : 'widget.cntSpeedLimit',
    requires    : [
        'RdMobile.view.profiles.vcSpeedLimit',
        'RdMobile.view.components.rdSliderSpeed'
    ],
    controller  : 'vcSpeedLimit',
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
						name        : 'speed_limit_enabled',
			    		itemId      : 'speed_limit_enabled',
			    		checked		: true,
						listeners   : {
							change  : 'sldrToggleChange'
						}
					},        
					{
						xtype	: 'label',
						html	: '<i class="fas fa-tachometer-alt"></i> SPEED LIMIT',
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
			            sliderName  : 'speed_upload',
			            label  		: "<i class='fa fa-arrow-up'></i> Up"
			        },
                    {
			            xtype       : 'rdSliderSpeed',
			            sliderName  : 'speed_download',
			            label  		: "<i class='fa fa-arrow-down'></i> Down",
			        }
                ]
            }
        ];       
		me.setItems(items);
    }
});
