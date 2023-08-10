// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.vcWifiExitPoint', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcWifiExitPoint',
    control: {
    	'#chkNasClient' : {
    		change	: 'chkNasClientChange',
    	},
    	'#chkLoginPage' : {
    		change	: 'chkLoginPageChange',
    	}
    },
   	onBack : function(btn){
    	var me = this;
    	me.getView().up('frmWifiExitPointAdd').setActiveItem(0);   
    },
    onChkApplyFirewallProfileChange: function(chk,new_value){
		var me 		= this;
		var form    = chk.up('formpanel');
		var fw_prof = form.down('cmbFirewallProfile');
		if(new_value){
		    fw_prof.enable();		   
		}else{
		    fw_prof.disable();
		}
	},   
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getView().submitUrl, //We pass the url to the component when creating it 
                waitMsg				: 'Adding Realm',
                success: function(form, result) {
            	    me.getView().toClose.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    },
    onRgrpNatDhpcConfigChange : function(grp,value){
	    var me          = this; 
	    var pnl         = grp.up('formpanel');
        var dhcpDetail  = pnl.down('#pnlNatDhcpDetail'); 
        if(value == 'manual'){ 
            dhcpDetail.show();
            dhcpDetail.enable();                    
        }else{
            dhcpDetail.hide();
            dhcpDetail.disable();                       
        }
	},
	onChkNatIgnoreChange : function(chk, value){
	    var me      = this;
	    var pnl     = chk.up('panel');    
	    if(value){
	    	pnl.down('#nmbrStart').disable();
        	pnl.down('#nmbrEnd').disable();          
        	pnl.down('#nmbrLease').disable();
        	pnl.down('#txtNatDns1').disable();
        	pnl.down('#txtNatDns2').disable();	    	    
	    }else{
	    	pnl.down('#nmbrStart').enable();
        	pnl.down('#nmbrEnd').enable();          
        	pnl.down('#nmbrLease').enable();
        	pnl.down('#txtNatDns1').enable();
        	pnl.down('#txtNatDns2').enable();
	    
	    }
	},
	onChkDnsOverrideChange : function(chk,value){
		var me 		= this;
		var form    = chk.up('formpanel');
		var d1      = form.down('#txtDns1');
		var d2      = form.down('#txtDns2');
		if(value){
		    d1.enable();
		    d2.enable();
		}else{
		    d1.disable();
		    d2.disable();
		}
	},
	chkNasClientChange : function(chk,value){
		var me 		= this;
		var form    = chk.up('formpanel');
		if(value){
			form.down('#cmbRealm').enable();
		}else{
			form.down('#cmbRealm').disable();
		}	
	},
	chkLoginPageChange : function(chk,value){
		var me 		= this;
		var form    = chk.up('formpanel');
		if(value){
			form.down('#cmbDynamicDetail').enable();
		}else{
			form.down('#cmbDynamicDetail').disable();
		}	
	},
	onRgrpL3ConfigChange : function(grp,value){
		var me = this;
		var pnl    	= grp.up('formpanel');
        var pnlL3  	= pnl.down('#pnlL3Detail'); 
        if(value == 'static'){ 
            pnlL3.show();
            pnlL3.enable();
            pnl.down('#txtIpaddr').enable(); 
            pnl.down('#txtNetmask').enable();
            pnl.down('#txtGateway').enable();                    
        }else{
            pnlL3.hide();
            pnlL3.disable();
            pnl.down('#txtIpaddr').disable();
            pnl.down('#txtNetmask').disable();
            pnl.down('#txtGateway').disable();                      
        }	
	}
});
