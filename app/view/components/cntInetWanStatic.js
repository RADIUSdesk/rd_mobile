// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cntInetWanStatic', {
    extend 	: 'Ext.Container',
    alias   : 'widget.cntInetWanStatic',
    hidden  : true,
    disabled: true,
    padding	: 10,
    margin	: 10,
    requires	: [
        'Ext.data.validator.IPAddress'
    ],
    listeners       : {
        disabledchange : 'onDisabledchange'
    },
    items   :  [
        {
            xtype       : 'textfield',
            label  		: 'IP Address',
            name        : 'wan_static_ipaddr',
            required	: true,
            errorTarget : 'under',
            disabled    : true,
            validators	: {
				type: 'ipaddress'
			}
        },
        {
            xtype       : 'textfield',
            label  		: 'Netmask',
            name        : 'wan_static_netmask',
            required	: true,
            errorTarget : 'under',
            disabled    : true,
            validators	: {
				type: 'ipaddress'
			}
        },
        {
            xtype       : 'textfield',
            label  		: 'Gateway',
            name        : 'wan_static_gateway',
            required	: true,
            errorTarget : 'under',
            disabled    : true,
            validators	: {
				type: 'ipaddress'
			}
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Primary',
            name        : 'wan_static_dns_1',
            value		: '',
            validators	: {
				type: 'ipaddress'
			},
			errorTarget : 'under'
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Secondary',
            name        : 'wan_static_dns_2',
            value		: '',
            validators	: {
				type: 'ipaddress'
			},
			errorTarget : 'under'
        }
    ]
});
