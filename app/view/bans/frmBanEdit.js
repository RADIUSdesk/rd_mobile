// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.bans.frmBanEdit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmBanEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Edit Block or Speed Limit',
    root 	: false,
    requires	: [
        'RdMobile.view.bans.vcBanEdit',
    ],
    controller  : 'vcBanEdit',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  = this;  
        
         var cmbApProfile = Ext.create('RdMobile.view.components.cmbApProfile',{
		    itemId      : 'ap_profile_id',
		    hidden		: true,
		    disabled	: true
	    });
	    
	    var cmbMesh = Ext.create('RdMobile.view.components.cmbMesh',{
		    itemId      : 'mesh_id',
		    hidden		: true,
		    disabled	: true
	    });
            
        var items = [
			{
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> General',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'		
			},
			{
		        xtype       : 'textfield',
		        name        : 'id',
		        hidden		: true
		    },
		    {
		        xtype       : 'textfield',
		        label  		: 'MAC Address',
		        name        : 'mac',
		        required	: true,
				errorTarget: 'under'
		    },
		    {
                name        : 'alias',
                xtype		: 'textfield',
                label  		: 'Alias',
                value		: ''
            },
		    {
				xtype		: 'radiogroup',
				vertical	: false,
				itemId		: 'rgrpScope',
				items		: [
					{ label: 'Cloud Wide', 		name: 'scope', value: 'cloud_wide', checked: true},
					{ label: 'Mesk Network', 	name: 'scope', value: 'mesh_only'},
					{ label: 'AP Profile',  	name: 'scope', value: 'ap_profile_only'}
				]
			},
			cmbApProfile,
			cmbMesh,
			{
				xtype		: 'radiogroup',
				itemId		: 'rgrpAction',
				vertical	: false,
				items		: [
					{ label: 'Block', 	   		name: 'action', value: 'block', checked: true },
					{ label: 'Speed Limit', 	name: 'action', value: 'limit'},
					{ label: 'Firewall Profile',name: 'action', value: 'firewall'}
				]
			},
			{
	            xtype       : 'rdSliderSpeed',
	            sliderName  : 'limit_upload',
	            itemId		: 'bw_up',
	            label  		: "<i class='fa fa-arrow-up'></i> Up",
	            hidden		: true,
	            disabled	: true
	        },
            {
	            xtype       : 'rdSliderSpeed',
	            sliderName  : 'limit_download',
	            itemId		: 'bw_down',
	            label  		: "<i class='fa fa-arrow-down'></i> Down",
	            hidden		: true,
	            disabled	: true
	        },
	        {
            	xtype		: 'cmbFirewallProfile',
            	label		: 'Firewall Profile',
            	include_all_option : false,
            	disabled	: true,
            	hidden		: true
                          	
            }
		];	
		me.setItems(items); 
		var d = me.r.getData();
     	me.setValues(d);       
 	}
});
