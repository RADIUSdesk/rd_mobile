Ext.define('RdMobile.view.mainRadius.vcMainRadius', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainRadius',
    control: {
        '#btnVouchers': {
            tap : 'onBtnVouchersTap'
        },
        '#btnPermanentUsers' :  {
            tap : 'onBtnPermanentUsersTap'
        },
        '#btnBackVouchers' : {
            tap : 'onBtnBackVouchersTap'
        }
    },
    onBtnVouchersTap : function(btn){
    	var me = this;
    	console.log("Vouchers Tapped");
        me.getView().setActiveItem(1);
    },
    onBtnPermanentUsersTap : function(btn){
    	var me = this;
    	console.log("Permanent Users Tapped");
        me.getView().setActiveItem(2);
    },
    onBtnBackVouchersTap : function(btn){
        var me = this;
        console.log("Back Button For Vouchers");
        me.getView().setActiveItem(0);
    }
});