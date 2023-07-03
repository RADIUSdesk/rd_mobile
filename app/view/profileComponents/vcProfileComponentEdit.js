Ext.define('RdMobile.view.profileComponents.vcProfileComponentEdit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcProfileComponentEdit',
    config	: {
        urlEdit  : '/cake4/rd_cake/profile-components/edit.json'
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().dv.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEdit(),
                waitMsg				: 'Edit Profile Component',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    }
});
