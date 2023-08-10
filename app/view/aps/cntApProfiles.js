// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.cntApProfiles', {
    extend  : 'Ext.Container',
    xtype   : 'cntApProfiles',
    controller  : 'vcApProfiles',
    requires	: [
        'RdMobile.view.aps.vcApProfiles',
        'RdMobile.view.aps.gridApProfiles',
       // 'RdMobile.view.aps.frmApProfileAdd',
       // 'RdMobile.view.aps.frmApProfileEditGeneral'
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
					itemId	: 'lblMeta',
					tpl		: new Ext.XTemplate(
						'<div class="two-columns-grid">',
							'<div class="item-lbl" style="font-size: x-small;padding:0px;">AP Profiles :</div>',
							'<div class="item-value" style="font-size: x-small;padding:0px;">{ap_profiles_total} ({ap_profiles_up} ONLINE)</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl" style="font-size: x-small;padding:0px;">APs :</div>',
							'<div class="item-value" style="font-size: x-small;padding:0px;">{aps_total} ({aps_up} ONLINE)</div>',
						'</div>',
					),
					data	: {}
				}
	    	]
        },
        {
        	xtype: 'gridApProfiles'               
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
					xtype	: 'combobox',
					label	: 'Edit',
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					value	: 'choose_one',
					multiSelect: false,
					itemId	: 'cmbEdit',
					store: [ 
						{
							id	: 'choose_one',
							name: 'Choose One'
						},
						{
							id	: 'general',
							name: 'General'
						},
						{
							id	: 'ssids',
							name: 'SSIDs'
						},
						{
							id	: 'exit_points',
							name: 'Exit Points'
						},
						{
							id	: 'common_settings',
							name: 'Common Settings'
						},
						{
							id	: 'aps',
							name: 'APs'
						}					
					]
				},
				 {
					 text		: 'Delete',
					 iconCls	: 'x-fa fa-trash',
					 textAlign  : 'left',
					 itemId		: 'btnDelete'
				 },		
				{
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},				
				{
					xtype	: 'combobox',
					label	: 'View',
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					value	: 'choose_one',
					itemId	: 'cmbView',
					store: [ 
						{
							id	: 'choose_one',
							name: 'Choose One'
						},
						{
							id	: 'general',
							name: 'General'
						}				
					]
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
