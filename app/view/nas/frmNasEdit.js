Ext.define('RdMobile.view.nas.frmNasEdit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmNasEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-pencil-alt',
    root 	: false,
    requires	: [
        'RdMobile.view.nas.vcNasAdd',
    ],
    controller  : 'vcNasAdd',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  = this; 
        
        me.setTitle(me.nas_name);      
     	          
        var items = [
        	{
		        xtype   : 'textfield',
		        name    : 'id',
		        hidden  : true,
		        value	: me.nas_id
		    },
			{
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> General',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
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
                label  	    : 'NAS-Identifier',
                name        : "nasidentifier",
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'Called-Station-Id',
                name        : "calledstationid",
                value		: ''
            },
            {
				xtype	: 'label',
				html	: '<i class="fas fa-map-marker"></i> Maps',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
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
                xtype       : 'checkbox',      
                label    	: 'Dispaly_on_public_maps',
                name        : 'on_public_maps',
                checked     : false,
                labelWidth  : 'auto'
            },
            {
				xtype	: 'label',
				html	: '<i class="fas fa-star"></i> Enhancements',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
                xtype       : 'checkbox',      
                label    	: 'Active',
                name        : 'active',
                itemId      : 'active',
                checked     : true
            },
            {
                xtype       : 'checkbox',      
                label    	: 'Auto close stale sessions',
                name        : 'session_auto_close',
                itemId      : 'chkSessionAutoClose',
                labelWidth  : 'auto'
            },
            {
                xtype       : 'numberfield',
                itemId      : 'nrSessionDeadTime',
                name        : 'session_dead_time',
                label  		: 'Auto close activation time',
                disabled	: true,
                value       : 300,
                maxValue    : 21600,
                minValue    : 300
            },
            {
                xtype       : 'cmbTimezones',
                required    : false,
                value       : 24,
                required	: true,
			    errorTip	: {
					anchor: true,
					align: 'l-r?'
				},
				errorTarget: 'under'
            }
		];	
		me.setItems(items);        
 	}
});
