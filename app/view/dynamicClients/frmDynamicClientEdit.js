// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.dynamicClients.frmDynamicClientEdit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmDynamicClientEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-pencil-alt',
    root 	: false,
    requires	: [
        'RdMobile.view.dynamicClients.vcDynamicClientEdit',
    ],
    controller  : 'vcDynamicClientEdit',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadDynamicClient' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me  = this;
        
        me.setTitle(me.dynamic_client_name);
        
     	var store_proto = Ext.create('Ext.data.Store', {
            fields: ['id', 'Name'],
            data : [
                {"id":"http", "name":"HTTP"},
                {"id":"https", "name":"HTTPS"}
            ]
        });
        
        var cntMikrotik = {
            xtype   : 'panel',
            itemId  : 'cntMikrotik',
            padding	: 10,
            hidden  : false,
            disabled: true,
            style   : {'background' : '#e0ebeb'},
            items   : [
                {
                    xtype       : 'combobox',
                    label  		: 'Protocol',
                    store       : store_proto,
                    queryMode   : 'local',
                    name        : 'mt_proto',
                    display		: 'name',
                    value  		: 'id',
                    value       : 'http'
                },
                {
                    xtype       : 'textfield',
                    label  		: 'IP Address',
                    itemId		: 'mt_host',
                    name        : 'mt_host',
                    value		: '',
                    required		: true,
				    errorTip		: {
						anchor: true,
						align: 'l-r?'
					},
					errorTarget: 'under'
                },
                {
                    xtype   	: 'numberfield',
                    label      	: 'Port',
                    name        : 'mt_port',
                    value       : 8728,
                    required	: true,
				    errorTip		: {
						anchor: true,
						align: 'l-r?'
					},
					errorTarget: 'under'
                },
                {
                    xtype       : 'textfield',
                    label      	: 'Username',
                    itemId      : 'mt_user',
                    name        : 'mt_user',
                    value		: '',
                    required	: true,
				    errorTip	: {
						anchor: true,
						align: 'l-r?'
					},
					errorTarget: 'under'
                },
                {
                    xtype		: 'passwordfield',
                    label		: 'Password',
                    name		: 'mt_pass',
                    itemId		: 'mt_pass',
                    value		: '',
                    required	: true,
				    errorTip	: {
						anchor: true,
						align: 'l-r?'
					},
					errorTarget: 'under'
                },
                {
                    xtype       : 'button',
                    text        : 'Test API Connection',
                    itemId      : 'btnMikrotikTest',
                    scale       : 'medium',
                    ui			: 'action',
                    width		: '100%',
                    listeners   : {
                       // click     : 'onMikrotikTestClick'
                    }    
                },
                {
                    xtype   : 'container',
                    itemId  : 'pnlMtReply',
                    hidden  : true,
                    tpl     : new Ext.XTemplate(
                        '<div style="padding:10px;">',
                            '<h4>API Connection Is Good</h4>', 
                             '<dl>',
                                '<tpl foreach=".">',
                                    '<dt style="color:#c1c1c1">{$}</dt>', // the special **`{$}`** variable contains the property name
                                    '<dd style="color:#014a8a; font-size:14px;">{.}</dd>', // within the loop, the **`{.}`** variable is set to the property value
                                '</tpl>',
                            '</dl>',
                        '</div>'
                    ),
                    bodyStyle   : 'background: #ebffed',
                    data    : {}
                }         
            ]
        };
        
        var cntPrivatePsk = {
            xtype   : 'panel',
            itemId  : 'cntPrivatePsk',
            padding	: '0 10 0 10',
            hidden  : true,
            disabled: true,
            style   : { background : '#e0ebeb'},
            items   : [
                {
                    xtype       	: 'textfield',
                    label  			: 'Default Key',
                    name        	: 'ppsk_default_key',
                    itemId      	: 'default_key',
                    minLength   	: 8, //FIXME TEST FOR MIN AMOUNT OF CHARS
                    required		: true,
				    errorTip		: {
						anchor: true,
						align: 'l-r?'
					},
					errorTarget: 'under'
		       	},
                {
                    xtype           : 'numberfield',
                    label      		: 'Default VLAN',
                    name            : 'ppsk_default_vlan',
                    value       	: 0,
                    maxValue    	: 4094,
                    minValue    	: 0,
                    required		: true,
				    errorTip		: {
						anchor: true,
						align: 'l-r?'
					},
					errorTarget: 'under'
                },
                {
                    xtype       	: 'checkbox',      
                    label  			: 'Log Client MAC',
                    name        	: 'ppsk_record_mac',
                    checked     	: false
                }                  
            ]
        };
              
        var items = [
        	{
		        xtype   : 'textfield',
		        name    : 'id',
		        hidden  : true,
		        value	: me.dynamic_client_id
		    },
			{
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> General',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
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
                xtype       : 'textfield',
                label  	    : 'NAS-Identifier',
                name        : "nasidentifier",
                value		: ''
            },
            {
                xtype       : 'textfield',
                label  		: 'Called-Station-Id',
                name        : "calledstationid",
                value		: ''
            },
            {
                xtype       : 'cmbNasTypes',
                listeners   : {
	                change : 'onCmbNasTypesChange'
		        } 
            },
            cntMikrotik,
            cntPrivatePsk,
            {
				xtype	: 'label',
				html	: '<i class="fas fa-map-marker"></i> Maps',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
                xtype       : 'numberfield',
                name        : 'lon',  
                label  		: 'Longitude',
                value       : 0,
                maxValue    : 180,
                minValue    : -180,
                decimalPrecision: 14
            },
            {
                xtype       : 'numberfield',
                name        : 'lat',  
                label  		: 'Latitude',
                value       : 0,
                maxValue    : 90,
                minValue    : -90,
                decimalPrecision: 14
            },
            {
                xtype       : 'checkbox',      
                label    	: 'Dispaly_on_public_maps',
                name        : 'on_public_maps',
                checked     : false,
                labelWidth  : 'auto'
            },
            {
				xtype	: 'label',
				html	: '<i class="fas fa-star"></i> Enhancements',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
                xtype       : 'checkbox',      
                label    	: 'Active',
                name        : 'active',
                itemId      : 'active',
                checked     : true
            },
            {
                xtype       : 'checkbox',      
                label    	: 'Auto close stale sessions',
                name        : 'session_auto_close',
                itemId      : 'chkSessionAutoClose',
                checked     : true,
                labelWidth  : 'auto'
            },
            {
                xtype       : 'numberfield',
                itemId      : 'nrSessionDeadTime',
                name        : 'session_dead_time',
                label  		: 'Auto close activation time',
                value       : 300,
                maxValue    : 21600,
                minValue    : 300
            },
            {
                xtype       : 'cmbTimezones',
                required    : false,
                value       : 24,
                required	: true,
			    errorTip	: {
					anchor: true,
					align: 'l-r?'
				},
				errorTarget: 'under'
            }
		];	
		me.setItems(items);        
 	}
});
