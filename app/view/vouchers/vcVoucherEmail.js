Ext.define('RdMobile.view.vouchers.vcVoucherEmail', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcVoucherEmail',
    config: {
        urlEmailSend   : '/cake4/rd_cake/vouchers/email-voucher-details.json'
    },   
    onSubmit : function(btn){   
    	var me 		= this;   	
    	if(btn.up('formpanel').validate()){ 
    		btn.up('formpanel').setMasked(true);   	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEmailSend(),
                waitMsg				: 'Sending Data',
                success: function(form, action,b,c) {
		            btn.up('formpanel').setMasked(false);
		            btn.up('formpanel').close();
		           
		        },
		        failure: function(form,action){
		            me.getPnlRadiusReply().setMasked(false);
		        }
            });     	   	
    	}
    }
});
