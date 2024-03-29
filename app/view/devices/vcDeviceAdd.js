// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.devices.vcDeviceAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcDeviceAdd',
    config: {
        urlAdd  : '/cake4/rd_cake/devices/add.json'
    },
    control: {
        '#never_expire' : {
        	change: 'chkNeverExpireChange'
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
    chkNeverExpireChange: function(chk,value){
        var me      = this;
        var form    = chk.up('formpanel');
        var f    	= form.down('#from_date');
        var t		= form.down('#to_date');
        if(value){
            f.setDisabled(true); 
            f.setHidden(true); 
            t.setDisabled(true); 
            t.setHidden(true);               
        }else{
            f.setDisabled(false);
            f.setHidden(false);
            t.setDisabled(false);
            t.setHidden(false);
        }
    }
});
