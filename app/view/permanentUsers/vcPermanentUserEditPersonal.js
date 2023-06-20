Ext.define('RdMobile.view.permanentUsers.vcPermanentUserEditPersonal', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPermanentUserEditPersonal',
    config: {
        urlViewBasic  	: '/cake4/rd_cake/permanent-users/view-personal-info.json',
        urlEditBasic   	: '/cake4/rd_cake/permanent-users/edit-personal-info.json'
    },
    control: {
    	'frmPermanentUserEditPersonal'	: {
    		show : 'show'
    	}
    },
    show	: function(){
    	var me = this;
    	console.log("Show Edit");
    	console.log(me.getView().user_id);  	
    	Ext.Ajax.request({
			url		: me.getUrlViewBasic(),
			method	: 'get',
		  	params	: {
		    	user_id : me.getView().user_id
		  	},
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
    },
    onSubmit : function(btn){   
    	var me 		= this; 
    	var store 	= me.getView().grid.getStore();   	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEditBasic(),
                waitMsg				: 'Saving Data',
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
