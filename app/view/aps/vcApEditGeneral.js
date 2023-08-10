// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.vcApEditGeneral', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcApEditGeneral',
    config : {
        urlEdit  : '/cake4/rd_cake/ap-profiles/ap-profile-settings-edit.json',
        urlView : '/cake4/rd_cake/ap-profiles/ap-profile-settings-view.json'
    },
    loadApSettings : function(){
    	var me    	= this;
        var ap_profile_id = me.getView().apProfileId;
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {ap_profile_id : ap_profile_id},
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
                url                 : me.getUrlEdit(),
                waitMsg				: 'Edit AP Profile',
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
