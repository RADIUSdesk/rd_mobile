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
		            "col_1_name"	: "NAS",
		        },
		        {
		        	'id'  			: 1,
		            'col_0_name'	: 'Profiles',
		            "col_1_name"	: "Realms",
		        }, 
            ]
        }));
      
        me.setColumns( [
            {
                text: 'Col1',
                xtype: 'templatecolumn',                
                tpl : new Ext.XTemplate(
                    '<div class="card" style="border-radius: 10px;border: 1px solid #33cc33;padding: 5px; margin: 0px;">',
                    '<h3>{col_0_name}</h3>',
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
                    '<div class="card" style="border-radius: 10px;border: 1px solid #33cc33;padding: 5px; margin: 0px;">',
                    '<h3>{col_1_name}</h3>',
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
