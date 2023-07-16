Ext.define('RdMobile.view.main.pnlMain', {
    extend      : 'Ext.Panel',
    xtype       : 'pnlMain',
    fullscreen  : true,
    layout      : 'vbox',
    controller  : 'vcMain',
    requires	: [
        'RdMobile.view.components.cmpBasic',
        'RdMobile.view.vouchers.gridVouchers',
        'RdMobile.view.vouchers.cntVouchers',
        'RdMobile.view.mainRadius.cntMainRadius',
        'RdMobile.model.mVoucher',
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
            listeners		: {
		        activeitemchange: function(tabpanel, newTab) {
		       		console.log(newTab.getItemId());                 
		        }
		   	},
          	items: [                               
            /*    {
                    title	: 'HOME',
                    itemId	: 'home',
					xtype: 'panel',
					bodyPadding: true,
					items: [
					    {
						    xtype 	: 'toolbar',
						    docked	: 'top',
						    items	: [
							    { ui: 'normal', iconCls: 'x-fa fa-redo' 	},
							    { ui: 'normal', iconCls: 'x-fa fa-plus' 	},
							    { ui: 'normal', iconCls: 'x-fa fa-trash-alt' },
							    { ui: 'normal', iconCls: 'x-fa fa-pencil-alt' }
						    ]
					    }					
					],
                },*/
                {
                	title	: 'RADIUS',
                	xtype	: 'cntMainRadius',
                	itemId	: 'mainRadius'              
                },               
                {
                    title	: 'NETWORKS',
                    html    : 'Networks Screen',
                    itemId	: 'networks'
                },
                {
                    title	: 'OTHER',
                    html    : 'OTHER Screen',
                    itemId	: 'other'
                }
            ],
            flex    : 1
        }
    ],
    initialize: function () {
     	const me = this;
       	var menu = Ext.create({
		 xtype: 'actionsheet',
		 centered: false,
		 title: 'MENU',
			 items: [
				 {
					 text		: 'Cloud',
					 iconCls	: 'x-fa fa-cloud',
					 textAlign  : 'left',
					 itemId		: 'btnCloud'
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
				 }
			 ]
	 	});
	 	Ext.Viewport.setMenu(menu, {
			 side: 'left',
			 // omitting the reveal config defaults the animation to 'cover'
			 reveal: true
		 });
        
 	}
});
