Ext.define('RdMobile.view.vouchers.cntVouchers', {
    extend  : 'Ext.Container',
    xtype   : 'cntVouchers',
    mixins	: [ "RdMobile.mixin.FloatingActionButton"],
    controller  : 'vcVouchers',
    requires	: [
        'RdMobile.view.vouchers.vcVouchers'
    ],
   	fab		: function() {
		Ext.Msg.alert("FAB", "FAB clicked");
	},
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
