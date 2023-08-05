Ext.define('RdMobile.view.aps.frmApEditGeneral', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmApEditGeneral',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-pencil-alt',
    title	: 'Edit AP Profile General',
    root 	: false,
    requires	: [
        'RdMobile.view.aps.vcApEditGeneral',
    ],
    controller  : 'vcApEditGeneral',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadApSettings' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me  = this;    	          
        var items = [
        	{
				xtype       : 'textfield',
				hidden		: true,
				name		: 'ap_profile_id',
				value		: me.apProfileId	
			},
		    {
		        xtype       : 'textfield',
		        label  		: 'Name',
		        name        : 'name',
		        required	: true,
				errorTarget: 'under'
		    },
            {
                xtype       : 'checkbox',
                label    	: 'Enable Alerts',
                name        : 'enable_alerts',
                labelWidth  : 'auto'
            },
            {
                xtype       : 'checkbox',
                label    	: 'Include In Overviews',
                name        : 'enable_overviews',
                labelWidth  : 'auto'  
            }            
		];	
		me.setItems(items);        
 	}
});
