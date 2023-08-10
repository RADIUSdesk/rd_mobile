// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.cntAccessPointEntries', {
    extend  : 'Ext.Container',
    xtype   : 'cntAccessPointEntries',
    controller  : 'vcAccessPointEntries',
    requires	: [
        'RdMobile.view.aps.vcAccessPointEntries',
        'RdMobile.view.aps.gridAccessPointEntries',
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
        	xtype: 'gridAccessPointEntries'               
        }     
    ],                   
    scrollable : true,
	initialize: function (){
        const me = this;
        
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
			bottom: 80,
			border: false,
			itemId	: 'btnAdd'
		});
	 	
	 	me.add(fab);
	 	this.callParent(arguments);
  	}
});
