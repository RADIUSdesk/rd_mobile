Ext.define('RdMobile.view.realms.frmRealmEdit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmRealmEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-pencil-alt',
    root 	: false,
    requires	: [
        'RdMobile.view.realms.vcRealmEdit',
    ],
    controller  : 'vcRealmEdit',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadRealm' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me  = this;
        
        me.setTitle(me.realm_name);
              
        var items = [
        	{
		        xtype   : 'textfield',
		        name    : 'id',
		        hidden  : true,
		        value	: me.realm_id
		    },
			{
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> General',
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}		
			},
		    {
		        xtype       : 'textfield',
		        label  		: 'Name',
		        name        : 'name',
		        required	: true,
		        errorTip: {
				    anchor: true,
				    align: 'l-r?'
				},
				errorTarget: 'under'
		    },
		    {
                xtype       : 'textfield',
                label  		: 'Suffix',
                name        : "suffix",
                required	: false,
                value		: '',
                validators	: [ /^[\w\-_\.]+$/ ],
		    	validationMessage :"Only words, underscores, dashes and full stops allowed",
		    	requiredMessage :"Only words, underscores, dashes and full stops allowed",
                errorTip	: {
				    anchor: true,
				    align: 'l-r?'
				},
				errorTarget: 'under'
            },
         	{
                xtype       : 'checkboxfield',      
                label       : 'Add suffix when creating Permanent Users',
                name        : 'suffix_permanent_users',
                labelWidth  : 'auto'
            },
            {
                xtype       : 'checkboxfield',      
                label    	: 'Add suffix when creating Vouchers',
                name        : 'suffix_vouchers',
                labelWidth  : 'auto'
            },
            {
                xtype       : 'checkboxfield',      
                label    	: 'Add suffix when creating BYOD',
                name        : 'suffix_devices',
                labelWidth  : 'auto'
            },
		    {
				xtype	: 'label',
				html	: '<i class="fas fa-mobile"></i> Contact Detail',
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}		
			},
		    {
                xtype       : 'textfield',
                label  		: 'Phone',
                name        : 'phone',
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'Fax',
                name        : 'fax',
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'Cell',
                name        : 'cell',
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'Email',
                name        : 'email',
                value		: ''
            },
            {
                xtype		: 'urlfield',
                label  		: 'URL',
                name        : 'url',
                value		: ''
            },
            {
				xtype	: 'label',
				html	: '<i class="fas fa-map-marker"></i> Address',
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}		
			},
			{
                xtype       : 'textfield',
                label  		: 'Street Number',
                name        : 'street_no',
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'Street',
                name        : 'street',
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'Town / Suburb',
                name        : 'town_suburb',
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'City',
                name        : 'city',
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'Country',
                name        : 'country',
                value		: ''
            },
            {
                xtype       : 'numberfield',
                name        : 'lon',  
                label  		: 'Longitude',
                value       : 0,
                maxValue    : 180,
                minValue    : -180,
                decimalPrecision: 14
            },
            {
                xtype       : 'numberfield',
                name        : 'lat',  
                label  		: 'Latitude',
                value       : 0,
                maxValue    : 90,
                minValue    : -90,
                decimalPrecision: 14
            },
            {
				xtype	: 'label',
				html	: '<i class="fab fa-facebook"></i> Social Media',
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}		
			},
			{
                xtype		: 'urlfield',
                label  		: 'Twitter',
                name        : 'twitter',
				value		: ''
            },
			{
                xtype		: 'urlfield',
                label  		: 'Facebook',
                name        : 'facebook',
				value		: ''
            },
			{
                xtype		: 'urlfield',
                label  		: 'Youtube',
                name        : 'youtube',
                value		: ''
            },
			{
                xtype		: 'urlfield',
                label  		: 'Google+',
                name        : 'google_plus',
                value		: ''
            },
			{
                xtype		: 'urlfield',
                label  		: 'LinkedIn',
                name        : 'linkedin',
                value		: ''
            },
            {
				xtype	: 'label',
				html	: '<i class="fas fa-gavel"></i> Terms & Conditions',
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}		
			},
			{
                xtype       : 'textfield',
                label  		: 'Title',
                name        : 't_c_title',
                value		: ''
            },
			{
				xtype     	: 'textareafield',
				grow      	: true,
				name      	: 't_c_content',
                maxRows		: 4,
				label		: 'Content'
			}               
		];	
		me.setItems(items);        
 	}
});
