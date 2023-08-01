Ext.define('RdMobile.view.components.frmWifiExitPoint', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmWifiExitPoint',
    requires	: [
        'RdMobile.view.components.vcWifiExitPoint'
    ],
    controller  : 'vcWifiExitPoint',
    action		: 'edit',
    exit_type	: 'bridge',
    initialize: function () {
        const me  = this;  
       
       //== Buttons ==      
       	if(me.action == 'edit'){
       		var buttons = [		
				{ ui: 'confirm', text: 'OK', iconCls: 'x-fa fa-check', handler: 'onSubmit' } 	
			]
			me.setButtons(buttons);       	
       	}
        
        if(me.action == 'add'){      
        	var buttons = [   
				{ ui: 'confirm',  text: 'Back', iconCls: 'x-fa fa-arrow-left', 	handler: 'onBack'  },
				{
                    xtype: 'spacer'
                }, 
				{ ui: 'confirm', text: 'Save', iconCls: 'x-fa fa-check', 		handler: 'onSubmit' } 
			];
			me.setButtons(buttons);   
        }
        //== END Buttons ==
      	var items = [];
      	
      	//Connects with is used with every option
      	if(me.mode == 'mesh'){
	  		var cmbConnectWith = Ext.create('RdMobile.view.meshes.cmbMeshEntryPoints',{
			});
			cmbConnectWith.getStore().getProxy().setExtraParam('mesh_id',me.meshId);
			if(me.exit_id){
				cmbConnectWith.getStore().getProxy().setExtraParam('exit_id',me.exit_id);
			}
	    	cmbConnectWith.getStore().load();
	    }
	    
	    
	    var items = [
	    	{
				xtype		: 'label',
				html		: 'Common Settings',
				margin		: 0,
				padding 	: 5,
				cls			: 'form-section'	
			},
	    	{
                itemId  	: 'id',
                xtype   	: 'textfield',
                name    	: 'id',
                hidden  	: true
            }, 
            {
                itemId  	: 'ap_profile_id',
                xtype   	: 'textfield',
                name    	: "ap_profile_id",
                hidden  	: true,
                value   	: me.apProfileId
            },
            {
                itemId  	: 'mesh_id',
                xtype   	: 'textfield',
                name    	: "mesh_id",
                hidden  	: true,
                value   	: me.meshId
            }, 
            {
                itemId  	: 'type',
                xtype   	: 'textfield',
                name    	: 'type',
                value		: me.exit_type,
                hidden  	: true
            }, 
  			{
                xtype       : 'checkbox',      
                label  		: 'Auto Detect',
                name        : 'auto_detect',
                checked     : true,
                labelWidth  : 'auto' 
            },
            cmbConnectWith,
            {
                itemId      : 'chkApplyFirewallProfile',
                xtype       : 'checkbox',      
                label  		: 'Apply Firewall Profile',
                name        : 'apply_firewall_profile',
                listeners   : {
		            change  : 'onChkApplyFirewallProfileChange'
		        },
		        labelWidth  : 'auto'
            },                              
            {
            	xtype		: 'cmbFirewallProfile',
            	fieldLabel	: 'Firewall Profile',
            	include_all_option : false,
            	disabled	: true                         	
            }       		
  		]; 
  		     
      	if(me.exit_type == 'bridge'){   	//Bridge is the basic one 
      		me.setItems(items);	
      	}
      	
      	if(me.exit_type == 'nat'){   	//Bridge is the basic one 
      	
      		var nat_items = [
      			{
					xtype		: 'label',
					html		: 'NAT+DHCP Specific',
					margin		: 0,
					padding 	: 5,
					cls			: 'form-section'	
				},
				{
					xtype		: 'radiogroup',
					vertical	: false,
					items		: [
						{ label: 'Automatic', name: 'nat_config', value: 'auto', checked: true,labelWidth  : 170 },
						{ label: 'Specific',  name: 'nat_config', value: 'manual',labelWidth  : 'auto'}
					],
					listeners   : {
				        change  : 'onRgrpNatDhpcConfigChange'
				    }
				},
				{
                xtype       : 'panel',
                bodyStyle   : 'background: #e0ebeb',
                hidden      : true,
                itemId      : 'pnlNatDhcpDetail',
                padding		: 10,
                disabled    : true,
                items       : [
					{
		                itemId      : 'txtIpaddr',
		                xtype       : 'textfield',
		                label  		: 'IP Address',
		                name        : 'nat_ipaddr',
		                required	: true,
						errorTarget : 'under',                  
		                //vtype       : 'IPAddress',
		                value       : '10.222.100.1'
		            },
		            {
		                itemId      : 'txtNetmask',
		                xtype       : 'textfield',
		                label  		: 'Netmask',
		                name        : 'nat_netmask',
		               	required	: true,
						errorTarget : 'under',
		                //vtype       : 'IPAddress',
		                value       : '255.255.255.0'
		            },
		            {
		                xtype       : 'checkbox',
		                label  		: 'Disable',
		                name        : 'nat_ignore',
		                labelWidth  : 'auto',
		                listeners   : {
		                    change  : 'onChkNatIgnoreChange'
		                }
		            },
		            {
		                xtype       : 'numberfield',
		                itemId      : 'nmbrStart',
		                name        : 'nat_pool_start',
		                label  		: 'Start Of Pool',
		                value       : 100,
		                maxValue    : 253,
		                minValue    : 1,
		                required	: true,
						errorTarget : 'under'
		            },
		            {
		                xtype       : 'numberfield',
		                itemId      : 'nmbrEnd',
		                name        : 'nat_pool_limit',
		                label  		: 'End Of Pool',
		                value       : 200,
		                maxValue    : 254,
		                minValue    : 2,
		                required	: true,
						errorTarget : 'under'
		            },
		            {
		                xtype       : 'numberfield',
		                itemId      : 'nmbrLease',
		                name        : 'nat_leasetime',
		                label  		: 'Lease Time (Hours)',
		                value       : 12,
		                maxValue    : 100,
		                minValue    : 1,
		                required	: true,
						errorTarget : 'under'
		            },
		            {
		                itemId      : 'txtDns1',
		                xtype       : 'textfield',
		                itemId      : 'txtNatDns1',
		                label  		: 'DNS Primary',
		                name        : 'nat_dns_1',
		                required	: false,
						errorTarget : 'under',
						value		: ''
		                //vtype       : 'IPAddress'
		            },
		            {
		                itemId      : 'txtDns2',
		                xtype       : 'textfield',
		                itemId      : 'txtNatDns2',
		                label  		: 'DNS Secondary',
		                name        : 'nat_dns_2',
		                required	: false,
						errorTarget : 'under',
						value		: ''
		                //vtype       : 'IPAddress'
		            }
		     	]}	
      		]
      		
      		items = Ext.Array.merge(items,nat_items);	
      		me.setItems(items);	
      	}
      	
      	if(me.exit_type == 'captive_portal'){  
      	
      		var cp_items = [
      			{
					xtype		: 'label',
					html		: 'Captive Portal - Basic',
					margin		: 0,
					padding 	: 5,
					cls			: 'form-section'	
				},
				{
		            xtype       : 'textfield',
		            label  		: 'RADIUS Server1',
		            name        : 'radius_1',
		            required	: true,
					errorTarget : 'under'
		        },
		        {
		            xtype       : 'textfield',
		            label  		: 'RADIUS Server2',
		            name        : 'radius_2',
		            required	: false,
					errorTarget : 'under'
		        },
		        {
		            xtype       : 'textfield',
		            label  		: 'RADIUS Secret',
		            name        : 'radius_secret',
		           	required	: true,
					errorTarget : 'under'
		        },
		        {
		            xtype       : 'textfield',
		            label  		: 'UAM URL',
		            name        : 'uam_url',
		            required	: true,
					errorTarget : 'under'
		        },
		        {
		            xtype       : 'textfield',
		            label  		: 'UAM Secret',
		            name        : 'uam_secret',
		           	required	: false,
					errorTarget : 'under'
		        },
		        {
		            xtype       : 'textareafield',
		            grow        : true,
		            label  		: 'Walled Garden',
		            name        : 'walled_garden',
					value		: ''
		         },
		         {
		            xtype       : 'checkbox',      
		            label    	: 'Swap Octets',
		            name        : 'swap_octets',
		            checked     : true,
		            labelWidth  : 'auto'
		        },
		        {
		            xtype       : 'checkbox',      
		            label  		: 'MAC Authentication',
		            name        : 'mac_auth',
		            checked     : true,
		            labelWidth  : 'auto'
		        },				
				{
					xtype		: 'label',
					html		: 'Captive Portal - DNS',
					margin		: 0,
					padding 	: 5,
					cls			: 'form-section'	
				},
				{
		            itemId      : 'chkDnsOverride',
		            xtype       : 'checkbox',      
		            label  		: 'Enable Override',
		            name        : 'dns_manual',
		            labelWidth  : 'auto',
		            checked     : false,
		            listeners   : {
				        change  : 'onChkDnsOverrideChange'
				    }
		        },
		        {
		            itemId      : 'txtDns1',
		            xtype       : 'textfield',
		            label  		: 'DNS-1',
		            name        : 'dns1',
					required	: true,
					errorTarget : 'under',
		            disabled    : true
		        },
		        {
		            itemId      : 'txtDns2',
		            xtype       : 'textfield',
		            label  		: 'DNS-2',
		            name        : 'dns2',
		            required	: true,
					errorTarget : 'under',
		            disabled    : true
		        },
		        {
		            itemId      : 'chkAnyDns',
		            xtype       : 'checkbox',      
		            label  		: 'Allow Any DNS',
		            name        : 'uamanydns',
		            labelWidth  : 'auto',
		            checked     : true
		        },
		        {
		            xtype       : 'checkbox',      
		            label    	: 'DNS Paranoia',
		            name        : 'dnsparanoia',
		            labelWidth  : 'auto',
		            checked     : false
		        },		
      			{
					xtype		: 'label',
					html		: 'Captive Portal - Coova Specific',
					margin		: 0,
					padding 	: 5,
					cls			: 'form-section'	
				},
				{
                    xtype       : 'textareafield',
                    grow        : true,
                    label  		: 'Optional config items',
                    name        : 'coova_optional'
                 }    		    		
      		];
      		
      		if(me.action == 'add'){
      		
      			var cp_add = [
      				{
                        itemId      : 'chkNasClient',
                        xtype       : 'checkbox',      
                        label  		: 'Add Dynamic RADIUS Client',
                        name        : 'auto_dynamic_client',
                        checked     : true,
                        labelWidth  : 'auto'
                    },
                    {
                    	itemId      : 'cmbRealm',
						xtype		: 'cmbRealm',
						multiSelect	: true,
						name		: 'realm_ids',
						required	: true,	//FIXME There seems to be a bug where it will not select if set to false / set to true for now				
						errorTarget	: 'under'			
					},
                    {
                        itemId      : 'chkLoginPage',
                        xtype       : 'checkbox',      
                        label  		: 'Add Login Page',
                        name        : 'auto_login_page',
                        checked     : true,
                        labelWidth  : 'auto'
                    },
                    {
                        itemId      : 'cmbDynamicDetail',
                        xtype       : 'cmbDynamicDetail',
                        required	: true,		
						errorTarget	: 'under'			
                    }  			
      			];
      		
      			items = Ext.Array.merge(items,cp_add);      		
      		}   		
      	     	
      		items = Ext.Array.merge(items,cp_items);
      		me.setItems(items);
      	}
             
        this.callParent(arguments);  
 	}
 	
});
