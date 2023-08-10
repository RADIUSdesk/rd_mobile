// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.nas.vcNasEdit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcNasEdit',
    config : {
        urlView  : '/cake4/rd_cake/nas/view.json',
        urlEdit  : '/cake4/rd_cake/nas/edit.json'
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
    loadNas: function(){ 
        var me      = this;
        var nas_id  = me.getView().nas_id;
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {nas_id : nas_id},
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
