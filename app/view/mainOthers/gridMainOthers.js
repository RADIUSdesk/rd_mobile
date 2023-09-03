// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.mainOthers.gridMainOthers', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMainOthers',
    emptyText: 'Not Items To Display',
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
            storeId : "mainOthersStore",
            fields  : ['id', 'col_0_name', 'col_0_fa','col_1_name','col_1_fa'],
            data    : [
		       {
		        	id  : 0,
		            0	: {'name':'Setup Wizard',	'cmp' : 'frmWizard','fa': 'magic'},
		            1	: {}
		        }
            ]
        }));
      
        me.setColumns( [
            {
                text: 'Col1',
                xtype: 'templatecolumn',                
                tpl : new Ext.XTemplate(
                 	'<tpl if="!(Ext.isEmpty(0))">',
		                '<div style="border-radius: 5px;border: 1px solid #7c7d80;padding-top: 10px; margin: 2px;text-align: center; color:#0677c7">',
		                '<tpl for="0">',
		                	'<i class="fa fa-{fa} fa-2x"></i>',
		                	'<div style="margin-top: 0.25em;padding: 2px; margin: 2px;">{name}</div>',
		                '</tpl>',
		                '</div>',
		          	'</tpl>'
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
                	'<tpl if="Ext.isEmpty(koos)">', //
		                '<div style="border-radius: 5px;border: 1px solid #7c7d80;padding-top: 10px; margin: 2px;text-align: center; color:#0677c7">',
		                '<tpl for="1">',
		                	'<i class="fa fa-{fa} fa-2x"></i>',
		                	'<div style="margin-top: 0.25em;padding: 2px; margin: 2px;">{name}</div>',
		                '</tpl>',
		                '</div>',
		         	'</tpl>'
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
