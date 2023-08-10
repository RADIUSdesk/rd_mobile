// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.main.vcMainPassword', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainPassword',
    config	: {
        urlChangePassword   : '/cake4/rd_cake/dashboard/change_password.json',
    },
    controllerValidatorFn: function(value) {    
   		var me = this;
   		if(me.getView().down('#password').getValue() !== value){
   			return 'Passwords Does Not Match';
   		}else{
   			return true;
   		}
    },
    onSubmit : function(btn){   
    	var me 	= this;	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlChangePassword(),
                waitMsg				: 'Changing Password',
                success: function(form, result) {
            	    form.close();
            	    if(result.success){
            	    	var e_p		= Ext.Ajax.getExtraParams();
    					e_p.token	= result.data.token;
    					Ext.Ajax.setExtraParams(e_p);
    				}   
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    }
});
