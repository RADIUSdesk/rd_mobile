// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.mainNetworks.gridMainNetworks', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMainNetworks',
    emptyText: 'Create Some Networks',
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
            storeId : "mainNetworksStore",
            fields  : ['id', 'col_0_name', 'col_0_fa','col_1_name','col_1_fa'],
            data    : [
		       {
		        	id  : 0,
		            0	: {'name':'MESH Networks',	'cmp' : 'cntMeshes','fa': 'sitemap'},
		            1	: {'name':'MESH Nodes',		'cmp' : 'cntNodes','fa': 'code-branch'}
		        },
		        {
		        	id	: 1,
		            0	: {'name':'AP Profiles', 	'cmp' 	: 'cntApProfiles',	'fa': 'cubes'},
		            1	: {'name':'APs',  			'cmp' 	: 'cntAps',			'fa': 'cube'}
		        },
		        {
		        	'id'	: 2,
		            0	: {'name':'New Arrivals', 	'cmp' 	: 'cntUnknownNodes',	'fa': 'car'},
		            1	: {'name':'Limited Devices','cmp' 	: 'cntAps',			'fa': 'traffic-light'}
		        }
            ]
        }));
      
        me.setColumns( [
            {
                text: 'Col1',
                xtype: 'templatecolumn',                
                tpl : new Ext.XTemplate(
                    '<div style="border-radius: 5px;border: 1px solid #7c7d80;padding-top: 10px; margin: 2px;text-align: center; color:#0677c7">',
                    '<tpl for="0">',
                    	'<i class="fa fa-{fa} fa-2x"></i>',
                    	'<div style="margin-top: 0.25em;padding: 2px; margin: 2px;">{name}</div>',
                    '</tpl>',
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
                    '<tpl for="1">',
                    	'<i class="fa fa-{fa} fa-2x"></i>',
                    	'<div style="margin-top: 0.25em;padding: 2px; margin: 2px;">{name}</div>',
                    '</tpl>',
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
