// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profileComponents.vcProfileComponentEntryAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcProfileComponentEntryAdd',
    config	: {
        urlAdd     : '/cake4/rd_cake/profile-components/add-comp.json',
    },
    control: {
    	'cmbVendor': {
            change	: 'cmbVendorChange'
        }
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().dv.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Adding Profile Component Entry',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    },
    cmbVendorChange: function(cmb){
        var me 		= this;
        var value   = cmb.getValue();
        var attr    = me.getView().down('cmbAttribute');
        attr.getStore().getProxy().setExtraParam('vendor',value);
        attr.getStore().load();   
    }  
});
