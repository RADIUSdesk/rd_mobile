Ext.define('RdMobile.view.devices.frmDeviceEnableDisable', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmDeviceEnableDisable',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title		: 'Enable / Disable',
    controller  : 'vcDeviceEnableDisable',
    standardSubmit : false,
    requires	: [
        'RdMobile.view.devices.vcDeviceEnableDisable'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function (){
        const me 	= this;
        var items 	= [
        	{

		        xtype   : 'textfield',
		        hidden  : true,
		        name    : 'id',
		        value	: me.device_id
		    },
			{
				xtype	: 'label',
				html	: me.device_name,
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}			
			},
			{
				xtype	: 'radiogroup',
				label	: 'Action',
				vertical: false,
				height	: 150,
				items	: [
				     { label: 'Enable',    name: 'rb',     value: 'enable', checked: true },
                     { label: 'Disable',   name: 'rb',     value: 'disable'}
				]
			}
		];	
		me.setItems(items);     
    }
    
});
