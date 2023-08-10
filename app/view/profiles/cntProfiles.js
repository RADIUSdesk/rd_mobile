// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profiles.cntProfiles', {
    extend  : 'Ext.Container',
    xtype   : 'cntProfiles',
    controller  : 'vcProfiles',
    requires	: [
        'RdMobile.view.profiles.vcProfiles',
        'RdMobile.view.profiles.frmProfileAdd',
        'RdMobile.view.profiles.frmProfileEditSimple',
        'RdMobile.view.profiles.frmProfileEditFup',
        'RdMobile.view.profiles.frmProfileEditAdvanced'
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
					{ ui: 'normal',  iconCls: 'x-fa fa-puzzle-piece', itemId : 'btnProfileComponents' },
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
        	xtype: 'gridProfiles'               
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
					 text		: 'Simple Edit',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnEditSimple'
				 },
				 {
					 text		: 'FUP Edit',
					 iconCls	: 'x-fa fa-handshake',
					 textAlign  : 'left',
					 itemId		: 'btnEditFup'
				 },
				 {
					 text		: 'Advanced Edit',
					 iconCls	: 'x-fa fa-cogs',
					 textAlign  : 'left',
					 itemId		: 'btnEditAdv'
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
			bottom: 100,
			border: false,
			itemId	: 'btnAdd'
		});
	 	
	 	me.add(fab);
  	}
});
