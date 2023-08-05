Ext.define('RdMobile.view.aps.vcApProfileAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcApProfileAdd',
    config : {
        urlAdd  : '/cake4/rd_cake/ap-profiles/add.json'
    },
    onSubmit : function(btn){   
    	var me 		= this;
    	var store 	= me.getView().grid.getStore();  	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Add AP Profile',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form,result ) {
                	form.setErrors(result.errors);          
                }
            });    	
    	}else{
    		console.log("Form does not validate");
    	}
    }
});
