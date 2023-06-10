Ext.define('RdMobile.view.vouchers.vcVouchers', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcVouchers',
    config: {
        urlAdd              : '/cake4/rd_cake/vouchers/add.json',
        urlDelete           : '/cake4/rd_cake/vouchers/delete.json',
        urlBulkDelete       : '/cake4/rd_cake/vouchers/bulk-delete.json',
        urlViewBasic        : '/cake4/rd_cake/vouchers/view-basic-info.json',
        urlEditBasic        : '/cake4/rd_cake/vouchers/edit_basic_info.json'
    },
    control: {
        'gridVouchers': {
            childtap: 'onGridChildTap'
        },
        '#activate_on_login': {
        	change:  'chkActivateOnLoginChange'
        },
        '#never_expire' : {
        	change: 'chkNeverExpireChange'
      	},
      	'#quantity' : {
        	change: 'quantityChange'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	}      	
    },
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridVouchers').getStore().reload();  
    },
    btnFabTap : function(){
    	var me = this;
    	var w = Ext.widget('frmVoucherAdd',{});
        w.show(); 
    },
    onGridChildTap : function(a,b,c){
    	var me 			= this;
    	var grid 		= me.getView().down('gridVouchers');
    	var selections 	= grid.getSelections();
    	var sel  		= selections.pop();    	
    	if(sel){
    		me.getView().down('#asMenu').show();
    	}  	    	  	 
    },
    onSubmit : function(btn){
    
    	var me = this;
    	
    	if(btn.up('formpanel').validate()){
    	
    		btn.up('formpanel').submit({
            clientValidation    : true,
            url                 : me.getUrlAdd(),
            waitMsg				: 'Lekker Man',
            success: function(form, result) {
            	form.close();
            	me.reload();            
            },
            failure: function(form, result) {
            
            }
            })
    	
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
    },

});
