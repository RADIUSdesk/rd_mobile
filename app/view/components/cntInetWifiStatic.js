Ext.define('RdMobile.view.components.cntInetWifiStatic', {
    extend 	: 'Ext.Container',
    alias   : 'widget.cntInetWifiStatic',
    hidden  : true,
    disabled: true,
    style   : 'background:rgb(46, 95, 115);',
    padding	: 10,
    margin	: 10,
    listeners       : {
        disabledchange : 'onDisabledchange'
    },
    items   : [
        {
            label  		: 'SSID',
            name        : 'wifi_static_ssid',
            maxLength   : 31,
            required	: true,
            errorTarget : 'under',
            //regex       : /^[\w\-\s]+$/,
            //regexText   : "Only words allowed",
            //emptyText   : 'Specify a value to continue',
            xtype       : 'textfield',
            disabled	: true
        }, 
        { 
            xtype       : 'cmbEncryptionOptionsSimple',
             name       : 'wifi_static_encryption',
            listeners       : {
				    change : 'onCmbEncryptionOptionsChangeStatic'
		    }  
        },
        {
            label  		: 'Passphrase',
            name        : 'wifi_static_key',
            itemId      : 'wifi_static_key',
            required	: true,
            errorTarget : 'under',
            xtype       : 'textfield',
            minLength   : 8, //FIXME
            hidden      : true,
            disabled    : true
        },
        {
            xtype       : 'radiogroup',
            label  		: 'Radio',
            itemId      : 'rgrpWifiStaticRadio',
            vertical    : false,
            items       : [
                {
                    label 	: 'Radio0',
                    name    : 'wifi_static_device',
                    value	: 'radio0',
                    itemId  : 'wifi_static_radio_0',
                    checked : true
                }, 
                {
                    label  	: 'Radio1',
                    name    : 'wifi_static_device',
                    value	: 'radio1',
                    itemId  : 'wifi_static_radio_1'
                },
                { 
                    label  	: 'Radio2',
                    name    : 'wifi_static_device',
                    value	: 'radio2',
                    itemId  : 'wifi_static_radio_2'
                }    
            ]
        },
        {
            xtype       : 'textfield',
            label  		: 'IP_Address',
            name        : 'wifi_static_ipaddr',
            required	: true,
            errorTarget : 'under',
            disabled	: true,
           //vtype       : 'IPAddress' //FIXME
        },
        {
            xtype       : 'textfield',
            label  		: 'Netmask',
            name        : 'wifi_static_netmask',
            required	: true,
            errorTarget : 'under',
            disabled	: true,
            //vtype       : 'IPAddress' //FIXME
        },
        {
            xtype       : 'textfield',
            label  		: 'Gateway',
            name        : 'wifi_static_gateway',
            required	: true,
            errorTarget : 'under',
            disabled	: true,
            //vtype       : 'IPAddress' //FIXME
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Primary',
            name        : 'wifi_static_dns_1',
            value		: ''
            //vtype       : 'IPAddress' //FIXME
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Secondary',
            name        : 'wifi_static_dns_2',
            value		: ''
            //vtype       : 'IPAddress' //FIXME
        }
    ]
});
