// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cntInetQmi', {
    extend 	: 'Ext.Container',
    alias   : 'widget.cntInetQmi',
    hidden  : true,
    disabled: true,
    style   : 'background:rgb(46, 95, 115);',
    padding	: 10,
    margin	: 10,
    items   : [               
        { 
            xtype       : 'cmbQmiAuth',
            name        : 'qmi_auth',
            listeners       : {
				    change : 'onCmbQmiOptionsChange'
		    }  
        },       
        {
            xtype       : 'textfield',
            label  		: 'Username',
            name        : 'qmi_username',
            itemId      : 'qmi_username',
            hidden      : true,
            disabled    : true,
            value		: ''
        },
        {
            xtype       : 'textfield',
            label  		: 'Password',
            name        : 'qmi_password',
            itemId      : 'qmi_password',
            hidden      : true,
            disabled    : true,
            value		: ''
        },
        {
            xtype       : 'textfield',
            label  		: 'APN',
            name        : 'qmi_apn',
            value		: ''
        }, 
        {
            xtype       : 'textfield',
            label  		: 'Pincode',
            name        : 'qmi_pincode',
            value		: ''
        }
    ]
});
