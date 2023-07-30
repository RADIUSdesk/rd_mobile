Ext.define('RdMobile.view.components.frmWifiExitPoint', {
    extend  : 'Ext.Panel',
    xtype   : 'frmWifiExitPoint',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    title	: 'Add Exit',
    layout: {
		type        : 'card',
		pack        : 'start',
		align       : 'stretch',
		animation   : 'slide',
		deferredRender: true
	},
    startScreen: 0, //Default start screen
    requires	: [
        'RdMobile.view.components.vcWifiExitPoint'
    ],
    controller  : 'vcWifiExitPoint',
    initialize: function () {
        const me  = this; 
        
        var scrnType  = me.mkScrnType();
        var scrnData  = me.mkScrnData();
        me.setItems([
            scrnType,
            scrnData
        ]);  
        this.callParent(arguments);
        me.setActiveItem(me.startScreen);   
 	},
 	    //____ AccessProviders tree SCREEN ____
    mkScrnType: function(){

        var me   = this;            
        var scrnType = Ext.create('Ext.form.Panel',{
        	itemId 	: 'scrnType',
			buttons	: {
			   ok: {
					text: 'Next',
					handler: 'onNext'
				}
			},
        	items	:[{
				xtype	: 'radiogroup',
				label	: 'Exit Point Type',
				itemId	: 'rgrpExitType',
				vertical: true,
				items: [
				    { 
				    	label	: '<i class="fa fa-bars"></i> Ethernet Bridge', 
				    	name	: 'exit_type', 
				    	value	: 'bridge',
				    	labelWidth  : 'auto' 
				    },
				    { 
				    	label	: '<i class="fa fa-tag"></i> Layer2 Tagged Ethernet Bridge',
				    	name	: 'exit_type', 
				    	value	: 'tagged_bridge',
				    	labelWidth  : 'auto' 
				    },
				    { 
				    	label	: '<i class="fa fa-tag"></i> Layer3 Tagged Ethernet Bridge', 
				    	name	: 'exit_type', 
				    	value	: 'tagged_bridge_l3',
				    	labelWidth  : 'auto' 
				    },
				    { 
				    	label	: '<i class="fa fa-arrows-alt"></i> NAT + DHCP',
				    	name	: 'exit_type', 
				    	value	: 'nat',
				    	labelWidth  : 'auto' 
				    },
				    { 
				    	label	: '<i class="fa fa-key"></i> Captive Portal',
				    	name	: 'exit_type', 
				    	value	: 'captive_portal',
				    	labelWidth  : 'auto' 
				    },
				    { 
				    	label	: '<i class="fa fa-quote-right"></i> OpenVPN Bridge',
				    	name	: 'exit_type', 
				    	value	: 'openvpn_bridge',
				    	labelWidth  : 'auto' 
				    }
				]
			}]    
        });
        return scrnType;       
    },
    mkScrnData : function(){
        var me   = this;    
        
        var common = [   
    		{
				xtype	: 'label',
				html	: 'Common Settings',
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
            }  
    	];
                
        var scrnData = Ext.create('Ext.form.Panel',{
        	itemId	: 'scrnData',
        	buttons : {
        		
				yes: {
				    handler: 'onSubmit',
				    text: 'OK'
				},
				submit	  : {
        			text: 'Back',
        			handler: 'onBack'
        		}
			}     
        });
        return scrnData;
    }
});
