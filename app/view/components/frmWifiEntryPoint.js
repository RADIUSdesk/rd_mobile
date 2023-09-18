// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.frmWifiEntryPoint', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmWifiEntryPoint',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 10,
    iconCls : 'x-fa fa-plus',
    title	: 'Add Entry',
    root 	: false,
    requires	: [
        'RdMobile.view.components.vcWifiEntryPoint',
        'RdMobile.view.components.cmbEncryptionOptions'
    ],
    controller  : 'vcWifiEntryPoint',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  = this; 
        
        var hide_apply_to_all = false;
        
        if(me.apProfileId){        
        	hide_apply_to_all = true;
        }
        
         
        var store_ft = Ext.create('Ext.data.Store', {
            fields: ['id', 'Name'],
            data : [
                {"id": 0, "name": 'FT Over The Air'},
                {"id": 1, "name": 'FT Over DS'}
            ]
        });
        
           	          
        var items = [
			{
				xtype	: 'label',
				html	: 'Basic Info',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
		    {
                itemId  : 'id',
                xtype   : 'textfield',
                name    : 'id',
                hidden  : true
            }, 
            {
                itemId  : 'ap_profile_id',
                xtype   : 'textfield',
                name    : "ap_profile_id",
                hidden  : true,
                value   : me.apProfileId
            },
            {
                itemId  : 'mesh_id',
                xtype   : 'textfield',
                name    : "mesh_id",
                hidden  : true,
                value   : me.meshId
            }, 
            {
                xtype       : 'textfield',
                label  		: 'SSID',
                name        : 'name',
                required	: true,
				errorTarget : 'under'
            },
            {
                xtype       : 'radiogroup',
                label  		: 'Frequency',
                columns     : 3,
                vertical    : false,
                items       : [
                    {
                        label  		: '2.4G',
                        name      	: 'frequency_band',
                        value		: 'two'
                    }, 
                    {
                        label  		: '5G',
                        name      	: 'frequency_band',
                        value		: 'five'
                    },
                    {
                        label  		: '2.4 & 5G',
                        name      	: 'frequency_band',
                        value		: 'both',
                        checked		: true
                    },
                    {
                        label  		: '5G Lower',
                        name      	: 'frequency_band',
                        value		: 'five_lower'
                    }, 
                    {
                        label  		: '5G Upper',
                        name      	: 'frequency_band',
                        value		: 'five_upper'
                    }
                ]  
            },              
            {
                xtype       : 'checkbox',      
                label  		: 'Hidden',
                name        : 'hidden',
                checked     : false,
                labelWidth  : 'auto'
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Client Isolation',
                name        : 'isolate',
                checked     : false,
                labelWidth  : 'auto'
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Apply To All Nodes',
                name        : 'apply_to_all',
                checked     : true,
                labelWidth  : 'auto',
                hidden		: hide_apply_to_all
            },
            {
				xtype		: 'label',
				html		: 'Encryption',
				margin		: 0,
				padding 	: 5,
				cls			: 'form-section'	
			},
            { 
                xtype     	: 'cmbEncryptionOptions',
                required	: true,
                errorTarget : 'under' 
            },
            {
                xtype       : 'textfield',
                label  		: 'Key',
                name        : 'special_key',
                itemId      : 'key',
                validators	: {
					type: 'method',
					fn	: function(val) {
                    	if(val.length < 8){
                    		return 'Minimum of 8 characters';
                    	}
                    	return true;
					}
				},
                required	: true,
                errorTarget : 'under',
                hidden      : true,
                disabled    : true
            }, 
            {
                xtype       : 'textfield',
                label  		: 'RADIUS server',
                name        : 'auth_server',
                itemId      : 'auth_server',
                required	: true,
                errorTarget : 'under',
                hidden      : true,
                disabled    : true
            },
            {
                xtype       : 'textfield',
                label  		: 'Shared secret',
                name        : 'auth_secret',
                itemId      : 'auth_secret',
                required	: true,
                errorTarget : 'under',
                hidden      : true,
                disabled    : true
            },
             {
                xtype       : 'checkbox',      
                label  		: 'Generate NAS ID',
                name        : 'auto_nasid',
                checked     : true,
                itemId      : 'chk_auto_nasid',
                hidden      : true,
                disabled    : true
            },
            {
                xtype       : 'textfield',
                label  		: 'NAS ID',
                name        : 'nasid',
                itemId      : 'nasid',
                required	: true,
                errorTarget : 'under',
                hidden      : true,
                disabled    : true
            }, 
            {
                xtype       : 'checkbox',      
                label  		: 'Accounting',
                name        : 'accounting',
                checked     : true,
                itemId      : 'chk_accounting',
                hidden      : true,
                disabled    : true
            },
            {
                xtype       : 'numberfield',
                name        : 'default_vlan',
                itemId      : 'default_vlan',
                label  		: 'Default VLAN',
                value       : 0,
                maxValue    : 4094,
                minValue    : 0,
                required	: true,
				errorTarget : 'under',
                hidden      : true,
                disabled    : true,
            },
            {
                xtype       : 'textfield',
                label  		: 'Default Key',
                name        : 'default_key',
                itemId      : 'default_key',
                validators	: {
					type: 'method',
					fn	: function(val) {
                    	if(val.length < 8){
                    		return 'Minimum of 8 characters';
                    	}
                    	return true;
					}
				},
                required	: true,
				errorTarget : 'under',
                hidden      : true,
                disabled    : true
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Hotspot 2.0',
                name        : 'hotspot2_enable',
                checked     : false,
                itemId      : 'chkHotspot2',
                labelWidth  : 'auto',
                hidden      : true,
                disabled    : true
            },
            {
		        xtype       : 'checkbox',      
		        label    	: '802.11r Fast Transition',
		        name        : 'ieee802r',
		        itemId		: 'chkFastRoaming',
		        labelWidth  : 'auto',
		        hidden		: true,
		        disabled	: true
		    },
		    {	
		    	xtype		: 'container',
		    	style  		: 'background: #e0ebeb',
		    	hidden		: true,
		    	disabled	: true,
		    	itemId		: 'pnlFastRoaming',
		    	items		: [
		    		{
						xtype       : 'combobox',
						label  		: 'FT Protocol',
						store       : store_ft,
						queryMode   : 'local',
						name        : 'ft_over_ds',
						displayField: 'name',
						valueField  : 'id',
						value       : 0//Default
					},
					{
                        xtype       : 'textfield',
                        label  		: 'Mobility Domain',
                        name        : 'mobility_domain',
                        itemId      : 'txtMobilityDomain',
                        maxLength   : 4,
                        errorTarget : 'under',
                        validators	: {
							type: 'method',
							fn	: function(val) {
								if(val == ''){
		                    		return true; //allow empty
		                    	}
		                    	if(val.length < 4){
		                    		return '4-character hexadecimal ID Please';
		                    	}
		                    	if((/^([a-fA-F0-9]){4}$/).test(val)){
		                    		return true;
								}else{
									return '4-character hexadecimal ID Please';
								}
							}
						}
                    },
					{
                        xtype       : 'checkbox',      
                        label    	: 'Generate NAS ID',
                        name        : 'ft_auto_nasid',
                        value		: 'true',
                        checked     : true,
                        itemId      : 'chkFtNasid',
                        labelWidth  : 'auto'
                    },
                    {
                        xtype       : 'textfield',
                        fieldLabel  : 'NAS ID',
                        name        : 'ft_nasid',
                        itemId      : 'txtFtNasid',
                        required  	: true,                        
                        hidden		: true,
                        disabled	: true
                    },									
                    {
						xtype       : 'checkbox',      
						label    	: 'Generate PMK Locally',
						name        : 'ft_pskgenerate_local',
						checked		: true,
						labelWidth  : 'auto'
					}
				]
			}						      
		];	
		me.setItems(items);        
 	}
});
