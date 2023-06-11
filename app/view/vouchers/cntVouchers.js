Ext.define('RdMobile.view.vouchers.cntVouchers', {
    extend  : 'Ext.Container',
    xtype   : 'cntVouchers',
    controller  : 'vcVouchers',
    requires	: [
        'RdMobile.view.vouchers.vcVouchers',
        'RdMobile.view.vouchers.frmVoucherAdd',
        'RdMobile.view.vouchers.frmVoucherEdit'
    ],
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
