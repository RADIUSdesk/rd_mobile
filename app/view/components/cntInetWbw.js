// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cntInetWbw', {
    extend 	: 'Ext.Container',
    alias   : 'widget.cntInetWbw',
    hidden  : true,
    disabled: true,
    padding	: 10,
    margin	: 10,
    listeners       : {
        disabledchange : 'onDisabledchange'
    },
    items   : [
        {
            label  		: 'SSID',
            name        : 'wbw_ssid',
            maxLength   : 31,
            required	: true,
            //regex       : /^[\w\-\s]+$/,
            //regexText   : "Only words allowed",
            //emptyText   : 'Specify a value to continue', //FIXME Add check
            xtype       : 'textfield',
            errorTarget : 'under',
            disabled	: true
        }, 
        { 
            xtype       : 'cmbEncryptionOptionsSimple',
            listeners       : {
				    change : 'onCmbEncryptionOptionsChangeWbw'
		    }  
        },
        {
            label  		: 'Passphrase',
            name        : 'wbw_key',
            itemId      : 'wbw_key',
            required	: true,
            xtype       : 'textfield',
            minLength   : 8,//FIXME Add min check
            hidden      : true,
            disabled    : true,
            errorTarget: 'under',
            disabled	: true
        },
        {
            xtype       : 'radiogroup',
            label  		: 'Radio',
            itemId      : 'rgrpWbWradio',
            vertical    : false,
            items       : [                        
                {
                    label  		: 'Radio0',
                    name      : 'wbw_device',
                    value		: 'radio0',
                    itemId    : 'wbw_radio_0',
                    margin    : '0 15 0 0',
                    checked   : true
                }, 
                {
                    label  	: 'Radio1',
                    name    : 'wbw_device',
                    value	: 'radio1',
                    itemId  : 'wbw_radio_1'
                },
                { 
                    label  	: 'Radio2',
                    name    : 'wbw_device',
                    value	: 'radio2',
                    itemId 	: 'wbw_radio_2'
                }    
            ]
        }
    ]
});
