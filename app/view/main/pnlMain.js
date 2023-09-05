// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.main.pnlMain', {
    extend      : 'Ext.Panel',
    xtype       : 'pnlMain',
    fullscreen  : true,
    layout      : 'vbox',
    controller  : 'vcMain',
    requires	: [
        'RdMobile.view.mainRadius.cntMainRadius',
        'RdMobile.view.mainNetworks.cntMainNetworks',
        'RdMobile.view.mainOthers.cntMainOthers',
        'RdMobile.view.components.cmbCloud',
        'Ext.tab.Panel'
    ],
    
    initialize: function () {
     	const me = this;
     		
 		var cloud = {
		 	xtype		: 'cmbCloud',
		 	itemId		: 'cmbMainCloud'
		 };
		 
		 var cloud_data = {
			cloud_name	:'Select Cloud',
			warn_flag	: true
		};
     	
     	var dd = Ext.getApplication().getDashboardData();
        if(dd.user){
        
        	if(dd.user.cloud_count == 0){
            	console.log("No Clouds - Start Up the Wizard");
        	}else{
        
		    	if(dd.user.cloud_id){
		    		cloud = {
		    			xtype 	: 'cmbCloud',
		    			value 	: dd.user.cloud_id,
		    			itemId	: 'cmbMainCloud'
		    		}
		    		
		    		cloud_data = {
		    			cloud_name 	: dd.user.cloud_name,
		    			warn_flag	: false
		    		}      	
		    	}
		    }
     	}
     	
     	
     	me.setItems([
		    {
				xtype 	: 'toolbar',
				docked	: 'top',
				items	: [
					{
						xtype	: 'image',
						src		: 'resources/images/logo.png',
						height	: 32,
						width	: 32
					},
					{
		                xtype: 'spacer'
		            },
		            {
		            	xtype	: 'container',
		            	layout	: 'vbox',
		            	items	: [
		            		{
								xtype	: 'label',
								itemId	: 'lblMain',
								html	: 'RADIUSdesk',
								style	: {
					   				'color'			: '#005691',
					   				'letter-spacing': '4px',
					   				'text-align'	: 'center'
								}	
							},
		            		{
								xtype	: 'label',
								itemId	: 'lblCloud',
								style	: {
					   				'letter-spacing': '2px',
					   				'text-align'	: 'center',
					   				'padding-top'	: '4px'
								},
								tpl		:new Ext.XTemplate(
									'<tpl if="warn_flag">',
										'<div class="clr-red" style="font-size:x-small;"><i class="fa fa-exclamation-circle" style="color:orange;"></i>  {cloud_name}  <i class="fa fa-exclamation-circle" style="color:orange;"></i></div>',	
									'<tpl else>',
										'<div class="clr-grey-dark" style="font-size:x-small;"><i class="fa fa-cloud"></i>   {cloud_name}  <i class="fa fa-cloud"></i></div>',		
									'</tpl>'							
								),
								data	: cloud_data
							}		            	
		            	]		            
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
		            	xtype	: 'cntMainOthers',
		            	itemId	: 'mainOthers'              
		            }
		        ],
		        flex    : 1
		    }
		]);
     	
     
     	
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
