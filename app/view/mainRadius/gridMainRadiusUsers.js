// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.mainRadius.gridMainRadiusUsers', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMainRadiusUsers',
    emptyText: 'Create Some Radius',
    config  : {
        compdata: undefined,
    },
    hideHeaders: true,
    rowLines: true,
    trackMouseOver: false,
    viewConfig: {
        stripeRows: false
    },
    rowLines: false,
    disableSelection: true,
    selectable: {
		mode  : 'single',
		cells : 'true' 
	},
    initialize: function () {
        const me = this;
        me.setStore( Ext.create('Ext.data.Store', {
            storeId : "mainRadiusStore",
            fields  : ['name', 'email', 'phone'],
            data    : [
		        {
		        	'id'  			: 0,
		            'col_0_name'	: 'Permanent Users',
		            'col_0_fa'		: 'user',
		            "col_1_name"	: "Vouchers",
		            'col_1_fa'		: 'ticket-alt'
		            
		        },
		        {
		        	'id'  			: 1,
		            'col_0_name'	: 'BYOD',
		            'col_0_fa'		: 'tablet-alt',
		            "col_1_name"	: "Activity Monitor",
		            'col_1_fa'		: 'running'
		        }, 
            ]
        }));
      
        me.setColumns( [
            {
                text: 'Col1',
                xtype: 'templatecolumn',                
                tpl : new Ext.XTemplate(
                    '<div style="border-radius: 5px;border: 1px solid #7c7d80;padding-top: 10px; margin: 2px;text-align: center; color:#0677c7">',
                    '<i class="fa fa-{col_0_fa} fa-2x"></i>',
                    '<div style="margin-top: 0.25em;padding: 2px; margin: 2px;">{col_0_name}</div>',
                    '</div>',
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            },
            {
                text: 'Col2',
                xtype: 'templatecolumn',                
                tpl : new Ext.XTemplate(
                    '<div style="border-radius: 5px;border: 1px solid #7c7d80;padding-top: 10px; margin: 2px;text-align: center; color:#0677c7">',
                    '<i class="fa fa-{col_1_fa} fa-2x"></i>',
                    '<div style="margin-top: 0.25em;padding: 2px; margin: 2px;">{col_1_name}</div>',
                    '</div>',
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            }
        ]);
        me.getStore().reload()		
		this.callParent();     
    }
 });
