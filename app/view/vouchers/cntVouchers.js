Ext.define('RdMobile.view.vouchers.cntVouchers', {
    extend  : 'Ext.Container',
    xtype   : 'cntVouchers',
    mixins	: [ "RdMobile.mixin.FloatingActionButton"],
    controller  : 'vcVouchers',
    requires	: [
        'RdMobile.view.vouchers.vcVouchers',
        'RdMobile.view.vouchers.frmVoucherAdd'
    ],
	fab		: 'btnFabTap',	
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
					 text		: 'Cloud',
					 iconCls	: 'x-fa fa-cloud',
					 textAlign  : 'left',
					 itemId		: 'btnCloud'
				 }, 
				 {
					 text		: 'Password',
					 iconCls	: 'x-fa fa-lock',
					 textAlign  : 'left',
					 itemId		: 'btnPassword'
				 }, 
				 {
					 text		: 'Logout',
					 iconCls	: 'x-fa fa-power-off',
					 textAlign  : 'left',
					 itemId		: 'btnLogout'
				 }
			 ]
	 	});
	 	
	 	me.add(menu);
  	}
});
