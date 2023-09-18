// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

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
        '#chk_auto_nasid': {
            change: 'chkAutoNasidChange'
        },
       	'#chkHotspot2' : {
        	change: 'chkHotspot2Change'
        },
        '#chkFastRoaming' : {
        	change: 'chkFastRoamingChange'
        },
        '#chkFtNasid' : {
        	change: 'chkFtNasidChange'
        }
    },
    onSubmit : function(btn){   
    	var me 		= this;
    	var store 	= me.getView().grid.getStore();
    	var url		= me.getView().submitUrl;  	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : url,
                waitMsg				: 'Add MESH Entry',
                success: function(form, result) {
            	    form.close();
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
        var hs2		= form.down('#chkHotspot2');
        
        var	chkFr	= form.down('#chkFastRoaming');
        var	pnlFr	= form.down('#pnlFastRoaming');
        var	chkFrNid= form.down('#chkFtNasid');
        var	txtFrNid= form.down('#txtFtNasid');

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
            
            chkFr.hide();
            chkFr.disable();
            pnlFr.hide();
            pnlFr.disable();  
             
        }
               
        if((val == 'wpa')|(val == 'wpa2')|(val == 'ppsk')|(val == 'psk')|(val =='psk2')){        
        	if(chkFr.getValue()){
        		pnlFr.show();
            	pnlFr.enable();
            }      
        	chkFr.show();
            chkFr.enable();            
                    
            //Sub set
            if((val == 'wpa')|(val == 'wpa2')|(val == 'ppsk')){    
		    	chkFrNid.hide();
		    	chkFrNid.disable();
		    	txtFrNid.hide();
		    	txtFrNid.disable();		    	             
		    }else{
		    	chkFrNid.show();
		    	chkFrNid.enable();
		    	console.log(chkFrNid.getValue());
		    	if(chkFrNid.getValue()){
		    		txtFrNid.hide();
		    		txtFrNid.disable();
		    	}else{
		    		txtFrNid.show();
		    		txtFrNid.enable();
		    	}	
		    }                                      
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
    chkAutoNasidChange: function(chk){
        var me      = this;
        var form    = chk.up('formpanel');
        var nasid   = form.down('#nasid');
        var acct    = form.down('#chk_accounting');
        var enc     =  form.down('cmbEncryptionOptions').getValue();
        if((enc == 'wpa')|(enc == 'wpa2')|(enc == 'ppsk')){
            if(acct){
                if(chk.getValue()){
                    nasid.setVisible(false);
                    nasid.setDisabled(true);  
                }else{
                    nasid.setVisible(true);
                    nasid.setDisabled(false);
                }  
            }
        }else{
            nasid.setVisible(false);
            nasid.setDisabled(true);
        }
    },
    chkHotspot2Change: function(chk, value){
    	var me 		= this;
    	var form	= chk.up('form');
    	//FIXME We will eventually have a combo-box with Hotspot2.0 Profiles to choose from
    },
    chkFastRoamingChange : function(chk, value){
    	var me 		= this;
    	var form	= chk.up('formpanel');
    	var	pnlFr	= form.down('#pnlFastRoaming');    	
    	if(value){
    		pnlFr.show();
        	pnlFr.enable();
        }else{      
        	pnlFr.hide();
        	pnlFr.disable();
      	}    
    },
    chkFtNasidChange : function(chk, value){
    	var me 		= this;
    	
    	console.log(value);
    	
    	var form	= chk.up('formpanel');
    	var	txtFrNid= form.down('#txtFtNasid');
    	if(value){
    		txtFrNid.hide();
    		txtFrNid.disable();  	
    	}else{   	
    		txtFrNid.show();
    		txtFrNid.enable();   	
    	}  
    } 
});
