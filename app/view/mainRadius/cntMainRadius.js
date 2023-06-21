Ext.define('RdMobile.view.mainRadius.cntMainRadius', {
    extend      : 'Ext.Container',
    xtype       : 'cntMainRadius',
    controller  : 'vcMainRadius',
    requires	: [
        'RdMobile.view.mainRadius.vcMainRadius',
        'RdMobile.view.mainRadius.gridMainRadiusUsers',
        'RdMobile.view.mainRadius.gridMainRadiusComponents'
    ],
    layout: {
		type        : 'card',
		pack        : 'start',
		align       : 'stretch',
		animation   : 'slide',
		deferredRender: true
	},
    items: [
        {
        	xtype	: 'container',
        	items	: [
        		{
					xtype	: 'label',
					html	: 'RADIUS Users',
					margin	: 5,
					padding : 5,
					style	: {
		   				'font-size' 	: '1.5em',
		   				'border-bottom' : '5px solid #667078',
		   				'color'			: '#027534'
					}			
				},
        		{
        			xtype	: 'gridMainRadiusUsers',
        			height	: 200	
        		},
        		{
					xtype	: 'label',
					html	: 'RADIUS Components',
					margin	: 5,
					padding : 5,
					style	: {
		   				'font-size' 	: '1.5em',
		   				'border-bottom' : '5px solid #667078',
		   				'color'			: '#027534'
					}			
				},
				{
        			xtype	: 'gridMainRadiusComponents',
        			height	: 200
        		}
        	]
        }, 
        //-- Permanent Users --(1)    
        {
            xtype	: 'cntPermanentUsers',
            layout	: 'fit'
         },
         //-- Vouchers --(2)
         {
            xtype	: 'cntVouchers',
        	layout	: 'fit'
        },
        //-- BYOD --(3)
        {
            xtype	: 'cntDevices',
        	layout	: 'fit'
        },
        //-- Activity Viewer --(4)
        {
        	layout	: 'fit',
        	html	: 'Activity Viewer'
        },
        //-- RADIUS Clients --(5)
        {
        	layout	: 'fit',
        	html	: 'RADIUS Clients'
        },
        //-- NAS --(6)
        {
        	layout	: 'fit',
        	html	: 'NAS'
        },
        //-- Profiles --(7)
        {
        	xtype	: 'cntProfiles',
        	layout	: 'fit'
        }
    ]
});
