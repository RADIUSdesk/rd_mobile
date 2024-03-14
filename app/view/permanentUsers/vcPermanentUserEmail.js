// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.permanentUsers.vcPermanentUserEmail', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPermanentUserEmail',
    config: {
        urlEmailSend   : '/cake4/rd_cake/permanent-users/email-user-details.json'
    },   
    onSubmit : function(btn){   
    	var me 		= this;   	
    	if(btn.up('formpanel').validate()){ 
    		btn.up('formpanel').setMasked(true);   	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEmailSend(),
                waitMsg				: 'Sending Data',
                success: function(form, action,b,c) {
		            btn.up('formpanel').setMasked(false);
		            btn.up('formpanel').close();
		           
		        },
		        failure: function(form,action){
		            btn.up('formpanel').setMasked(false);
		        }
            });     	   	
    	}
    }
});
