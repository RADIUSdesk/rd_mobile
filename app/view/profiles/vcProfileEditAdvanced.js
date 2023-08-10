// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profiles.vcProfileEditAdvanced', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcProfileEditAdvanced',
     config : {
        urlManageComponents:'/cake4/rd_cake/profiles/manage-components.json',
    },
    init: function() {
        var me = this;
    },
    control :{
    	'radiogroup' : {
            change: 'radioComponentManage'
        }  
    },
    onSubmit : function(btn){   
    	var me 				= this;
    	var store 			= me.getView().grid.getStore();  	
    	var extra_params    = {};
        var id				= me.getView().down('#profileId').getValue();
       	extra_params[id] 	= id;	
    	  	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlManageComponents(),
                params				: extra_params,
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
    radioComponentManage: function(rbg,value){
        var me      = this;
        var form    = rbg.up('formpanel');
        var prior   = form.down('numberfield');
        if(value == 'add'){
            prior.show();
            prior.enable();
        }else{
            prior.hide();
            prior.disable();
        }
    },
});
