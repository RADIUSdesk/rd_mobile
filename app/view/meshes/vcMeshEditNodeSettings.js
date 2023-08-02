Ext.define('RdMobile.view.meshes.vcMeshEditNodeSettings', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshEditNodeSettings',
    config : {
        urlAdd  : '/cake4/rd_cake/meshes/add.json'
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
    }
});
