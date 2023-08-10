// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.radiusClient.vcRadiusClient', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRadiusClient',
    config: {
        urlRequest:         '/cake4/rd_cake/free-radius/test_radius.json'
    },  
    control: {
    	'#cmbUserType' : {
    		change	: 'cmbChange'
    	}
   }, 
    onSubmit : function(btn){   
    	var me 		= this; 
    	if(btn.up('formpanel').validate()){ 
    		btn.up('formpanel').setMasked(true);   	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlRequest(),
                waitMsg				: 'Sending Data',
                success: function(form, action,b,c) {
		            btn.up('formpanel').setMasked(false);
		            btn.up('formpanel').down('#cntReply').setData(action.data);
		        },
		        failure: function(form,action){
		            me.getPnlRadiusReply().setMasked(false);
		        }
            });     	   	
    	}    	
    },
    cmbChange	: function(cmb,newValue){
    	var me 			= this;
    	var cmbVoucher  = me.getView().down('cmbVoucher');
    	var cmbUser		= me.getView().down('cmbPermanentUser');
    	var cmbDevice	= me.getView().down('cmbDevice');
    	   	
    	if(newValue == 'voucher'){ 	
    		cmbVoucher.setHidden(false);
    		cmbVoucher.setDisabled(false);
    		cmbUser.setHidden(true);
    		cmbUser.setDisabled(true);
    		cmbDevice.setHidden(true);
    		cmbDevice.setDisabled(true);    	    	
    	}
    	
    	if(newValue == 'permanent'){
    		cmbVoucher.setHidden(true);
    		cmbVoucher.setDisabled(true);
    		cmbUser.setHidden(false);
    		cmbUser.setDisabled(false);
    		cmbDevice.setHidden(true);
    		cmbDevice.setDisabled(true);   	
    	}
    	
    	if(newValue == 'device'){
    		cmbVoucher.setHidden(true);
    		cmbVoucher.setDisabled(true);
    		cmbUser.setHidden(true);
    		cmbUser.setDisabled(true);
    		cmbDevice.setHidden(false);
    		cmbDevice.setDisabled(false); 	
    	}
    }
});
