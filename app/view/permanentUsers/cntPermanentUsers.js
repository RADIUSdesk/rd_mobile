// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.permanentUsers.cntPermanentUsers', {
    extend  : 'Ext.Container',
    xtype   : 'cntPermanentUsers',
    controller  : 'vcPermanentUsers',
    requires	: [
        'RdMobile.view.permanentUsers.vcPermanentUsers',
        'RdMobile.view.radiusClient.frmRadiusClient',
        'RdMobile.view.permanentUsers.frmPermanentUserAdd',
        'RdMobile.view.permanentUsers.frmPermanentUserEditBasic',
        'RdMobile.view.permanentUsers.frmPermanentUserEditPersonal',
        'RdMobile.view.permanentUsers.pnlPermanentUserDetail',
        'RdMobile.view.permanentUsers.frmEnableDisable',
        'RdMobile.view.password.frmPassword'
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
        	xtype: 'gridPermanentUsers'               
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
					value	: 'username',
					itemId	: 'cmbFilterOn',
					store: [
						{
							id	: 'username',
							name: 'Username'
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
					 text		: 'Edit Basic Info',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnEditBasic'
				 },
				 {
					 text		: 'Edit Personal Info',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnEditPersonal'
				 },
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},
				{
					 text		: 'Change Password',
					 iconCls	: 'x-fa fa-lock',
					 textAlign  : 'left',
					 itemId		: 'btnPassword'
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
