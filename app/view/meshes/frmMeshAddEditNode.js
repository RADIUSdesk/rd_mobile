Ext.define('RdMobile.view.meshes.frmMeshAddEditNode', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMeshAddEditNode',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-plus',
    title	: 'Add MESH Node',
    root 	: false,
    action	: 'edit',
    requires	: [
        'RdMobile.view.meshes.vcMeshAddEditNode',
        'RdMobile.view.components.cmbInternetConnection'
    ],
    controller  : 'vcMeshAddEditNode',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  = this; 
        
        var cmb = Ext.create('RdMobile.view.components.cmbMesh',{});
        
        var hide_multiple  = true; 
        if(me.action == 'add'){
        	hide_multiple = false;
        }
        
         var pnlWanStatic = {
            xtype   : 'container',
            itemId  : 'pnlWanStatic',
            hidden  : true,
            disabled: true,
            style   : 'background: #e0ebeb',
            padding	: 10,
            margin	: 10,
            items   : [
                {
                    xtype       : 'textfield',
                    label  		: 'IP Address',
                    name        : 'wan_static_ipaddr',
                    required	: true,
                    errorTarget : 'under'
                    //vtype       : 'IPAddress'
                },
                {
                    xtype       : 'textfield',
                    label  		: 'Netmask',
                    name        : 'wan_static_netmask',
                    required	: true,
                    errorTarget : 'under'
                    //vtype       : 'IPAddress'
                },
                {
                    xtype       : 'textfield',
                    label  		: 'Gateway',
                    name        : 'wan_static_gateway',
                    required	: true,
                    errorTarget : 'under'
                    //vtype       : 'IPAddress'
                },
                {
                    xtype       : 'textfield',
                    label  		: 'DNS Primary',
                    name        : 'wan_static_dns_1'
                    //vtype       : 'IPAddress'
                },
                {
                    xtype       : 'textfield',
                    label  		: 'DNS Secondary',
                    name        : 'wan_static_dns_2'
                    //vtype       : 'IPAddress'
                }
            ]
        };
               
        var pnlWanPppoe = {
            xtype   : 'container',
            itemId  : 'pnlWanPppoe',
            hidden  : true,
            disabled: true,
            style   : 'background: #e0ebeb',
            padding	: 10,
            margin	: 10,
            items   : [
                {
                    xtype       : 'textfield',
                    label  		: 'Username',
                    name        : 'wan_pppoe_username',
                    required	: true,
                    errorTarget : 'under'
                },
                {
                    xtype       : 'passwordfield',
                    name      	: 'wan_pppoe_password',
                    label     	: 'Password',
                    required	: true,
                    errorTarget : 'under'
                }, 
                {
                    xtype       : 'textfield',
                    label  		: 'DNS Primary',
                    name        : 'wan_pppoe_dns_1',
                    //vtype       : 'IPAddress'
                },
                {
                    xtype       : 'textfield',
                    label  		: 'DNS Secondary',
                    name        : 'wan_pppoe_dns_2',
                    //vtype       : 'IPAddress'
                },
                {
			        xtype       : 'textfield',
			        label  		: 'My Own MAC',
			        name        : 'wan_pppoe_mac'
		        },
                {
			        xtype       : 'textfield',
			        label  		: 'MTU',
			        name        : 'wan_pppoe_mtu'
		        }       
            ]
        };
        
         var pnlWifiStatic = {
            xtype   : 'container',
            itemId  : 'pnlWifiStatic',
            hidden  : true,
            disabled: true,
            style   : 'background: #e0ebeb',
            padding	: 10,
            margin	: 10,
            items   : [
                {
                    label  		: 'SSID',
                    name        : 'wifi_static_ssid',
                    maxLength   : 31,
                    required	: true,
                    errorTarget : 'under',
                    //regex       : /^[\w\-\s]+$/,
                    //regexText   : "Only words allowed",
                    //emptyText   : 'Specify a value to continue',
                    xtype       : 'textfield'
                }, 
                { 
                    xtype       : 'cmbEncryptionOptionsSimple',
                     name       : 'wifi_static_encryption',
                    listeners       : {
						    //change : 'onCmbEncryptionOptionsChangeStatic'
				    }  
                },
                {
                    label  		: 'Passphrase',
                    name        : 'wifi_static_key',
                    itemId      : 'wifi_static_key',
                    required	: true,
                    errorTarget : 'under',
                    xtype       : 'textfield',
                    minLength   : 8, //FIXME
                    hidden      : true,
                    disabled    : true
                },
                {
                    xtype       : 'radiogroup',
                    label  		: 'Radio',
                    itemId      : 'rgrpWifiStaticRadio',
                    vertical    : false,
                    items       : [
                        {
                            label 	: 'Radio0',
                            name    : 'wifi_static_device',
                            value	: 'radio0',
                            itemId  : 'wifi_static_radio_0',
                            checked : true
                        }, 
                        {
                            label  	: 'Radio1',
                            name    : 'wifi_static_device',
                            value	: 'radio1',
                            itemId  : 'wifi_static_radio_1'
                        },
                        { 
                            label  	: 'Radio2',
                            name    : 'wifi_static_device',
                            value	: 'radio2',
                            itemId  : 'wifi_static_radio_2'
                        }    
                    ]
                },
                {
                    xtype       : 'textfield',
                    label  		: 'IP_Address',
                    name        : 'wifi_static_ipaddr',
                    required	: true,
                    errorTarget : 'under',
                   //vtype       : 'IPAddress' //FIXME
                },
                {
                    xtype       : 'textfield',
                    label  		: 'Netmask',
                    name        : 'wifi_static_netmask',
                    required	: true,
                    errorTarget : 'under',
                    //vtype       : 'IPAddress' //FIXME
                },
                {
                    xtype       : 'textfield',
                    label  		: 'Gateway',
                    name        : 'wifi_static_gateway',
                    required	: true,
                    errorTarget : 'under',
                    //vtype       : 'IPAddress' //FIXME
                },
                {
                    xtype       : 'textfield',
                    label  		: 'DNS Primary',
                    name        : 'wifi_static_dns_1',
                    //vtype       : 'IPAddress' //FIXME
                },
                {
                    xtype       : 'textfield',
                    label  		: 'DNS Secondary',
                    name        : 'wifi_static_dns_2',
                    //vtype       : 'IPAddress' //FIXME
                }
            ]
        };
        
        var pnlWifiPppoe = {
            xtype   : 'container',
            itemId  : 'pnlWifiPppoe',
            hidden  : true,
            disabled: true,
            style   : 'background: #e0ebeb',
            padding	: 10,
            margin	: 10,
            items   : [
                {
                    fieldLabel  : 'SSID',
                    name        : 'wifi_pppoe_ssid',
                    maxLength   : 31,
                    required	: true,
                    errorTarget : 'under',
                    regex       : /^[\w\-\s]+$/,
                    regexText   : "Only words allowed", //FIXME
                    xtype       : 'textfield'
                }, 
                { 
                    xtype       : 'cmbEncryptionOptionsSimple',
                     name       : 'wifi_pppoe_encryption',
                    listeners       : {
						    change : 'onCmbEncryptionOptionsChangePppoe'
				    }  
                },
                {
                    label  		: 'Passphrase',
                    name        : 'wifi_pppoe_key',
                    itemId      : 'wifi_pppoe_key',                 
                    required	: true,
                    errorTarget : 'under',
                    xtype       : 'textfield',
                    minLength   : 8,//FIXME
                    hidden      : true,
                    disabled    : true
                },
                {
                    xtype       : 'radiogroup',
                    label  		: 'Radio',
                    itemId      : 'rgrpWifiPppoeRadio',
                    vertical    : false,
                    items       : [
                        {
                            label  	: 'Radio0',
                            name    : 'wifi_pppoe_device',
                            value	: 'radio0',
                            itemId 	: 'wifi_pppoe_radio_0',
                            checked	: true
                        }, 
                        {
                            label  	: 'Radio1',
                            name    : 'wifi_pppoe_device',
                            value	: 'radio1',
                            itemId  : 'wifi_pppoe_radio_1'
                        },
                        { 
                            label  	: 'Radio2',
                            name  	: 'wifi_pppoe_device',
                            value	: 'radio2',
                            itemId    : 'wifi_pppoe_radio_2'
                        }    
                    ]
                },
                {
                    xtype       : 'textfield',
                    label  		: 'Username',
                    name        : 'wifi_pppoe_username',
                   	required	: true,
                    errorTarget : 'under'
                },
                {
                    xtype       : 'passwordfield',
                    revealable	: true,
                    name      	: 'wifi_pppoe_password',
                    label     	: 'Password',
                    required	: true,
                    errorTarget : 'under'
                }, 
                {
                    xtype       : 'textfield',
                    label  		: 'DNS Primary',
                    name        : 'wifi_pppoe_dns_1'
                    //vtype       : 'IPAddress'//FIXME
                },
                {
                    xtype       : 'textfield',
                    label  		: 'DNS Secondary',
                    name        : 'wifi_pppoe_dns_2',
                    //vtype       : 'IPAddress'//FIXME
                },
                {
			        xtype       : 'textfield',
			        label  		: 'My Own MAC',
			        name        : 'wifi_pppoe_mac',
			        ////vtype       : 'MacAddress',
			        ////fieldStyle  : 'text-transform:uppercase'
		        },
                {
			        xtype       : 'textfield',
			        label  		: 'MTU',
			        name        : 'wifi_pppoe_mtu',
			        ////vtype       : 'Numeric',
		        }       
            ]
        };
        
         var cntWbW = {
            xtype   : 'container',
            itemId  : 'cntWbW',
            hidden  : true,
            disabled: true,
            padding	: 10,
            margin	: 10,
            style   : 'background: #e0ebeb',
            items   : [
                {
                    label  		: 'SSID',
                    name        : 'wbw_ssid',
                    maxLength   : 31,
                    required	: true,
                    //regex       : /^[\w\-\s]+$/,
                    //regexText   : "Only words allowed",
                    //emptyText   : 'Specify a value to continue', //FIXME Add check
                    xtype       : 'textfield',
                    errorTarget : 'under'
                }, 
                { 
                    xtype       : 'cmbEncryptionOptionsSimple',
                    listeners       : {
						   // change : 'onCmbEncryptionOptionsChangeWbw'
				    }  
                },
                {
                    label  		: 'Passphrase',
                    name        : 'wbw_key',
                    itemId      : 'wbw_key',
                    required	: true,
                    xtype       : 'textfield',
                    minLength   : 8,//FIXME Add min check
                    hidden      : true,
                    disabled    : true,
                    errorTarget: 'under'
                },
                {
                    xtype       : 'radiogroup',
                    label  		: 'Radio',
                    itemId      : 'rgrpWbWradio',
                    vertical    : false,
                    items       : [                        
                        {
                            label  		: 'Radio0',
                            name      : 'wbw_device',
                            value		: 'radio0',
                            itemId    : 'wbw_radio_0',
                            margin    : '0 15 0 0',
                            checked   : true
                        }, 
                        {
                            label  	: 'Radio1',
                            name    : 'wbw_device',
                            value	: 'radio1',
                            itemId  : 'wbw_radio_1'
                        },
                        { 
                            label  	: 'Radio2',
                            name    : 'wbw_device',
                            value	: 'radio2',
                            itemId 	: 'wbw_radio_2'
                        }    
                    ]
                }
            ]
        };
        
         var pnlQmi = {
            xtype   : 'container',
            itemId  : 'pnlQmi',
            hidden  : true,
            disabled: true,
            padding	: 10,
            margin	: 10,
            style   : 'background: #e0ebeb',
            items   : [               
                { 
                    xtype       : 'cmbQmiAuth',
                    name        : 'qmi_auth',
                    listeners       : {
						    change : 'onCmbQmiOptionsChange'
				    }  
                },       
                {
                    xtype       : 'textfield',
                    label  		: 'Username',
                    name        : 'qmi_username',
                    itemId      : 'qmi_username',
                    hidden      : true,
                    disabled    : true
                },
                {
                    xtype       : 'textfield',
                    label  		: 'Password',
                    name        : 'qmi_password',
                    itemId      : 'qmi_password',
                    hidden      : true,
                    disabled    : true
                },
                {
                    xtype       : 'textfield',
                    label  		: 'APN',
                    name        : 'qmi_apn'
                }, 
                {
                    xtype       : 'textfield',
                    label  		: 'Pincode',
                    name        : 'qmi_pincode'
                }
            ]
        };      
           	          
        var items = [
			{
                xtype       : 'checkbox',      
                label    	: 'Add Multiple',
                itemId		: 'chkMultiple',
                checked     : false,
                labelWidth  : 'auto',
                hidden		: hide_multiple
            },
			cmb,
		    {
		        xtype       : 'textfield',
		        label  		: 'Name',
		        name        : 'name',
		        required	: true,
				errorTarget: 'under'
		    },
		    {
		        xtype       : 'textfield',
		        label  		: 'Description',
		        name        : 'description'
	        },
	        {
	        	xtype       : 'cmbHardwareOptions'  
		    },
	        {
			    xtype       : 'textfield',
			    label  		: 'MAC Address',
			    name        : "mac",
			    required	: true,
				errorTarget: 'under',
				value       : me.mac
			    //vtype       : 'MacAddress',
			    //fieldStyle  : 'text-transform:uppercase',			    
		    },
		    {
                xtype       : 'cmbInternetConnection',
                itemId      : 'cmbInternetConnection',
                listeners   : {
		            change : 'onCmbInternetConnectionChange'
			    }   			                
            },
            pnlWanStatic,
            pnlWanPppoe,
            cntWbW,
            pnlWifiStatic,
            pnlWifiPppoe,
            pnlQmi,
		    {
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> RADIOS',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
		    {
                xtype       : 'pnlNodeRadioDetail',
                itemId      : 'pnlRadioR0',
                padding		: 10,
                margin		: 10,
                border		: true,
                style       : 'border: 1px solid blue;',
                radio_nr    : 0,
                hidden      : true,
                ui          : 'panel-green'
            },
            {
                xtype       : 'pnlNodeRadioDetail',
                itemId      : 'pnlRadioR1',
                padding		: 10,
                margin		: 10,
                radio_nr    : 1,
                hidden      : true,
                ui          : 'panel-green'
            },
            {
                xtype       : 'pnlNodeRadioDetail',
                itemId      : 'pnlRadioR2',
                padding		: 10,
                margin		: 10,
                radio_nr    : 2,
                hidden      : true,
                ui          : 'panel-green'
            }
		             
		];	
		me.setItems(items);        
 	}
});
