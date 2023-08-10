// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.dynamicClients.vcDynamicClientEditRealm', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcDynamicClientEditRealm',
    config : {
        urlView  : '/cake4/rd_cake/realms/view-realms-for-dynamic-client.json',
        urlEdit  : '/cake4/rd_cake/realms/edit-realms-for-dynamic-client.json'
    },
    control : {
    	'#chkAvailableToAll' : {
    		change	: 'chkAvailableToAllChange'
    	}    	
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().grid.getStore();  
    	console.log("Save");  	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEdit(),
                waitMsg				: 'Edit RADIUS Client',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}else{
    		console.log("Form does not validate");
    	}
    },
    loadDynamicClientRealm : function(){ 
        var me          = this;
        var dynamic_client_id  = me.getView().dynamic_client_id;
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {dynamic_client_id : dynamic_client_id},
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
    chkAvailableToAllChange : function(chk,value){
        var me      = this;     
        var cnt     = chk.up('container');
        var realms  = cnt.down('cmbRealm');     
        if(value == true){
            realms.disable();
        }else{
            realms.enable();
        }
    }
});
