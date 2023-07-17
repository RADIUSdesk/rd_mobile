Ext.define('RdMobile.view.permanentUsers.frmPermanentUserAdd', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmPermanentUserAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Add Permanent User',
    requires	: [
    	'RdMobile.view.components.cmbRealm',
        'RdMobile.view.components.cmbProfile',
        'RdMobile.view.permanentUsers.vcPermanentUserAdd',
    ],
    controller  : 'vcPermanentUserAdd',
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
			cls		: 'form-section'	
		},
		{
            xtype	: 'checkboxfield',
            label	: 'Create multiple users',
            name    : 'multiple',
          	value  	: 'multiple',
          	itemId  : 'multiple',
          	labelWidth : 200,
            checked	: false            
        },
        {
            xtype       : 'textfield',
            label  		: 'Username',
            name        : 'username',
            required	: true,
            errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
        },
        {
            xtype       : 'textfield',
            label  		: 'Password',
            name        : 'password',
            required	: true,
            errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
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
			html	: 'Personal Info',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'		
		},
		{
            xtype	: 'textfield',
            label	: 'Name',
            name 	: "name",
            value	: ''
        },
        {
            xtype	: 'textfield',
            label	: 'Surname',
            name 	: "surname",
            value	: ''
        },
        {
            xtype	: 'textfield',
            label	: 'Phone',
            name 	: "phone",
            value	: ''
        },
    	{
	        xtype	: 'emailfield',
	        label	: 'Email',
	        name	: 'email',
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
			cls		: 'form-section'
		},
		{
            xtype	: 'checkboxfield',
            label	: 'Active',
            name    : 'active',
          	value  	: 'active',
          	labelWidth : 200,
            checked	: false
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
        },       
        {
			xtype	: 'label',
			html	: 'Optional Fields',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'
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
