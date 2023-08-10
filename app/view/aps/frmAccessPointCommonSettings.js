// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.frmAccessPointCommonSettings', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmAccessPointCommonSettings',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-pencil-alt',
    title	: 'Edit Common Settings',
    root 	: false,
    requires	: [
        'RdMobile.view.aps.vcAccessPointCommonSettings',
    ],
    controller  : 'vcAccessPointCommonSettings',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadApCommonSettings' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me  = this;
        
     	var store_proto = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data : [
                {"id":"http", "name":"HTTP"},
                {"id":"https", "name":"HTTPS"}
            ]
        });
            	          
        var items = [
			{
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> System',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
				xtype       : 'textfield',
				hidden		: true,
				name		: 'id'	
			},
			{
				xtype       : 'textfield',
				hidden		: true,
				name		: 'ap_profile_id',
				value		: me.apProfileId 
			},
		   	{
                xtype		: 'passwordfield',
                label		: 'Password',
                name		: 'password',
                revealable	: true,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'cmbCountries'
            },
            {
                xtype       : 'cmbTimezones'
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Apply Schedule',
                name        : 'enable_schedules',
                checked     : false,
                labelWidth  : 'auto',
                listeners   : {
                    change  : 'chkEnableSchedulesChange'
                }
                
            },
			{
				xtype       : 'cmbSchedule',
				required	: true,		
				errorTarget	: 'under',
				disabled	: true
			},
			{
				xtype	: 'label',
				html	: '<i class="fas fa-heartbeat "></i> Monitor (Values In Seconds)',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			}, 
			{
                xtype       : 'combobox',
                label  		: 'Protocol',
                store       : store_proto,
                queryMode   : 'local',
                name        : 'report_adv_proto',
                displayField: 'name',
                valueField  : 'id',
                value       : 'http',
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'numberfield',
                name        : 'report_adv_light',
                label  		: 'Light Report Interval',
                value       : 60,
                maxValue    : 21600,
                minValue    : 60,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'numberfield',
                name        : 'report_adv_full',
                label  		: 'Full Report Interval',
                value       : 600,
                maxValue    : 21600,
                minValue    : 300,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'numberfield',
                name        : 'report_adv_sampling',
                label  		: 'Data Sampling Interval',
                value       : 60,
                maxValue    : 21600,
                minValue    : 60,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'numberfield',
                name        : 'heartbeat_dead_after',
                label  		: 'Heartbeat Is Dead After',
                value       : 600,
                maxValue    : 21600,
                minValue    : 300,
                required	: true,		
				errorTarget	: 'under'
            },
			{
				xtype	: 'label',
				html	: '<i class="fas fa-stroopwafel"></i> Gateway',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
                xtype       : 'numberfield',
                name        : 'gw_dhcp_timeout',
                label  		: 'Wait time for DHCP IP',
                value       : 60,
                maxValue    : 600,
                minValue    : 30,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Use previous settings when DHCP fails',
                name        : 'gw_use_previous',
                checked     : true,
                labelWidth  : 'auto'
            },  
			{
				xtype	: 'label',
				html	: '<i class="fas fa-arrows-alt-h"></i> Dynamic VLANs (Needs RADIUS)',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
                xtype       : 'checkbox',      
                label  		: 'Enable',
                name        : 'vlan_enable',
                checked     : false,
                listeners   : {
	                change  : 'OnChkVlanEnableChange'
                }
            },
            {
                xtype       : 'radiogroup',
                itemId      : 'rgrpVlanRangeOrList',
                label  		: 'VLANs Used',
                disabled    : true,
                vertical    : false,
                items       : [
                    {
                        label  	: 'Range',
                        itemId	: 'rdRange',
                        name    : 'vlan_range_or_list',
                        value	: 'range',
                        checked : true,
                        disabled    : true,
                        labelWidth  : '170'
                    }, 
                    {
                        label  	: 'List',
                        itemId	: 'rdList',
                        name  	: 'vlan_range_or_list',
                        value	: 'list',
                        disabled    : true,
                        labelWidth  : 'auto'
                    }
                ],
                listeners   : {
			        change  : 'rgrpVlanChange'
		        }
            },
            {
                xtype       : 'numberfield',
                name        : 'vlan_start',
                itemId      : 'vlan_start',
                label  		: 'VLAN Start',
                disabled    : true,
                value       : 100,
                maxValue    : 4094,
                minValue    : 1,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'numberfield',
                name        : 'vlan_end',
                itemId      : 'vlan_end',
                disabled    : true,
                label  		: 'VLAN End',
                value       : 101,
                maxValue    : 4094,
                minValue    : 2,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'textfield',
                label  		: 'VLAN List',
                name        : "vlan_list",
                itemId      : 'vlan_list',
                disabled    : true,
                hidden      : true,
                required	: true,		
				errorTarget	: 'under'
            }			  
		];	
		me.setItems(items);        
 	}
});
