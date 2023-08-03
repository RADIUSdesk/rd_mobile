Ext.define('RdMobile.view.meshes.vcMeshEditNodeSettings', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshEditNodeSettings',
    config : {
        urlView  	: '/cake4/rd_cake/meshes/node-common-settings-view.json',
        urlEdit  	: '/cake4/rd_cake/meshes/node-common-settings-edit.json'
    },
    chkEthBrChange : function(chk,value){
 		var me 	= this;
 		var form = chk.up('formpanel');
 		cmb	= form.down('cmbEthBridgeOptions');
 		if(value){
 			cmb.enable(); 		
 		}else{
 			cmb.disable();
 		}
 	},
 	chkEnableSchedulesChange : function(chk,value){
 		var me 	= this;
 		var form = chk.up('formpanel');
 		cmb	= form.down('cmbSchedule');
 		if(value){
 			cmb.enable(); 		
 		}else{
 			cmb.disable();
 		}
 	},
 	rgrpVlanChange: function( rgrp,newValue, oldValue, eOpts){
    
        var me     = this;
        var val    = newValue;
        var w      = me.getView();
        var start  = w.down('#vlan_start');
        var end    = w.down('#vlan_end');
        var list   = w.down('#vlan_list');
        if(val == 'range'){
            start.show();
            start.enable();
            end.show();
            end.enable();
            list.hide();
            list.disable();
        }
        if(val == 'list'){
            start.hide();
            start.disable();
            end.hide();
            end.disable();
            list.show();
            list.enable();
        }      
    },
    OnChkVlanEnableChange : function(chk,value){
        var me = this;
        var w  = me.getView();
        var r  = w.down('#rgrpVlanRangeOrList');
        var range	= w.down('#rdRange');
        var l		= w.down('#rdList');
        var start  	= w.down('#vlan_start');
        var end    	= w.down('#vlan_end');
        var list   	= w.down('#vlan_list');
        var rgrp   	= w.down('#rgrpVlanRangeOrList');
        rgrpVal    	= rgrp.getValue();
        if(value){
           // r.setVisible(true);
            if(rgrpVal['vlan_range_or_list'] == 'range'){
                start.show();
                start.enable();
                end.show();
                enad.enable();
                list.hide();
                list.disable();
            }
            if(rgrpVal['vlan_range_or_list'] == 'list'){
                start.hide();
                start.disable();
                end.hide();
                end.disable();
                list.show();
                list.enable();
            }
            r.enable();
            l.enable();
            range.enable();            
        }else{
            r.disable();
            l.disable();
            range.disable();
            start.disable()
            end.disable();
            list.disable();
        } 
    },
    loadNodeSettings : function(){
    	var me    	= this;
        var mesh_id = me.getView().meshId;
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {mesh_id : mesh_id},
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
    	var me 	= this; 
    	console.log("Save");  	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEdit(),
                waitMsg				: 'Edit MESH Node Settings',
                success: function(form, result) {
            	    form.close();    
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}else{
    		console.log("Form does not validate");
    	}
    }
});
