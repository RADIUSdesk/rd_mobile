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
				{ ui: 'decline',  text: 'Back', iconCls: 'x-fa fa-arrow-left', 	handler: 'onBack'  },
				{
                    xtype: 'spacer'
                }, 
				{ ui: 'confirm', text: 'Save', iconCls: 'x-fa fa-check', 		handler: 'onSubmit' } 
			];
			me.setButtons(buttons);   
        }
        //== END Buttons ==
      	var items = [];
      
      	if(me.exit_type == 'bridge'){
      	
      		if(me.mode == 'mesh'){
		  		var cmbConnectWith = Ext.create('RdMobile.view.meshes.cmbMeshEntryPoints',{
				});
				cmbConnectWith.getStore().getProxy().setExtraParam('mesh_id',me.meshId);
				if(me.exit_id){
					cmbConnectWith.getStore().getProxy().setExtraParam('exit_id',me.exit_id);
				}
		    	cmbConnectWith.getStore().load();
		    }
      	
      		items = [
      			{
                    itemId  	: 'mesh_id',
                    xtype   	: 'textfield',
                    name    	: "mesh_id",
                    hidden  	: true,
                    value   	: me.meshId
                },
                {
                    xtype   	: 'textfield',
                    name    	: 'id',
                    hidden  	: true
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
      		]    	
      	}
        
        me.setItems(items);
      
        this.callParent(arguments);  
 	}
});
