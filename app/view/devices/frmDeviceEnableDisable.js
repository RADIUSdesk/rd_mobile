// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.devices.frmDeviceEnableDisable', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmDeviceEnableDisable',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls     : 'x-fa fa-pencil-alt',
    title		: 'Enable / Disable',
    controller  : 'vcDeviceEnableDisable',
    standardSubmit : false,
    requires	: [
        'RdMobile.view.devices.vcDeviceEnableDisable'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function (){
        const me 	= this;
        var items 	= [
        	{

		        xtype   : 'textfield',
		        hidden  : true,
		        name    : 'id',
		        value	: me.device_id
		    },
			{
				xtype	: 'label',
				html	: me.device_name,
				margin	: 0,
				padding : 5,
				cls		: 'form-section'			
			},
			{
				xtype	: 'radiogroup',
				label	: 'Action',
				vertical: false,
				height	: 150,
				items	: [
				     { label: 'Enable',    name: 'rb',     value: 'enable', checked: true },
                     { label: 'Disable',   name: 'rb',     value: 'disable'}
				]
			}
		];	
		me.setItems(items);     
    }
    
});
