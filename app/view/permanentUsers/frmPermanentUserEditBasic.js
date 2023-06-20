Ext.define('RdMobile.view.permanentUsers.frmPermanentUserEditBasic', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmPermanentUserEditBasic',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title		: 'Edit Permanent User Basic',
    controller  : 'vcPermanentUserEditBasic',
    standardSubmit : false,
    requires	: [
        'RdMobile.view.permanentUsers.vcPermanentUserEditBasic',
        'RdMobile.view.components.cmbRealm',
        'RdMobile.view.components.cmbProfile'
    ],
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
        	xtype	: 'cmbRealm',
        	required: true,
        	errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
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
            label	: 'Always Active',
            name  	: 'always_active',
            itemId  : 'always_active',
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
        },       
        {
			xtype	: 'label',
			html	: 'Optional Fields',
			margin	: 0,
			padding : 5,
			style	: {
   				'font-size' 	: '1.5em',
   				'border-bottom' : '5px solid #667078',
   				'color'			: '#027534'
			}		
		},
		{
            xtype	: 'textfield',
            label	: 'Static IP',
            name 	: "static_ip",
            value	: ''
        },
		{
            xtype	: 'textfield',
            label	: 'Extra Name',
            name	: 'extra_name',
            value	: ''
        },
        {
            xtype	: 'textfield',
            label	: 'Extra Value',
            name	: 'extra_value',
            value	: ''
        },
        {
            xtype	: 'checkboxfield',
            label	: 'Auto-add device after authentication',
            name  	: 'auto_add',
           	value  	: 'auto_add',
          	labelWidth : 300
        }
    ]
});
