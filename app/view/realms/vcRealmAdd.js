// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.realms.vcRealmAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRealmAdd',
    config	: {
        urlAdd  : '/cake4/rd_cake/realms/add.json'
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Adding Realm',
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
