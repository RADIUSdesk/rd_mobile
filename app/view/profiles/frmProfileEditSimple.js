// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profiles.frmProfileEditSimple', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmProfileEditSimple',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: '0 10 0 10',
    margin	: 0,
    root 	: false,
    iconCls : 'x-fa fa-pencil-alt',
    requires	: [
        'RdMobile.view.profiles.vcProfileEditSimple',
        'RdMobile.view.profiles.cntDataLimit',
        'RdMobile.view.profiles.cntTimeLimit',
        'RdMobile.view.profiles.cntSpeedLimit'
    ],
    controller  : 'vcProfileEditSimple',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadProfileContent' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me 		= this;      
        var hide_system = true;
        if(me.root){
            hide_system = false;
        }
        
        me.setTitle(me.profile_name);
              
        var items = [
        
        	{
		        xtype   : 'textfield',
		        name    : 'id',
		        hidden  : true
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
		    },
		    {
                xtype       : 'cntDataLimit'
            },
            {
                xtype       : 'cntTimeLimit'
            },
            {
                xtype       : 'cntSpeedLimit'
            }
		];		
		me.setItems(items);        
 	}
});
