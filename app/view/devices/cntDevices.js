// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.devices.cntDevices', {
    extend  : 'Ext.Container',
    xtype   : 'cntDevices',
    controller  : 'vcDevices',
    requires	: [
        'RdMobile.view.devices.vcDevices',
        'RdMobile.view.devices.gridDevices',
        'RdMobile.view.radiusClient.frmRadiusClient',
        'RdMobile.view.components.cmbPermanentUser',
        'RdMobile.view.devices.frmDeviceAdd',
        'RdMobile.view.devices.frmDeviceEdit',
        'RdMobile.view.devices.frmDeviceEnableDisable',
        'RdMobile.view.devices.pnlDeviceDetail'
    ],
	items   : [
        {
		        xtype : 'toolbar',
		        docked: 'top',
		        items: [
					{ ui: 'normal', iconCls: 'x-fa fa-arrow-left', itemId : 'btnBack'  },
					{
						xtype: 'label',
						html: '|'
					},
					{ ui: 'confirm', iconCls: 'x-fa fa-redo',	itemId : 'btnReload' },
					{ ui: 'normal',  iconCls: 'x-fa fa-sort-alpha-down', itemId : 'btnSort'	 },
					{ ui: 'normal',  iconCls: 'x-fa fa-filter', itemId : 'btnFilter' },
					{
		    xtype: 'spacer'
		},
			    {
				    xtype	: 'label',
				    itemId	: 'lblMeta'
			    }
		    ]
        },
        {
        	xtype: 'gridDevices'               
        }      
    ],                   
    scrollable : true,
	initialize: function (){
        const me = this;
        
        var filter 	= Ext.create({
		 xtype	: 'actionsheet',
		 itemId	: 'asFilter',
		 centered: false,
		 title: 'FILTER',
			 items: [
				{
					xtype	: 'combobox',
					label	: 'Filter On',
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					value	: 'name',
					itemId	: 'cmbFilterOn',
					store: [
						{
							id	: 'owner',
							name: 'Owner'
						}, 
						{
							id	: 'name',
							name: 'MAC Address'
						}, 
						{
							id	: 'profile',
							name: 'Profile'
						},
						{
							id	: 'realm',
							name: 'Realm'						
						}
					]
				},
				{
				    xtype	: 'textfield',
				    label	: 'Filter Value',
				    itemId  : 'txtFilterValue'
				},
				{
					xtype	: 'cmbPermanentUser',
					hidden	: true
				}					     
			 ]
	 	});
	 	
	 	me.add(filter);
                   
        var menu = Ext.create({
		 xtype	: 'actionsheet',
		 itemId	: 'asMenu',
		 centered: false,
		 title: 'MENU',
			 items: [
				{
					 text		: 'Delete',
					 iconCls	: 'x-fa fa-trash',
					 textAlign  : 'left',
					 itemId		: 'btnDelete'
				 }, 
				 {
					 text		: 'Edit',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnEdit'
				 },			
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},
				 {
					 text		: 'Enable / Disable',
					 iconCls	: 'x-fa fa-toggle-on',
					 textAlign  : 'left',
					 itemId		: 'btnEnable'
				 },
				 {
					 text		: 'Test RADIUS',
					 iconCls	: 'x-fa fa-circle-notch',
					 textAlign  : 'left',
					 itemId		: 'btnRadius'
				 },
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},
				{
					 text		: 'More Detail',
					 iconCls	: 'x-fa fa-info-circle',
					 textAlign  : 'left',
					 itemId		: 'btnDetail'
				 },
				 {
					 text		: 'Graphs',
					 iconCls	: 'x-fa fa-chart-bar',
					 textAlign  : 'left',
					 itemId		: 'btnGraphs'
				 },
				 {
					 text		: 'Activity',
					 iconCls	: 'x-fa fa-running',
					 textAlign  : 'left',
					 itemId		: 'btnActivity'
				 }				     
			 ]
	 	});
	 	
	 	me.add(menu);
	 	
	 	var fab = Ext.create({
			xtype: "button",
			ui: 'round',
			floated: true,
			iconCls: "x-fa fa-plus",
			right: 20,
			bottom: 140,
			border: false,
			itemId	: 'btnAdd'
		});
	 	
	 	me.add(fab);
  	}
});
