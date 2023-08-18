// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.cntMeshViewNodeNodes', {
    extend  : 'Ext.Container',
    xtype   : 'cntMeshViewNodeNodes',
    controller  : 'vcMeshViewNodeNodes',
    layout	: 'fit',
    requires	: [
        'RdMobile.view.meshes.vcMeshViewNodeNodes',
        'RdMobile.view.meshes.gridMeshViewNodeNodes',
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
					{ ui: 'confirm', iconCls: 'x-fa fa-redo',	itemId : 'btnReload' }
		    ]
        },
        {
        	xtype: 'gridMeshViewNodeNodes'               
        }     
    ],                   
    scrollable : true,
	initialize: function (){
        const me = this;
        
	 	this.callParent(arguments);
  	}
});
