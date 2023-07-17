Ext.define('RdMobile.view.password.frmPassword', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmPassword',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    title	: 'Password Manager',
    controller  : 'vcPassword',
    standardSubmit : false,
    requires	: [
    	'RdMobile.view.password.vcPassword',
    	'RdMobile.view.components.cmbPermanentUser'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
   initialize: function () {
        const me = this;
        			
		var cmb_user = {
    		xtype 		: 'cmbPermanentUser',
    	//	user_name 	: me.user_name,
    	//	user_id	 	: me.user_id	
    	};
               
        var items = [			
			cmb_user,
			{
				xtype	: 'label',
				itemId	: 'currentPwd',
				html	: '',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'		
			},
			{
		        xtype	: 'textfield',
		        name   	: 'password',
               	label  	: 'New Password',
		        value	: '',
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
				cls		: 'form-section'		
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
		    }       
		];		
		me.setItems(items);        
 	}   
});
