// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.unknownNodes.cntUnknownNodes', {
    extend  : 'Ext.Container',
    xtype   : 'cntUnknownNodes',
    controller  : 'vcUnknownNodes',
    requires	: [
        'RdMobile.view.unknownNodes.vcUnknownNodes',
        'RdMobile.view.unknownNodes.gridUnknownNodes',
        'RdMobile.view.meshes.frmMeshAddEditNode'
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
        	xtype: 'gridUnknownNodes'               
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
							name: 'Name'
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
					 text		: 'Add To Mesh',
					 iconCls	: 'x-fa fa-code-branch',
					 textAlign  : 'left',
					 itemId		: 'btnNodeAdd'
				},
				{
					 text		: 'Add To AP Profile',
					 iconCls	: 'x-fa fa-cube',
					 textAlign  : 'left',
					 itemId		: 'btnApAdd'
				},				
				{
					 text		: 'Delete',
					 iconCls	: 'x-fa fa-trash',
					 textAlign  : 'left',
					 itemId		: 'btnDelete'
				}
			 ]
	 	});
	 	
	 	me.add(menu);
	 	
	 	this.callParent(arguments);
  	}
});
