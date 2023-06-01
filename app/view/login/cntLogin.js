Ext.define('RdMobile.view.login.cntLogin', {
    extend      : 'Ext.Container',
    xtype       : 'cntLogin',
    controller  : 'vcLogin',
    requires: [
        'Ext.field.Password'
    ],
    layout	: 'vbox',
    items       : [
    	{
	        xtype   : 'toolbar',
	        height	: 70,
	        dock    : 'top',
	        shadow	: false,
	        items   : [{
				    xtype: 'image',
				    src: 'resources/images/logo.png',
				    height: 32,
    				width: 32
				},
				{
                    xtype: 'spacer'
                },			    
			    {
					xtype: 'label',
					html: '<span style="color:#005691;letter-spacing:5px;">RADIUSdesk</span>'
				},
				{
                    xtype: 'spacer'
                }			    
				]
	    },
	    {
	    	xtype		: 'container',
	    	cls		    : 'auth-login',
	    	layout		: {
				type	: 'vbox',
				align	: 'center',
				pack	: 'center'
			},
	    	flex		: 1,
	    	items		: [   		
			   	{
					xtype       : 'formpanel',
            		reference   : 'form',
            		//title       : 'Dashboard Login',
            		border		: true,
            		padding		: 30,
					layout		: 'vbox',
					//ui			: 'auth',
					items: [
						{
						    xtype       : 'textfield',
						    name        : 'username',
						    placeholder : 'Username',
						    required    : true
						}, {
						    xtype       : 'passwordfield',
						    name        : 'password',
						    placeholder : 'Password',
						    required    : true 
						},
						{
						    xtype       : 'button',
						    reference   : 'button',
						    text        : 'LOG IN',
						    iconAlign   : 'right',
						    iconCls     : 'x-fa fa-angle-right',
						    handler     : 'onLoginTap',
						    ui          : 'action',
						    disabled    : true
						}					
					]
				}
		]
    },
    {
        xtype   : 'toolbar',
        height	: 40,
        dock    : 'bottom',
        shadow	: false,
        items   : [{
        		xtype: 'spacer'
        	},
        	{
            xtype   : 'label',
            tpl     : new Ext.XTemplate(
            '<div style="margin-bottom:5px;padding-bottom:5px;">',
                '<span style="color:#005691;letter-spacing:5px;">RADIUSdesk 2023</span>',
            '</div>'
            ),
            data    : {}
        }]
    }
    ]
});
