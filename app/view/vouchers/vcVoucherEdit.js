Ext.define('RdMobile.view.vouchers.vcVoucherEdit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcVoucherEdit',
    config: {
        urlAdd  		: '/cake4/rd_cake/vouchers/add.json',
        urlViewBasic  	: '/cake4/rd_cake/vouchers/view-basic-info.json',
        urlEditBasic   	: '/cake4/rd_cake/vouchers/edit_basic_info.json'
    },
    control: {
    	'frmVoucherEdit'	: {
    		show : 'show'
    	},
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
    show	: function(){
    	var me = this;
    	console.log("Show Edit");
    	console.log(me.getView().voucher_id);  	
    	Ext.Ajax.request({
			url		: me.getUrlViewBasic(),
			method	: 'get',
		  	params	: {
		    	voucher_id : me.getView().voucher_id
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
