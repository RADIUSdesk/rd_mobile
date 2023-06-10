Ext.define('RdMobile.view.mainRadius.cntMainRadius', {
    extend      : 'Ext.Container',
    xtype       : 'cntMainRadius',
    controller  : 'vcMainRadius',
    requires	: [
        'RdMobile.view.mainRadius.vcMainRadius'
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
            xtype   : 'container',
            items   : [
                {
                    xtype       : 'button',
                    text        : 'Vouchers',
                    itemId      : 'btnVouchers'
                },
                {
                    xtype       : 'button',
                    text        : 'Permanent Users',
                    itemId      : 'btnPermanentUsers'
                },
            ]
        },
        {
            xtype	: 'cntVouchers',
        	layout	: 'fit'
        },
        {
            html: "Permanent Users"
        },
        {
            html: "Top Ups"
        }
    ]
});
