Ext.define('RdMobile.view.components.vcWifiEntryPoint', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcWifiEntryPoint',
    config : {
        urlAdd  : '/cake4/rd_cake/meshes/add.json'
    },
    control: {
        'cmbEncryptionOptions': {
            change: 'cmbEncryptionChange'
        },
       /* '#chk_auto_nasid': {
            change: 'chkAutoNasidChange'
        },
        '#chk_maxassoc': {
            change: 'chkMaxassocChange'
        },
        'cmbMacFilter': {
            change: 'cmbMacFilterChange'
        },
        '#chk_schedule' : {
        	change: 'chkScheduleChange'
        }*/
    },
    onSubmit : function(btn){   
    	var me 		= this;
    	var store 	= me.getView().grid.getStore();  	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Add MESH Network',
                success: function(form, result) {
                	if(!form.down('#chkMultiple').isChecked){
            	    	form.close();
            	    }
            	    store.reload();        
                },
                failure: function(form,result ) {
                	form.setErrors(result.errors);          
                }
            });    	
    	}else{
    		console.log("Form does not validate");
    	}
    },
    cmbEncryptionChange: function(cmb){
        var me      = this;
        var form    = cmb.up('formpanel');
        var key     = form.down('#key');
        var srv     = form.down('#auth_server');
        var scrt    = form.down('#auth_secret'); 
        var nasid   = form.down('#nasid');
        var acct    = form.down('#chk_accounting');
        var auto    = form.down('#chk_auto_nasid');
        var d_vlan  = form.down('#default_vlan');
        var d_key   = form.down('#default_key');

        var val     = cmb.getValue();
        if(val == 'none'){
            key.hide();
            key.disable(); 
            srv.hide();
            srv.disable();
            scrt.hide();
            scrt.disable();
            nasid.hide();
            nasid.disable(); 
            acct.hide();
            acct.disable();  
            auto.hide();
            auto.disable();

            d_vlan.hide();
            d_vlan.disable();
            d_key.hide();
            d_key.disable(); 
        }

        if((val == 'wep')|(val == 'psk')|(val =='psk2')){
            key.show();
            key.enable(); 
            srv.hide();
            srv.disable();
            scrt.hide();
            scrt.disable();
            nasid.hide();
            nasid.disable(); 
            acct.hide();
            acct.disable();  
            auto.hide();
            auto.disable();

            d_vlan.hide();
            d_vlan.disable();
            d_key.hide();
            d_key.disable(); 
   
        }

        if((val == 'wpa')|(val == 'wpa2')){
            key.hide();
            key.disable(); 
            srv.show();
            srv.enable();
            scrt.show();
            scrt.enable();
            acct.show();
            acct.enable();  
            auto.show();
            auto.enable(); 
            if(auto.getValue()){
                nasid.hide();
                nasid.disable();  
            }else{
                nasid.show();
                nasid.enable();  
            }

            d_vlan.hide();
            d_vlan.disable();
            d_key.hide();
            d_key.disable(); 
    
        }

        if(val == 'ppsk'){
            key.hide();
            key.disable(); 
            srv.show();
            srv.enable();
            scrt.show();
            scrt.enable();
            acct.show();
            acct.enable();  
            auto.show();
            auto.enable(); 
            if(auto.getValue()){
                nasid.hide();
                nasid.disable(); 
            }else{
                nasid.show();
                nasid.enable(); 
            }
            
            d_vlan.show();
            d_vlan.enable();
            d_key.show();
            d_key.enable();   
        }
    },
});
