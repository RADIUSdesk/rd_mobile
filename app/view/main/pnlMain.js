Ext.define('RdMobile.view.main.pnlMain', {
    extend      : 'Ext.Panel',
    xtype       : 'pnlMain',
    fullscreen  : true,
    layout      : 'vbox',
    controller  : 'vcMain',
    requires	: [
        'RdMobile.view.mainRadius.cntMainRadius',
        'RdMobile.view.mainNetworks.cntMainNetworks',
        'RdMobile.view.components.cmbCloud',
        'Ext.tab.Panel'
    ],
    items       : [
        {
		    xtype 	: 'toolbar',
		    docked	: 'top',
		    items	: [
		    	{
				    xtype: 'image',
				    src: 'resources/images/logo.png',
				    height: 32,
    				width: 32
				},
				{
                    xtype: 'spacer'
                },			    
			    {
					xtype	: 'label',
					itemId	: 'lblMain',
					html	: 'RADIUSdesk',
					style	: {
		   				'color'			: '#005691',
		   				'letter-spacing': '4px'
					}	
				},
				{
                    xtype: 'spacer'
                },
				{ 
					ui		: 'normal',
					itemId	: 'btnMenu', 
					iconCls	: 'x-fa fa-align-justify' 
				},
		    ]
	    },
        {
            xtype           : 'tabpanel',
            tabBarPosition	: 'bottom',
            itemId			: 'tpMain',
          	items: [                               
            /*    {
                    title	: 'HOME',
                    itemId	: 'home'
                },*/
                {
                	title	: 'RADIUS',
                	xtype	: 'cntMainRadius',
                	itemId	: 'mainRadius'              
                },
                {
                	title	: 'NETWORKS',
                	xtype	: 'cntMainNetworks',
                	itemId	: 'mainNetworks'              
                },               
                {
                    title	: 'OTHER',
                    items    : [                	
                    	{
							xtype	: 'label',
							html	: '<i class="fas fa-heartbeat"></i> In the works....',
							margin	: 0,
							padding : 5,
							cls		: 'form-section'	
						}
                    ],
                    itemId	: 'other'
                }
            ],
            flex    : 1
        }
    ],
    initialize: function () {
     	const me = this;
     	
     	var cloud = {
				 	xtype		: 'cmbCloud',
				 	itemId		: 'cmbMainCloud'
				 };
     	
     	var dd = Ext.getApplication().getDashboardData();
        if(dd.user){
        	if(dd.user.cloud_id){
        		cloud = {
        			xtype 	: 'cmbCloud',
        			value 	: dd.user.cloud_id,
        			itemId	: 'cmbMainCloud'
        		}      	
        	}
     	}
     	
       	var menu = Ext.create({
		 xtype: 'actionsheet',
		 centered: false,
		 title: 'MENU',
			 items: [
				
				/*  {
					 text		: 'Setup Wizard',
					 iconCls	: 'x-fa fa-magic',
					 textAlign  : 'left',
					 itemId		: 'btnSetup'
				  }, */			 
				 {
					 text		: 'Settings',
					 iconCls	: 'x-fa fa-wrench',
					 textAlign  : 'left',
					 itemId		: 'btnSettings'
				 }, 
				 {
					 text		: 'Password',
					 iconCls	: 'x-fa fa-lock',
					 textAlign  : 'left',
					 itemId		: 'btnPassword'
				 }, 		 
				{
					 text		: 'Logout',
					 iconCls	: 'x-fa fa-power-off',
					 textAlign  : 'left',
					 itemId		: 'btnLogout'
				 },
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '5px solid #667078'
					}		
				 },
				 cloud
			 ]
	 	});
	 	Ext.Viewport.setMenu(menu, {
			 side: 'left',
			 // omitting the reveal config defaults the animation to 'cover'
			 reveal: true
		 });
        
 	}
});
