Ext.define('RdMobile.view.permanentUsers.cntPermanentUsers', {
    extend  : 'Ext.Container',
    xtype   : 'cntPermanentUsers',
    controller  : 'vcPermanentUsers',
    requires	: [
        'RdMobile.view.permanentUsers.vcPermanentUsers',
        'RdMobile.view.radiusClient.frmRadiusClient'
    ],
	items   : [
        {
		        xtype : 'toolbar',
		        docked: 'top',
		        items: [
					{ ui: 'normal', iconCls: 'x-fa fa-arrow-left', itemId : 'btnBackPermanentUsers'  },
					{
						xtype: 'label',
						html: '|'
					},
					{ ui: 'confirm', iconCls: 'x-fa fa-redo',	itemId : 'btnReload' },
					{ ui: 'normal',  iconCls: 'x-fa fa-sort-alpha-down', itemId : 'btnSort'	 },
					{ ui: 'normal',  iconCls: 'x-fa fa-filter', itemId : 'btnFilter' },
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
        	xtype: 'gridPermanentUsers'               
        }      
    ],                   
    scrollable : true,
	initialize: function (){
        const me = this;
        var menu = Ext.create({
		 xtype	: 'actionsheet',
		 itemId	: 'asMenu',
		 centered: false,
		 title: 'MENU',
			 items: [
				{
					 text		: 'Delete',
					 iconCls	: 'x-fa fa-trash',
					 textAlign  : 'left',
					 itemId		: 'btnDelete'
				 }, 
				 {
					 text		: 'Edit',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnEdit'
				 },
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},
				 {
					 text		: 'Test RADIUS',
					 iconCls	: 'x-fa fa-circle-notch',
					 textAlign  : 'left',
					 itemId		: 'btnRadius'
				 },
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},
				 {
					 text		: 'Graphs',
					 iconCls	: 'x-fa fa-chart-bar',
					 textAlign  : 'left',
					 itemId		: 'btnGraphs'
				 },
				 {
					 text		: 'Activity',
					 iconCls	: 'x-fa fa-running',
					 textAlign  : 'left',
					 itemId		: 'btnActivity'
				 }				     
			 ]
	 	});
	 	
	 	me.add(menu);
	 	
	 	var fab = Ext.create({
			xtype: "button",
			ui: 'round',
			floated: true,
			iconCls: "x-fa fa-plus",
			right: 20,
			bottom: 140,
			border: false,
			itemId	: 'btnAdd'
		});
	 	
	 	me.add(fab);
  	}
});
