Ext.define('RdMobile.view.permanentUsers.frmPermanentUserEditPersonal', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmPermanentUserEditPersonal',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title		: 'Edit Permanent User Personal',
    controller  : 'vcPermanentUserEditPersonal',
    standardSubmit : false,
    requires	: [
        'RdMobile.view.permanentUsers.vcPermanentUserEditPersonal'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    items: [
    	{
			xtype	: 'label',
			html	: 'Personal Info',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'		
		},
		{
            xtype   : 'textfield',
            name    : 'id',
            hidden  : true,
            value   : true
        },
        //FIXME ADD LANGUAGE LATER
        {
            xtype   : 'textfield',
            name    : 'language',
            hidden  : true,
            value   : '4_4'
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
		}
    ]
});
