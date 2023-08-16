// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.mainNetworks.cntMainNetworks', {
    extend      : 'Ext.Container',
    xtype       : 'cntMainNetworks',
    controller  : 'vcMainNetworks',
    requires	: [
        'RdMobile.view.mainNetworks.vcMainNetworks',
        'RdMobile.view.mainNetworks.gridMainNetworks',
    ],
    layout: {
		type        : 'card',
		pack        : 'start',
		align       : 'stretch',
		animation   : 'slide',
		deferredRender: true
	},
    items: [
        {
        	xtype	: 'container',
        	items	: [
        		{
					xtype	: 'label',
					html	: 'Networks',
					margin	: 5,
					padding : 5,
					cls		: 'detail-section'	
				},
        		{
        			xtype	: 'gridMainNetworks',
        			height	: 300	
        		}
        	]
        },
        {
            xtype	: 'cntMeshes',
            layout	: 'fit'
         },
         {
            xtype	: 'cntMeshEntries',
        	layout	: 'fit'
        },
        {
            xtype	: 'cntMeshExits',
        	layout	: 'fit'
        },
        {
            xtype	: 'cntNodes',
        	layout	: 'fit'
        },
        {
        	xtype	: 'cntMeshViewEntriesGraph'
        },
        {
        	xtype	: 'cntApProfiles',
        	layout	: 'fit'
        },
        {
            xtype	: 'cntAccessPointEntries',
        	layout	: 'fit'
        },
        {
            xtype	: 'cntAccessPointExits',
        	layout	: 'fit'
        },
        {
            xtype	: 'cntAps',
            layout	: 'fit'
         },
        {
        	xtype	: 'cntUnknownNodes',
        	layout	: 'fit'
        }
    ]
});
