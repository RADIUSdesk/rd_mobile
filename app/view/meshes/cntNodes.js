// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.cntNodes', {
    extend  : 'Ext.Container',
    xtype   : 'cntNodes',
    controller  : 'vcNodes',
    requires	: [
        'RdMobile.view.meshes.vcNodes',
        'RdMobile.view.meshes.gridNodes',
        'RdMobile.view.components.frmHardwareAddAction',
        'RdMobile.view.components.cntActionHistories',
        'RdMobile.view.meshes.pnlNodeDetail'
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
        	xtype: 'gridNodes'               
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
					displayField: 'name',
					valueField: 'id',
					value	: 'mesh',
					itemId	: 'cmbFilterOn',
					store: [ 
						{
							id	: 'mesh',
							name: 'Mesh'
						},
						{
							id	: 'name',
							name: 'Name'
						},
						{
							id	: 'mac',
							name: 'MAC Address'
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
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},
				 {
					 text		: 'Restart',
					 iconCls	: 'x-fa fa-power-off',
					 textAlign  : 'left',
					 itemId		: 'btnRestart'
				 },
				 {
					 text		: 'Execute',
					 iconCls	: 'x-fa fa-wrench',
					 textAlign  : 'left',
					 itemId		: 'btnExecute'
				 },
				  {
					 text		: 'Execute History',
					 iconCls	: 'x-fa fa-clock',
					 textAlign  : 'left',
					 itemId		: 'btnHistory'
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
	 	this.callParent(arguments);
  	}
});
