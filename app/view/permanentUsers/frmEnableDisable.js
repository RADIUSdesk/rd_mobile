Ext.define('RdMobile.view.permanentUsers.frmEnableDisable', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmEnableDisable',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title		: 'Enable / Disable',
    controller  : 'vcEnableDisable',
    standardSubmit : false,
    requires	: [
        'RdMobile.view.permanentUsers.vcEnableDisable'
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
		        value	: me.user_id
		    },
			{
				xtype	: 'label',
				html	: me.user_name,
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
