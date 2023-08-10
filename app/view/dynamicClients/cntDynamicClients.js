// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.dynamicClients.cntDynamicClients', {
    extend  : 'Ext.Container',
    xtype   : 'cntDynamicClients',
    controller  : 'vcDynamicClients',
    requires	: [
        'RdMobile.view.dynamicClients.vcDynamicClients',
        'RdMobile.view.dynamicClients.frmDynamicClientAdd',
        'RdMobile.view.dynamicClients.frmDynamicClientEdit',
        'RdMobile.view.dynamicClients.frmDynamicClientEditRealm',
        'RdMobile.view.dynamicClients.pnlDynamicClientDetail'
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
					{ ui: 'confirm', iconCls: 'x-fa fa-car', itemId : 'btnNewArrivals' },
					{ xtype: 'spacer'},
					{
						xtype	: 'label',
						itemId	: 'lblMeta'
					}
		    ]
        },
        {
        	xtype: 'gridDynamicClients'               
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
							id	: 'name',
							name: 'name'
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
					 text		: 'Edit',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnEdit'
				 },
				 {
					 text		: 'Edit Realms',
					 iconCls	: 'x-fa fa-volleyball-ball',
					 textAlign  : 'left',
					 itemId		: 'btnEditRealm'
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
				 },	
				 {
					xtype	: 'label',
					html	: '<div style="font-size: x-small;text-align: center;"><i class="far fa-lightbulb"></i> Site Wide Shared Secret</div><div style="color:#3e3f40;text-align: center;">testing123</div>',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},
			 ]
	 	});
	 	
	 	me.add(menu);
	 	
	 	var fab = Ext.create({
			xtype: "button",
			ui: 'round',
			floated: true,
			iconCls: "x-fa fa-plus",
			right: 20,
			bottom: 100,
			border: false,
			itemId	: 'btnAdd'
		});
	 	
	 	me.add(fab);
  	}
});
