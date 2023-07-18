Ext.define('RdMobile.view.realms.vcRealmEditLogo', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRealmEditLogo',
    config : {
        urlView  		: '/cake4/rd_cake/realms/view.json',
        urlLogoBase		: '/cake4/rd_cake/img/realms/',
        urlUploadLogo	: '/cake4/rd_cake/realms/upload_logo.json'
    },
    onSubmit : function(btn){   
    	var me 		= this;
    	var p_img   = me.getView().down('#pnlImg');
    	   	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlUploadLogo(),
                waitMsg				: 'Edit Realm',
                success: function(form, result) {
            	    if(result.success){ 
		                var new_img = result.icon_file_name;    
		                var img_url = me.getUrlLogoBase()+new_img;
		                p_img.setData({image:img_url});
		            }         
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    },
    loadLogo: function(){ 
    
        var me          = this;
        var realm_id  	= me.getView().realm_id;
        var p_img   	= me.getView().down('#pnlImg');
        
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {realm_id : realm_id},
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    var img_url = me.getUrlLogoBase()+jsonData.data.icon_file_name;
                    p_img.setData({image:img_url});      
        		}
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});
    }
});
