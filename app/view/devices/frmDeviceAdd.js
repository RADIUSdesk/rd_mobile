// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.devices.frmDeviceAdd', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmDeviceAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Add Device',
    iconCls : 'x-fa fa-plus',
    requires	: [
        'RdMobile.view.components.cmbProfile',
        'RdMobile.view.components.cmbPermanentUser',
        'RdMobile.view.devices.vcDeviceAdd',
    ],
    controller  : 'vcDeviceAdd',
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
            xtype       : 'textfield',
            label  		: 'MAC Address',
            itemId		: 'txtMacAddress',
            name        : 'name',
            required	: true,
            errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under',
		    validators	: [ /^([a-fA-F0-9]{2}-){5}[a-fA-F0-9]{2}$/ ],
		    validationMessage :'Example: 01-23-45-67-89-AB',
		    requiredMessage :'Example: 01-23-45-67-89-AB'
        },
        {
            xtype       : 'textfield',
            label  		: 'Description',
            name        : 'description',
            required	: true,
            errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
        },
        {	
        	xtype		: 'cmbPermanentUser',
        	name		: 'permanent_user_id',
        	label		: 'Owner'
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
            label	: 'Active',
            name    : 'active',
          	value  	: 'active',
          	labelWidth : 200,
            checked	: true
        },
        {
            xtype	: 'checkboxfield',
            label	: 'Never Expire',
            name  	: 'never_expire',
           	value  	: 'never_expire',
            itemId  : 'never_expire',
          	labelWidth : 200,
            checked	: true
        },       
        {
            xtype	: 'datefield',
            label	: 'From',
            name	: 'from_date',
            itemId  : 'from_date',
            minValue: new Date(),  // limited to the current date or after
            hidden      : true,
            disabled    : true
        },       
        {
            xtype	: 'datefield',
            label	: 'To',
            name	: 'to_date',
            itemId  : 'to_date',
            minValue: new Date(),  // limited to the current date or after
            hidden      : true,
            disabled    : true
        }
    ]
});
