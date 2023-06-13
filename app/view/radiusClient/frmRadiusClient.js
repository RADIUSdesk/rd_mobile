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
    	'RdMobile.view.components.cmbVoucher'
    ],
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
   initialize: function () {
        const me = this;
        
        var cmb_voucher = {
				xtype	: 'cmbVoucher'
			};
        
        if(me.user_type == 'voucher'){
        	cmb_voucher = {
        		xtype 		 : 'cmbVoucher',
        		voucher_name : me.voucher_name,
        		voucher_id	 : me.voucher_id	
        	}
        }
                
        var items = [			
			{
				xtype	: 'label',
				html	: 'Request',
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}		
			},
			{
				xtype	: 'combobox',
				label	: 'User Type',
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
			{
				xtype	: 'label',
				html	: 'Reply',
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}		
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
