// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.realms.frmRealmEditLogo', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmRealmEditLogo',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-pencil-alt',
    root 	: false,
    requires	: [
        'RdMobile.view.realms.vcRealmEditLogo',
    ],
    controller  : 'vcRealmEditLogo',
    url         : Ext.BLANK_IMAGE_URL,
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadLogo' //Trigger a load of the settings (This is only on the initial load)
    },
    layout      : {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretchmax'
    },
    initialize: function () {
        const me  = this;
        
        me.setTitle(me.realm_name);
        
        var tplImg = new Ext.Template([
            "<div class='divMapAction'>",
                "<img src='{image}' alt='Realm logo'>",
            "</div>"
        ]);
              
        var items = [
        	{
		        xtype   : 'textfield',
		        name    : 'id',
		        hidden  : true,
		        value	: me.realm_id
		    },
			{
				xtype	: 'label',
				html	: 'Current Logo',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'		
			},
			{
				xtype	: 'container',
				tpl		: tplImg,
				itemId  : 'pnlImg',
				data	: {img : me.url},
				flex	: 1		
			},
			{
			    xtype	: 'filefield',
			    label	: "New Logo",
			    name	: 'photo',
			    accept	: 'image'
			}
		];	
		me.setItems(items);        
 	}
});
