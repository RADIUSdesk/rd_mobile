// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.vouchers.frmVoucherEdit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmVoucherEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title		: 'Edit Voucher',
    controller  : 'vcVoucherEdit',
    standardSubmit : false,
    requires	: [
        'RdMobile.view.vouchers.vcVoucherEdit',
        'RdMobile.view.components.cmbRealm',
        'RdMobile.view.components.cmbProfile'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    items: [
    	{
			xtype	: 'label',
			html	: 'Basic Info',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'
		},
		{
            xtype   : 'textfield',
            name    : 'id',
            hidden  : true,
            value   : true
        },
    	{
        	xtype	: 'cmbRealm',
        	required: true,
        	errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
    	},
    	{
        	xtype	: 'cmbProfile',
        	required: true,
        	errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
    	},
        {
			xtype	: 'label',
			html	: 'Activate & Expire',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'		
		},
		{
            xtype	: 'checkboxfield',
            label	: 'Activate Upon First Login',
            name    : 'activate_on_login',
          	itemId  : 'activate_on_login',
          	labelWidth : 200,
            checked	: false
        },
        {
            xtype	: 'numberfield',
            label	: 'Days Available After First Login',
            minValue: 0,
            maxValue: 366,
            value	: 0,
            name    : 'days_valid',
			required: true,
			errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under',
		    itemId 	: 'days_valid',
            hidden  : true,
            disabled: true
        },
        {
            xtype	: 'numberfield',
            label	: 'Hours Available After First Login',
            minValue: 0,
            maxValue: 23,
            value	: 0,
            name    : 'hours_valid',
			required: true,
			errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under',
		    itemId 	: 'hours_valid',
            hidden  : true,
            disabled: true
        },
        {
            xtype	: 'numberfield',
            label	: 'Minutes Available After First Login',
            minValue: 0,
            maxValue: 59,
            value	: 0,
            name    : 'minutes_valid',
			required: true,
			errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under',
		    itemId 	: 'minutes_valid',
            hidden  : true,
            disabled: true
        },
        {
            xtype	: 'checkboxfield',
            label	: 'Never Expire',
            name  	: 'never_expire',
            itemId  : 'never_expire',
          	labelWidth : 200,
            checked	: true
        },
        {
            xtype	: 'datefield',
            label	: 'Expire',
            name   	: 'expire',
            itemId  : 'expire',
          	minValue    : new Date(),  // limited to the current date or after
            hidden  : true,
            disabled: true
        },
        {
			xtype	: 'label',
			html	: 'Extra Field',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'	
		},
		{
            xtype	: 'textfield',
            label	: 'Extra Name',
            name	: 'extra_name'
        },
        {
            xtype	: 'textfield',
            label	: 'Extra Value',
            name	: 'extra_value'
        }
    ]
});
