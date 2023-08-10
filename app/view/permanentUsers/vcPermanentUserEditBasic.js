// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.permanentUsers.vcPermanentUserEditBasic', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPermanentUserEditBasic',
    config: {
        urlViewBasic  	: '/cake4/rd_cake/permanent-users/view-basic-info.json',
        urlEditBasic   	: '/cake4/rd_cake/permanent-users/edit-basic-info.json'
    },
    control: {
    	'frmPermanentUserEditBasic'	: {
    		show : 'show'
    	},
        '#always_active' : {
        	change: 'chkAlwaysActiveChange'
      	}	
    },
    show	: function(){
    	var me = this;
    	console.log("Show Edit");
    	console.log(me.getView().user_id);  	
    	Ext.Ajax.request({
			url		: me.getUrlViewBasic(),
			method	: 'get',
		  	params	: {
		    	user_id : me.getView().user_id
		  	},
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
    onSubmit : function(btn){   
    	var me 		= this; 
    	var store 	= me.getView().grid.getStore();   	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEditBasic(),
                waitMsg				: 'Saving Data',
                success: function(form, result) {
            	    form.close();
            	    store.reload();         
                },
                failure: function(form, result) {
            
                }
            });    	
    	}
    },
    chkAlwaysActiveChange : function(chk,value){
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
