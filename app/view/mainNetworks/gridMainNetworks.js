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
		        	'id'  			: 0,
		            'col_0_name'	: 'MESH Networks',
		            'col_0_fa'		: 'code-branch',
		            "col_1_name"	: "MESH Nodes",
		            'col_1_fa'		: 'cube'
		        },
		        {
		        	'id'  			: 1,
		            'col_0_name'	: 'AP Profiles',
		            'col_0_fa'		: 'cubes',
		            "col_1_name"	: "APs",
		            'col_1_fa'		: 'cube'
		        },
		        {
		        	'id'  			: 2,
		            'col_0_name'	: 'New Arrivals',
		            'col_0_fa'		: 'car',
		            "col_1_name"	: "Limited Devices",
		            'col_1_fa'		: 'ban'
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
