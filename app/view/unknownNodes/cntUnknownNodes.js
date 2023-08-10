// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.unknownNodes.cntUnknownNodes', {
    extend  : 'Ext.Container',
    xtype   : 'cntUnknownNodes',
    controller  : 'vcUnknownNodes',
    requires	: [
        'RdMobile.view.unknownNodes.vcUnknownNodes',
        'RdMobile.view.unknownNodes.gridUnknownNodes'
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
