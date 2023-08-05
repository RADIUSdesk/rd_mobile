Ext.define('RdMobile.view.components.frmWifiEntryPoint', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmWifiEntryPoint',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 10,
    iconCls : 'x-fa fa-plus',
    title	: 'Add Entry',
    root 	: false,
    requires	: [
        'RdMobile.view.components.vcWifiEntryPoint',
        'RdMobile.view.components.cmbEncryptionOptions'
    ],
    controller  : 'vcWifiEntryPoint',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  = this; 
        
        var hide_apply_to_all = false;
        
        if(me.apProfileId){
        
        	hide_apply_to_all = true;
        }
        
           	          
        var items = [
			{
				xtype	: 'label',
				html	: 'Basic Info',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
		    {
                itemId  : 'id',
                xtype   : 'textfield',
                name    : 'id',
                hidden  : true
            }, 
            {
                itemId  : 'ap_profile_id',
                xtype   : 'textfield',
                name    : "ap_profile_id",
                hidden  : true,
                value   : me.apProfileId
            },
            {
                itemId  : 'mesh_id',
                xtype   : 'textfield',
                name    : "mesh_id",
                hidden  : true,
                value   : me.meshId
            }, 
            {
                xtype       : 'textfield',
                label  		: 'SSID',
                name        : 'name',
                required	: true,
				errorTarget : 'under'
            },
            {
                xtype       : 'radiogroup',
                label  		: 'Frequency',
                columns     : 3,
                vertical    : false,
                items       : [
                    {
                        label  		: '2.4G',
                        name      	: 'frequency_band',
                        value		: 'two'
                    }, 
                    {
                        label  		: '5G',
                        name      	: 'frequency_band',
                        value		: 'five'
                    },
                    {
                        label  		: '2.4 & 5G',
                        name      	: 'frequency_band',
                        value		: 'both',
                        checked		: true
                    },
                    {
                        label  		: '5G Lower',
                        name      	: 'frequency_band',
                        value		: 'five_lower'
                    }, 
                    {
                        label  		: '5G Upper',
                        name      	: 'frequency_band',
                        value		: 'five_upper'
                    }
                ]  
            },              
            {
                xtype       : 'checkbox',      
                label  		: 'Hidden',
                name        : 'hidden',
                checked     : false,
                labelWidth  : 'auto'
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Client Isolation',
                name        : 'isolate',
                checked     : false,
                labelWidth  : 'auto'
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Apply To All Nodes',
                name        : 'apply_to_all',
                checked     : true,
                labelWidth  : 'auto',
                hidden		: hide_apply_to_all
            },
            {
				xtype		: 'label',
				html		: 'Encryption',
				margin		: 0,
				padding 	: 5,
				cls			: 'form-section'	
			},
            { 
                xtype     	: 'cmbEncryptionOptions',
                required	: true,
                errorTarget : 'under' 
            },
            {
                xtype       : 'textfield',
                label  		: 'Key',
                name        : 'special_key',
                itemId      : 'key',
                minLength   : 8,
                required	: true,
                errorTarget : 'under',
                hidden      : true,
                disabled    : true
            }, 
            {
                xtype       : 'textfield',
                label  		: 'RADIUS server',
                name        : 'auth_server',
                itemId      : 'auth_server',
                required	: true,
                errorTarget : 'under',
                hidden      : true,
                disabled    : true
            },
            {
                xtype       : 'textfield',
                label  		: 'Shared secret',
                name        : 'auth_secret',
                itemId      : 'auth_secret',
                required	: true,
                errorTarget : 'under',
                hidden      : true,
                disabled    : true
            },
             {
                xtype       : 'checkbox',      
                label  		: 'Generate NAS ID',
                name        : 'auto_nasid',
                checked     : true,
                itemId      : 'chk_auto_nasid',
                hidden      : true,
                disabled    : true
            },
            {
                xtype       : 'textfield',
                label  		: 'NAS ID',
                name        : 'nasid',
                itemId      : 'nasid',
                required	: true,
                errorTarget : 'under',
                hidden      : true,
                disabled    : true
            }, 
            {
                xtype       : 'checkbox',      
                label  		: 'Accounting',
                name        : 'accounting',
                checked     : true,
                itemId      : 'chk_accounting',
                hidden      : true,
                disabled    : true
            },
            {
                xtype       : 'numberfield',
                name        : 'default_vlan',
                itemId      : 'default_vlan',
                label  		: 'Default VLAN',
                value       : 0,
                maxValue    : 4094,
                minValue    : 0,
                required	: true,
				errorTarget : 'under',
                hidden      : true,
                disabled    : true,
            },
            {
                xtype       : 'textfield',
                label  		: 'Default Key',
                name        : 'default_key',
                itemId      : 'default_key',
                minLength   : 8,
                required	: true,
				errorTarget : 'under',
                hidden      : true,
                disabled    : true
            }      
		];	
		me.setItems(items);        
 	}
});
