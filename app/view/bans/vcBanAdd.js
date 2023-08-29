// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.bans.vcBanAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcBanAdd',
    config	: {
        urlAdd  : '/cake4/rd_cake/bans/add.json'
    }, 
    control: {  	
      	'#rgrpScope': {
    		change	: 'rgrpScopeChange',		
    	},
    	'#rgrpAction': {
    		change	: 'rgrpActionChange',		
    	}    	
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Adding Ban',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    },
    rgrpScopeChange : function( rgrp,value){
    
    	var me = this;
		var form 			= rgrp.up('formpanel');
		var cmbMesh 		= form.down('#mesh_id');
		var cmbApProfile 	= form.down('#ap_profile_id');
		
		if(value == 'cloud_wide'){
			cmbMesh.hide()
			cmbMesh.disable();
			cmbApProfile.hide();
			cmbApProfile.disable();		
		}
		
		if(value == 'ap_profile_only'){
			cmbMesh.hide();
			cmbMesh.disable();
			cmbApProfile.show();
			cmbApProfile.enable();				
		}
		
		if(value == 'mesh_only'){
			cmbMesh.show();
			cmbMesh.enable();
			cmbApProfile.hide();
			cmbApProfile.disable();				
		}   
    },
    rgrpActionChange : function( rgrp,value){
    	var form 	= rgrp.up('formpanel');
    	var bw_up 	= form.down('#bw_up');
    	var bw_down = form.down('#bw_down');
    	var cmb_fw  = form.down('cmbFirewallProfile');
    	if(value== 'block'){
    		bw_up.hide();
			bw_up.disable();
			bw_down.hide();
			bw_down.disable();
			cmb_fw.hide();
			cmb_fw.disable();			 	
    	}
    	
    	if(value == 'limit'){
    		bw_up.show();
			bw_up.enable();
			bw_down.show();
			bw_down.enable();
			cmb_fw.hide();
			cmb_fw.disable();	
    	}
    	
    	if(value == 'firewall'){
    		bw_up.hide();
			bw_up.disable();
			bw_down.hide();
			bw_down.disable();
			cmb_fw.show();
			cmb_fw.enable();
    	}     	    
    }
});
