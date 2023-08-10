// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.vouchers.vcVoucherAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcVoucherAdd',
    config: {
        urlAdd  : '/cake4/rd_cake/vouchers/add.json'
    },
    control: {
        '#activate_on_login': {
        	change:  'chkActivateOnLoginChange'
        },
        '#never_expire' : {
        	change: 'chkNeverExpireChange'
      	},
      	'#quantity' : {
        	change: 'quantityChange'
      	} 	
    },
    onSubmit : function(btn){   
    	var me = this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Lekker Man',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
            
                }
            });    	
    	}
    },
    chkActivateOnLoginChange: function(chk,value){
        var me      = this;
        var form    = chk.up('formpanel');
        var dv      = form.down('#days_valid');
        var hv      = form.down('#hours_valid');
        var mv      = form.down('#minutes_valid');
        if(value){
            dv.setHidden(false);
            dv.setDisabled(false); 
            hv.setHidden(false);
            hv.setDisabled(false);
            mv.setHidden(false);
            mv.setDisabled(false);       
        }else{
            dv.setHidden(true);
            dv.setDisabled(true); 
            hv.setHidden(true);
            hv.setDisabled(true);
            mv.setHidden(true);
            mv.setDisabled(true);    
        }
    },
    chkNeverExpireChange: function(chk,value){
        var me      = this;
        var form    = chk.up('formpanel');
        var e       = form.down('#expire');
        if(value){
            e.setDisabled(true); 
            e.setHidden(true);               
        }else{
            e.setDisabled(false);
            e.setHidden(false);
        }
    },
    quantityChange: function(number,value){
        var me      = this;
        var form    = number.up('formpanel');
        var batch   = form.down('#batch');
        if(value>1){
            batch.setHidden(false);
            batch.setDisabled(false);   
        }else{
            batch.setHidden(true);
            batch.setDisabled(true);
        }
    }
});
