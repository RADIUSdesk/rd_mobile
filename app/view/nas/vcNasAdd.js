Ext.define('RdMobile.view.nas.vcNasAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcNasAdd',
    config : {
        urlAdd  : '/cake4/rd_cake/nas/add.json'
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
                url                 : me.getUrlAdd(),
                waitMsg				: 'Add RADIUS Client',
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
