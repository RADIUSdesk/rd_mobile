// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profiles.frmProfileAdd', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmProfileAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Add Profile',
    root 	: false,
    requires	: [
        'RdMobile.view.profiles.vcProfileAdd',
    ],
    controller  : 'vcProfileAdd',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me 		= this;      
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
		        xtype		: 'checkboxfield',
		        label		: 'System Wide',
		        name    	: 'for_system',
		      	value  		: 'for_system',
		      	labelWidth 	: 200,
		        checked		: false,
		       	hidden      : hide_system,
                disabled    : hide_system            
		    },
		    {
		        xtype       : 'textfield',
		        label  		: 'Name',
		        name        : 'name',
		        required	: true,
		        errorTip: {
				    anchor: true,
				    align: 'l-r?'
				},
				errorTarget: 'under'
		    }
		];
		
		me.setItems(items);        
 	}
});
