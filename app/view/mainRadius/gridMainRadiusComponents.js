// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.mainRadius.gridMainRadiusComponents', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMainRadiusComponents',
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
		            'col_0_name'	: 'RADIUS Clients',
		            'col_0_fa'		: 'circle-notch',
		            "col_1_name"	: "NAS",
		            'col_1_fa'		: 'cube'
		        },
		        {
		        	'id'  			: 1,
		            'col_0_name'	: 'Profiles',
		            'col_0_fa'		: 'cubes',
		            "col_1_name"	: "Realms",
		            'col_1_fa'		: 'volleyball-ball'
		        } 
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
