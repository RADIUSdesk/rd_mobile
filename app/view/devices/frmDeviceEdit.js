Ext.define('RdMobile.view.devices.frmDeviceEdit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmDeviceEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Edit Device',
    requires	: [
        'RdMobile.view.components.cmbProfile',
        'RdMobile.view.components.cmbPermanentUser',
        'RdMobile.view.devices.vcDeviceEdit',
    ],
    controller  : 'vcDeviceEdit',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    items: [
    	{
			xtype	: 'label',
			html	: 'Basic Info',
			margin	: 0,
			padding : 5,
			style	: {
   				'font-size' 	: '1.5em',
   				'border-bottom' : '5px solid #667078',
   				'color'			: '#027534'
			}		
		},
		{
            xtype   : 'textfield',
            name    : 'id',
            hidden  : true
        },
        {
            xtype       : 'textfield',
            label  		: 'Description',
            name        : 'description',
            required	: true,
            errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
        },
        {	
        	xtype		: 'cmbPermanentUser',
        	name		: 'permanent_user_id',
        	label		: 'Owner'
        },
    	{
        	xtype	: 'cmbProfile',
        	required: true,
        	errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
    	},
        {
			xtype	: 'label',
			html	: 'Activate & Expire',
			margin	: 0,
			padding : 5,
			style	: {
   				'font-size' 	: '1.5em',
   				'border-bottom' : '5px solid #667078',
   				'color'			: '#027534'
			}			
		},
		{
            xtype	: 'checkboxfield',
            label	: 'Active',
            name    : 'active',
          	value  	: 'active',
          	labelWidth : 200,
            checked	: true
        },
        {
            xtype	: 'checkboxfield',
            label	: 'Never Expire',
            name  	: 'never_expire',
           	value  	: 'never_expire',
            itemId  : 'never_expire',
          	labelWidth : 200,
            checked	: true
        },       
        {
            xtype	: 'datefield',
            label	: 'From',
            name	: 'from_date',
            itemId  : 'from_date',
            minValue: new Date(),  // limited to the current date or after
            hidden      : true,
            disabled    : true
        },       
        {
            xtype	: 'datefield',
            label	: 'To',
            name	: 'to_date',
            itemId  : 'to_date',
            minValue: new Date(),  // limited to the current date or after
            hidden      : true,
            disabled    : true
        }
    ]
});
