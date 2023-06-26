Ext.define('RdMobile.view.profiles.vcProfileAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcProfileAdd',
    config	: {
        urlAdd  : '/cake4/rd_cake/profiles/simple-add.json'
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Adding Profile',
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
