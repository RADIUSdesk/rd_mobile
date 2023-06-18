Ext.define('RdMobile.view.vouchers.cntVouchers', {
    extend  : 'Ext.Container',
    xtype   : 'cntVouchers',
    controller  : 'vcVouchers',
    requires	: [
        'RdMobile.view.vouchers.vcVouchers',
        'RdMobile.view.vouchers.frmVoucherAdd',
        'RdMobile.view.vouchers.frmVoucherEdit',
        'RdMobile.view.vouchers.frmVoucherPdf',
        'RdMobile.view.vouchers.frmVoucherEmail',
        'RdMobile.view.radiusClient.frmRadiusClient'
    ],
	items   : [
        {
		        xtype : 'toolbar',
		        docked: 'top',
		        items: [
					{ ui: 'normal', iconCls: 'x-fa fa-arrow-left', itemId : 'btnBack'  },
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
        	xtype: 'gridVouchers'               
        }      
    ],                   
    scrollable : true,
	initialize: function (){
        const me 	= this;
        
        var filter 	= Ext.create({
		 xtype	: 'actionsheet',
		 itemId	: 'asFilter',
		 centered: false,
		 title: 'FILTER',
			 items: [
				{
					xtype	: 'combobox',
					label	: 'Filter On',
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					value	: 'name',
					itemId	: 'cmbFilterOn',
					store: [
						{
							id	: 'name',
							name: 'Name'
						}, 
						{
							id	: 'batch',
							name: 'Batch'
						}, 
						{
							id	: 'profile',
							name: 'Profile'
						},
						{
							id	: 'realm',
							name: 'Realm'						
						}
					]
				},
				{
				    xtype	: 'textfield',
				    label	: 'Filter Value',
				    name	: 'filter_value',
				    itemId  : 'txtFilterValue'
				}					     
			 ]
	 	});
	 	
	 	me.add(filter);
                   
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
					 text		: 'PDF Export',
					 iconCls	: 'x-fa fa-file-pdf',
					 textAlign  : 'left',
					 itemId		: 'btnPdf'
				 },
				 {
					 text		: 'e-mail Voucher',
					 iconCls	: 'x-fa fa-envelope',
					 textAlign  : 'left',
					 itemId		: 'btnEmail'
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
