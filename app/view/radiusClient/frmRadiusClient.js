Ext.define('RdMobile.view.radiusClient.frmRadiusClient', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmRadiusClient',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    title	: 'Test RADIUS',
    controller  : 'vcRadiusClient',
    standardSubmit : false,
    requires	: [
    	'RdMobile.view.radiusClient.vcRadiusClient',
    	'RdMobile.view.components.cmbVoucher',
    	'RdMobile.view.components.cmbPermanentUser'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
   initialize: function () {
        const me = this;
        
        var cmb_voucher = {
			xtype	: 'cmbVoucher',
			hidden	: true,
			disabled: true
		};
			
		var cmb_user = {
			xtype	: 'cmbPermanentUser',
			hidden	: true,
			disabled: true
		};
			
		var cmb_device = {
			xtype	: 'cmbDevice',
			hidden	: true,
			disabled: true
		};
        
        if(me.user_type == 'voucher'){
        	cmb_voucher = {
        		xtype 		 : 'cmbVoucher',
        		voucher_name : me.voucher_name,
        		voucher_id	 : me.voucher_id	
        	}
        }
        
       	if(me.user_type == 'permanent'){
        	cmb_user = {
        		xtype 		: 'cmbPermanentUser',
        		user_name 	: me.user_name,
        		user_id	 	: me.user_id	
        	}
        }
        
        if(me.user_type == 'device'){
        	cmb_device = {
        		xtype 		: 'cmbDevice',
        		device_name : me.device_name,
        		device_id	: me.device_id	
        	}
        }
                
        var items = [			
			{
				xtype	: 'label',
				html	: 'Request',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'		
			},
			{
				xtype	: 'combobox',
				label	: 'User Type',
				itemId	: 'cmbUserType',
				queryMode: 'local',
				displayField: 'name',
				valueField: 'id',
				value	: me.user_type,
				name	: 'user_type',
				store   : [
					{"id":"voucher",      "name": 'Voucher'},
                	{"id":"permanent",    "name": 'Permanent user'},
                	{"id":"device",       "name": 'Device'}
				]
			},
			cmb_voucher,
			cmb_user,
			cmb_device,
			{
				xtype	: 'label',
				html	: 'Reply',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'		
			},
			{
    			xtype	: 'container',
    			itemId	: 'cntReply',
    			tpl		: new Ext.XTemplate(
					'<div class=\'blue_round\'>',
					'<h3>Request Attributes</h3>',
						'<ul>',   
						    '<tpl for="send">',
						        '<li>{.}</li>',
						    '</tpl>',
						'</ul>',
					'</div>',
					"<tpl if='failed'>",
						"<div class=\'red_round\'>",
					'<tpl else>',
						'<div class=\'green_round\'>',
					'</tpl>',
					'<h3> Reply Attributes </h3>',
						'<ul>',   
						    '<tpl for="received">',
						        '<li>{.}</li>',
						    '</tpl>',
						'</ul>',
					 '</div>'
					)
			}
		];		
		me.setItems(items);        
 	}   
});
