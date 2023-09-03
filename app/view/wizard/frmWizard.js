// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.wizard.frmWizard', {
	extend  : 'Ext.Panel',
    xtype   : 'frmWizard',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    title	: 'Setup Wizard',
    iconCls : 'x-fa fa-magic',    
    layout	: {
		type        : 'card',
		pack        : 'start',
		align       : 'stretch',
		animation   : 'slide',
		deferredRender: true
	},
    requires : [
        'RdMobile.view.wizard.vcWizard',
    ],
    controller  : 'vcWizard',
    initialize: function () {
        const me  		= this;         
        var scrnOne  	= me.mkScrnOne();
        var scrnTwo  	= me.mkScrnTwo();
        var scrnThree  	= me.mkScrnThree()
        me.setItems([
            scrnOne,
            scrnTwo,
            scrnThree
        ]);  
        this.callParent(arguments);  
 	},
 	mkScrnOne : function(){
        var me   = this;                         
        var scrnOne = Ext.create('Ext.form.Panel',{
        	itemId 	: 'scrnOne',
			buttons	: [
				{ ui: 'forward', text: 'Next', iconCls: 'x-fa fa-arrow-right', 		handler: 'onBtnOneNextClick' }  
			],
        	items	:[
        		{
					xtype	: 'label',
					html	: 'Step 1 of 3',
					margin	: 0,
					padding : 5,
					cls		: 'form-section'		
				},
                {
                    name        : 'name',
                    label		: 'The name of the Cloud',
                    xtype		: 'textfield',
                    itemId      : 'txtName',
					required	: true,
                    regex       : /^[\w\-\s]+$/,
                    regexText   : "Only words allowed",
                    listeners       : {
                        change  : 'onTxtNameChange',
                        blur    : 'onTxtNameBlur'
                    },
                    errorTarget : 'under' 
                },
                {
                    name        : 'password',
                    label		: 'Password for Permanet User',
                    xtype		: 'textfield',
                    itemId      : 'txtPassword',
                    required	: true,
                    minLength   : 5,
                    errorTarget : 'under'
                },
                {
                    name        : 'ssid_guest',
                    label		: 'The SSID used by guests (open)',
                    xtype		: 'textfield',
                    itemId      : 'ssid_guest',
                    value       : 'Guest',
                    required	: true,
                    maxLength   : 31,
                    regex       : /^[\w\-\s]+$/,
                    regexText   : "Only words allowed",
                    errorTarget : 'under'
                },
                {
                    name        : 'ssid_wireless',
                    label		: 'The SSID used by staff (secure)',
                    xtype		: 'textfield',
                    itemId      : 'ssid_wireless',
                    value       : 'Wireless',
                    maxLength   : 31,
                    required	: true,
                    regex       : /^[\w\-\s]+$/,
                    regexText   : "Only words allowed",
                    errorTarget : 'under'
                },
                {
                    name        : 'key_wireless',
                    label		: 'Secure SSID passphrase',
                    xtype		: 'textfield',
                    itemId      : 'key_wireless',
                    value       : '12345678',
                    minLength   : 8,
                    required	: true,
                    errorTarget : 'under'
                }        	
        	]    
        });
        return scrnOne;       
    },
    mkScrnTwo : function(){
        var me   = this;                         
        var scrnTwo = Ext.create('Ext.form.Panel',{
        	itemId 	: 'scrnTwo',
			buttons	: [
				{ ui: 'decline',  text: 'Cancel', iconCls: 'x-fa fa-ban', 	handler: 'onBtnCancelClick'  },
				{
                    xtype: 'spacer'
                }, 
				{ ui: 'forward', text: 'Next', iconCls: 'x-fa fa-arrow-right',  handler: 'onBtnTwoNextClick' }  
			],
        	items	:[
        		{
					xtype	: 'label',
					html	: 'Step 2 of 3',
					margin	: 0,
					padding : 5,
					cls		: 'form-section'		
				},
                {
                    xtype       : 'cmbCountries',
                    errorTarget : 'under',
                    required	: true
                    
                },
                {
                    xtype       : 'cmbTimezones',
                    errorTarget : 'under',
                    required	: true
                },       
                {
                    xtype       : 'label',
                    html        : 'Select the user types you want to use'
                },
                {
                    label       : 'Vouchers',
                    xtype		: 'checkbox',
                    name        : 'voucher_login_check',
                    checked     : true
                }, 
                {
                    label    	: 'Permanent Users',
                    xtype		: 'checkbox',
                    name        : 'user_login_check',
                    checked     : true
                }, 
                {
                    label    	: 'Click to connect',
                    xtype		: 'checkbox',
                    name        : 'connect_check',
                    checked     : true
                }    
        	]    
        });
        return scrnTwo;       
    },
    mkScrnThree : function(){
        var me   = this;       
        var tplImg  = new Ext.Template([
            "<div class='divMapAction'>",
                "<img src='{image}' alt='DynamicDetail logo'>",
            "</div>"
        ]);
                               
        var scrnThree = Ext.create('Ext.form.Panel',{
        	itemId 	: 'scrnThree',
        	layout: {
                type    : 'vbox',
                align   : 'stretch'
            },
			buttons	: [
				{ ui : 'forward', text	: 'Save', iconCls: 'x-fa fa-check', handler: 'onBtnLogoSaveClick' },
				{
                    xtype: 'spacer'
                }, 
				{ ui: 'decline',  text: 'Cancel', iconCls: 'x-fa fa-ban', 	handler: 'onBtnCancelClick'  },
				{
                    xtype: 'spacer'
                }, 
				{ ui: 'forward', text: 'Next', iconCls: 'x-fa fa-arrow-right',  handler: 'onBtnThreeNextClick' }						 
			],
        	items	:[
        		{
					xtype	: 'label',
					html	: 'Step 3 of 3 -> Select Logo',
					margin	: 0,
					padding : 5,
					cls		: 'form-section'		
				},
				{
                    xtype   : 'panel',
                    flex    : 1,
                    border  : false,
                    itemId  : 'pnlImg',
                    tpl     : tplImg,
                    data    : {img : me.url}
                },
                {
                    xtype	: 'filefield',
                    label	: "New Logo ",
                    name    : 'photo',
                    accept	: 'image',
                    required: true,
                    errorTarget : 'under'
                }
        	]    
        });
        return scrnThree;       
    }
});
