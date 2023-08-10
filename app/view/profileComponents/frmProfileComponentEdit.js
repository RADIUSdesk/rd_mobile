// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profileComponents.frmProfileComponentEdit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmProfileComponentEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Edit Profile Component',
    requires	: [
        'RdMobile.view.profileComponents.vcProfileComponentEdit',
    ],
    controller  : 'vcProfileComponentEdit',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    record : null,
    initialize: function () {
        const me = this;      
        var hide_system = true;
        if(me.root){
            hide_system = false;
        }             
    	var items = [
			{
				xtype	: 'label',
				html	: 'Basic Info',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
                itemId  	: 'id',
                xtype   	: 'textfield',
                name    	: "id",
                hidden  	: true
            },		
		    {
		        xtype       : 'textfield',
		        label  		: 'Name',
		        name        : 'name',
		        readOnly 	: true,
                disabled	: true
		    },
		    {
		        xtype		: 'checkboxfield',
		        label		: 'System Wide',
		        name    	: 'for_system',
		      	value  		: 'for_system',
		      	labelWidth 	: 200,
		        checked		: false,
		       	hidden      : hide_system,
                disabled    : hide_system            
		    }
		];
		me.setItems(items);
		me.setValues(me.r.getData());
	}
});
