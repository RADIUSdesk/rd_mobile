// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.frmWifiMacBlock', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmWifiMacBlock',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-ban',
    title	: 'Apply Block',
    root 	: false,
    requires	: [
        'RdMobile.view.components.vcWifiMac',
    ],
    controller  : 'vcWifiMac',
    action		: 'block', // can be alias, firewall, limit or block (various forms with same controller)
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  	= this;      
        var d 		= me.r.getData();          	          
        var items = [
			{
				xtype	: 'label',
				tpl		: new Ext.XTemplate(
					'<div class="item-main" >',
	            		'{alias}',
	            	'</div>',
					'<div class="item-main clr-grey-dark" >',
	            		'{mac}',
	            	'</div>',            	
	            	'<div class="item-main clr-grey" >',
	            		'{vendor}',
	            	'</div>',
				),
				data	: d,
				margin	: 0,
				padding : 5
			},
			{
            	xtype       : 'textfield',
                name        : 'mac',
                hidden		: true,
                value       : d.mac,
            }, 
             {
            	xtype       : 'textfield',
                name        : 'mesh_id',
                hidden		: true,
                value       : me.mesh_id,
            },
             {
            	xtype       : 'textfield',
                name        : 'ap_id',
                hidden		: true,
                value       : me.ap_id,
            },
			{
				xtype		: 'radiogroup',
				columns		: 2,
				label  		: 'Scope',
				vertical	: false,
				items		: [
					{ label: 'Cloud Wide', name: 'scope', value: 'cloud_wide' },
					{ label: 'Mesh Only',  name: 'scope', value: 'network_only', checked: true}
				]
			},
            {
                xtype   : 'checkbox',      
                label   : 'Remove Block',
				name   	: 'remove_block',
            }                           
		];	
		me.setItems(items);
		
		
		     
 	}
});
