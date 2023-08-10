// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.vouchers.frmVoucherPdf', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmVoucherPdf',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'PDF Export',
    controller  : 'vcVoucherPdf',
    standardSubmit : false,
    requires	: [
    	'RdMobile.view.vouchers.vcVoucherPdf',
        'RdMobile.view.vouchers.cmbPdfFormats'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    items: [
    	{
			xtype	: 'label',
			html	: 'Basic',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'	
		},
		{ 
			xtype  	: 'cmbPdfFormats'
		},
		{
		    xtype	: 'combobox',
		    label	: 'Language',
		    queryMode: 'local',
		    displayField: 'name',
		    name  	: 'language',
		    valueField: 'id',
		    value	: "4_4",
		    store   : [
		    	{"id":"4_4", "name": "United Kingdom -\u003E English"},

			]
		},
		{
            xtype	: 'checkboxfield',
            label	: 'Only Selected',
            name   	: 'selected_only',
            value   : 'selected_only',
			itemId	: 'selected_only',
            checked	: true
        },
        {
			xtype	: 'label',
			html	: 'Advanced',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'			
		},
		{
		    xtype	: 'combobox',
		    label	: 'Orientation',
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id',
		    value	: "P",
		    name	: 'orientation',
		    store   : [
		    	{"id":"P", "name":"Portrait"},
				{"id":"L", "name":"Landscape"}
			]
		},
		{
		    xtype	: 'radiogroup',
		    label	: 'Display',
		    vertical: false,
		    height	: 150,
		    items	: [
		        { label: 'QR code', name : 'logo_or_qr', value: 'qr' },
		        { label: 'Logo', 	name : 'logo_or_qr', value: 'logo',checked     : true },
		        { label: 'Nothing', name : 'logo_or_qr', value: 'nothing' }
		    ]
		},
		{
		    xtype	: 'checkboxgroup',
		    label	: 'Include',
		    vertical: false,
		    height	: 200,
		    items	: [
		        { label: 'Date', 	name: 'date', 		value: 'date' ,checked: true},
		        { label: 'T&C', 	name: 't_and_c', 	value: 't_and_c', checked: true },
		        { label: 'Social Media', 	name: 'social_media', 	value: 'social_media', checked: true  },
		        { label: 'Realm Detail', 	name: 'realm_detail', 	value: 'realm_detail', checked: true   },
		        { label: 'Profile Detail', 	name: 'profile_detail', value: 'profile_detail' , checked: true  },
		        { label: 'Extra Field', 	name: 'extra_fields', 	value: 'extra_fields', checked: true   }
		    ]
		}
    ]
});
