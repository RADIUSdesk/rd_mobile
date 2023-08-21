// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.frmWifiMacLimit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmWifiMacLimit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-tachometer-alt',
    title	: 'Apply Speed Limit',
    root 	: false,
    requires	: [
        'RdMobile.view.components.vcWifiMac',
    ],
    controller  : 'vcWifiMac',
    action		: 'limit', // can be alias, firewall, limit or block (various forms with same controller)
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
	            xtype       : 'rdSliderSpeed',
	            sliderName  : 'limit_upload',
	            label  		: "<i class='fa fa-arrow-up'></i> Up"
	        },
            {
	            xtype       : 'rdSliderSpeed',
	            sliderName  : 'limit_download',
	            Label  	: "<i class='fa fa-arrow-down'></i> Down",
	        },
            {
                xtype    : 'checkbox',      
                label    : 'Remove Limit',
                name     : 'remove_limit'
            }                           
		];	
		me.setItems(items);
		     
 	}
});
