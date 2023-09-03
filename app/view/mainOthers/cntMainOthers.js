// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.mainOthers.cntMainOthers', {
    extend      : 'Ext.Container',
    xtype       : 'cntMainOthers',
    controller  : 'vcMainOthers',
    requires	: [
        'RdMobile.view.mainOthers.vcMainOthers',
        'RdMobile.view.mainOthers.gridMainOthers',
        'RdMobile.view.wizard.frmWizard'
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
					html	: 'Other Items',
					margin	: 5,
					padding : 5,
					cls		: 'detail-section'	
				},
        		{
        			xtype	: 'gridMainOthers',
        			height	: 300	
        		}
        	]
        }
    ]
});
