// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.vcWifiMac', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcWifiMac',
    config: {
        urlAlias  	: '/cake4/rd_cake/wifi-charts/edit-mac-alias.json',
        urlFirewall : '/cake4/rd_cake/wifi-charts/edit-mac-alias.json',
        urlLimit 	: '/cake4/rd_cake/wifi-charts/edit-mac-alias.json',
        urlBlock 	: '/cake4/rd_cake/wifi-charts/edit-mac-alias.json',
    },
    init    : function() {
        var me = this;
    },
   	onSubmit : function(btn){   
    	var me 		= this;
    	var url		= '';
    	if(me.getView().action == 'alias'){
    		url = me.getUrlAlias();
    	}
    			
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : url,
                success: function(form, result) {
					me.getView().ctrl.reload();
            	    form.close();      
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
