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
		deferredRender: false
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
        }
    ]
});
