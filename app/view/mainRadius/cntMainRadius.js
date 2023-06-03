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
        	layout	: 'fit',
            items   : [
                {
		            xtype : 'toolbar',
		            docked: 'top',
		            items: [
					    { ui: 'normal', iconCls: 'x-fa fa-arrow-left', itemId : 'btnBackVouchers'  },
					    {
						    xtype: 'label',
						    html: '|'
					    },
					    { ui: 'confirm', iconCls: 'x-fa fa-redo' },
					    { ui: 'normal',  iconCls: 'x-fa fa-sort-alpha-down' },
					    { ui: 'normal',  iconCls: 'x-fa fa-filter' },
					    {
                xtype: 'spacer'
            },
					    {
						    xtype: 'label',
						    html: 'My label!<br><span>koos</span><br><span style="font-size: xx-small;">Jan</span>'
					    }
				    ]
		        },
                {
                	xtype: 'gridVouchers'               
                }
            ],                   
            scrollable : true,
        },
        {
            html: "Permanent Users"
        },
        {
            html: "Top Ups"
        }
    ]
});