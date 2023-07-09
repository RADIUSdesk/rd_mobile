Ext.define('RdMobile.view.profiles.vcProfileEditFup', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcProfileEditFup',
     config : {
        urlViewProfile   : '/cake4/rd_cake/profiles/fup-view.json',
        urlEditProfile   : '/cake4/rd_cake/profiles/fup-edit.json'
    },
    init: function() {
        var me = this;
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEditProfile(),
                waitMsg				: 'Edit Profile',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    },
    loadProfileContent: function(){ 
        var me          = this;
        var profile_id  = me.getView().profile_id;
        Ext.Ajax.request({
			url		: me.getUrlViewProfile(),
			method	: 'get',
		  	params	: {profile_id : profile_id},
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
