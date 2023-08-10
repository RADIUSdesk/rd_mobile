// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.dynamicClients.vcDynamicClientEdit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcDynamicClientEdit',
    config : {
        urlView  : '/cake4/rd_cake/dynamic-clients/view.json',
        urlEdit  : '/cake4/rd_cake/dynamic-clients/edit.json'
    },
    control : {
    	'#chkSessionAutoClose': {
            change:     'chkSessionAutoCloseChange'
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
    loadDynamicClient: function(){ 
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
    onCmbNasTypesChange : function(cmb,value){
        var me      = this;
        var form    = cmb.up('formpanel');
        var cnt     = form.down('#cntMikrotik');
        var cntPsk  = form.down('#cntPrivatePsk');       
            
        //MT
        var mt_host 	= form.down('#mt_host');
        var mt_user 	= form.down('#mt_user');
        var mt_pass 	= form.down('#mt_pass');
        
        //PSK
        var default_key = form.down('#default_key');
                 
        if(value == 'Mikrotik-API'){
        	cnt.show();
        	cntPsk.hide();
            mt_host.enable();
        	mt_user.enable();
        	mt_pass.enable();
        	default_key.disable();
        }else if(value == 'private_psk'){
        	cntPsk.show();
        	cnt.hide();
        	mt_host.disable();
        	mt_user.disable();
        	mt_pass.disable();
        	default_key.enable();   
        }else{
        	cnt.hide();
        	cntPsk.hide();
        	mt_host.disable();
        	mt_user.disable();
        	mt_pass.disable();
        	default_key.disable();  
        }
    },
    chkSessionAutoCloseChange : function(chk,value){
        var me      = this;     
        var cnt     = chk.up('container');
        var nr      = cnt.down('#nrSessionDeadTime');     
        if(value == true){
            nr.enable();
        }else{
            nr.disable();
        }
    }
});
