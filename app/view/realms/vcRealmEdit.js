Ext.define('RdMobile.view.realms.vcRealmEdit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRealmEdit',
    config : {
        urlView  : '/cake4/rd_cake/realms/view.json',
        urlEdit  : '/cake4/rd_cake/realms/edit.json'
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEdit(),
                waitMsg				: 'Edit Realm',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    },
    loadRealm: function(){ 
        var me          = this;
        var realm_id  = me.getView().realm_id;
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {realm_id : realm_id},
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    me.getView().setValues(jsonData.data);       
        		}
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});
    }
});
