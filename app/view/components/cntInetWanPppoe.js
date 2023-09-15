// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cntInetWanPppoe', {
    extend 	: 'Ext.Container',
    alias   : 'widget.cntInetWanPppoe',
    hidden  : true,
    disabled: true,
    padding	: 10,
    margin	: 10,
    requires	: [
        'Ext.data.validator.IPAddress',
        'Ext.data.validator.Format'
    ],
    listeners       : {
        disabledchange : 'onDisabledchange'
    },
    items   :  [
        {
            xtype       : 'textfield',
            label  		: 'Username',
            name        : 'wan_pppoe_username',
            required	: true,
            errorTarget : 'under',
            disabled	: true
        },
        {
            xtype       : 'passwordfield',
            revealable	: true,
            name      	: 'wan_pppoe_password',
            label     	: 'Password',
            required	: true,
            errorTarget : 'under',
            disabled	: true
        }, 
        {
            xtype       : 'textfield',
            label  		: 'DNS Primary',
            name        : 'wan_pppoe_dns_1',
            value		: '',
            validators	: {
				type: 'ipaddress'
			},
			errorTarget : 'under'
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Secondary',
            name        : 'wan_pppoe_dns_2',
            value		: '',
            validators	: {
				type: 'ipaddress'
			},
			errorTarget : 'under'
        },
        {
	        xtype       : 'textfield',
	        label  		: 'My Own MAC',
	        name        : 'wan_pppoe_mac',
	        value		: '',
	        validators	: {
			    type	: 'format',
        		message	: 'Example: 01-23-45-67-89-AB',
        		matcher	: /^([a-fA-F0-9]{2}-){5}[a-fA-F0-9]{2}$/
			},
			errorTarget : 'under'
        },
        {
	        xtype       : 'textfield',
	        label  		: 'MTU',
	        name        : 'wan_pppoe_mtu',
	        value		: '',
	        validators	: {
				type: 'number'
			},
			errorTarget : 'under'
        }       
    ]
});
