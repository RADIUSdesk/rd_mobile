// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cntInetWifiPppoe', {
    extend 	: 'Ext.Container',
    alias   : 'widget.cntInetWifiPppoe',
    hidden  : true,
    disabled: true,
    style   : 'background:rgb(46, 95, 115);',
    padding	: 10,
    margin	: 10,
    listeners       : {
        disabledchange : 'onDisabledchange'
    },
    items   :  [
        {
            label  		: 'SSID',
            name        : 'wifi_pppoe_ssid',
            maxLength   : 31,
            required	: true,
            errorTarget : 'under',
            regex       : /^[\w\-\s]+$/,
            regexText   : "Only words allowed", //FIXME
            xtype       : 'textfield',
            disabled	: true
        }, 
        { 
            xtype       : 'cmbEncryptionOptionsSimple',
             name       : 'wifi_pppoe_encryption',
            listeners       : {
				    change : 'onCmbEncryptionOptionsChangePppoe'
		    }  
        },
        {
            label  		: 'Passphrase',
            name        : 'wifi_pppoe_key',
            itemId      : 'wifi_pppoe_key',                 
            required	: true,
            errorTarget : 'under',
            xtype       : 'textfield',
            minLength   : 8,//FIXME
            hidden      : true,
            disabled    : true
        },
        {
            xtype       : 'radiogroup',
            label  		: 'Radio',
            itemId      : 'rgrpWifiPppoeRadio',
            vertical    : false,
            items       : [
                {
                    label  	: 'Radio0',
                    name    : 'wifi_pppoe_device',
                    value	: 'radio0',
                    itemId 	: 'wifi_pppoe_radio_0',
                    checked	: true
                }, 
                {
                    label  	: 'Radio1',
                    name    : 'wifi_pppoe_device',
                    value	: 'radio1',
                    itemId  : 'wifi_pppoe_radio_1'
                },
                { 
                    label  	: 'Radio2',
                    name  	: 'wifi_pppoe_device',
                    value	: 'radio2',
                    itemId    : 'wifi_pppoe_radio_2'
                }    
            ]
        },
        {
            xtype       : 'textfield',
            label  		: 'Username',
            name        : 'wifi_pppoe_username',
           	required	: true,
            errorTarget : 'under',
            disabled	: true
        },
        {
            xtype       : 'passwordfield',
            revealable	: true,
            name      	: 'wifi_pppoe_password',
            label     	: 'Password',
            required	: true,
            errorTarget : 'under',
            disabled	: true
        }, 
        {
            xtype       : 'textfield',
            label  		: 'DNS Primary',
            name        : 'wifi_pppoe_dns_1',
            value		: ''
            //vtype       : 'IPAddress'//FIXME
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Secondary',
            name        : 'wifi_pppoe_dns_2',
            value		: ''
            //vtype       : 'IPAddress'//FIXME
        },
        {
	        xtype       : 'textfield',
	        label  		: 'My Own MAC',
	        name        : 'wifi_pppoe_mac',
	        value		: ''
	        ////vtype       : 'MacAddress',
	        ////fieldStyle  : 'text-transform:uppercase'
        },
        {
	        xtype       : 'textfield',
	        label  		: 'MTU',
	        name        : 'wifi_pppoe_mtu',
	        value		: ''
	        ////vtype       : 'Numeric',
        }       
    ]
});
