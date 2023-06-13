Ext.define('RdMobile.view.radiusClient.vcRadiusClient', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRadiusClient',
    config: {
        urlRequest:         '/cake4/rd_cake/free-radius/test_radius.json'
    },  
    onSubmit : function(btn){   
    	var me 		= this; 
    	console.log("Radius Test Submit Tapped");
    	if(btn.up('formpanel').validate()){ 
    		btn.up('formpanel').setMasked(true);   	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlRequest(),
                waitMsg				: 'Sending Data',
                success: function(form, action,b,c) {
		            btn.up('formpanel').setMasked(false);
		            btn.up('formpanel').down('#cntReply').setData(action.data);
		            console.log(action.data); 
		        },
		        failure: function(form,action){
		            me.getPnlRadiusReply().setMasked(false);
		            console.log(action); 
		        }
            });     	   	
    	}    	
    }
});
