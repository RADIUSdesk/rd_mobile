// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.permanentUsers.frmPermanentUserEmail', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmPermanentUserEmail',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title		: 'e-mail Credentials',
    controller  : 'vcPermanentUserEmail',
    standardSubmit : false,
    requires	: [
        'RdMobile.view.permanentUsers.vcPermanentUserEmail'
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
		        value   : me.userId
		    },
			{
				xtype	: 'label',
				html	: me.username,
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
				errorTarget: 'under',
				value   : me.email
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
