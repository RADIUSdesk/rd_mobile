// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.vouchers.frmVoucherEmail', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmVoucherEmail',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'email voucher detail',
    controller  : 'vcVoucherEmail',
    standardSubmit : false,
    requires	: [
    	'RdMobile.view.vouchers.vcVoucherEmail'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
   initialize: function () {
        const me = this;
        var items = [
			{

		        xtype   : 'textfield',
		        hidden  : true,
		        name    : 'id',
		        value	: me.voucher_id
		    },
			{
				xtype	: 'label',
				html	: me.voucher_name,
				itemId	: 'lblBasic',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
		        xtype	: 'emailfield',
		        label	: 'Email',
		        name	: 'email',
		        required: true,
		        errorTip: {
				    anchor: true,
				    align: 'l-r?'
				},
				errorTarget: 'under'
			},
		    {
		        xtype	: 'textareafield',
		        label	: 'Extra Message',
		        maxRows	: 4,
		        name	: 'message'
		    }
		];
		
		me.setItems(items);        
 	}
    
});
