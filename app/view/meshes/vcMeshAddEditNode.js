Ext.define('RdMobile.view.meshes.vcMeshAddEditNode', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshAddEditNode',
    config: {
        urlAdd	: '/cake4/rd_cake/meshes/mesh-node-add.json',
        urlView	: '/cake4/rd_cake/meshes/mesh-node-view.json',
        urlEdit	: '/cake4/rd_cake/meshes/mesh-node-edit.json',
        urlAdvancedSettingsForModel : '/cake4/rd_cake/meshes/advanced_settings_for_model.json',
    },
    control: {
    	'cmbHardwareOptions' : {
    		 change : 'onCmbHardwareOptionsChange'
    	}
    },
    onSubmit : function(btn){   
    	var me 		= this;
    	var store 	= me.getView().grid.getStore();  	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Add MESH Node',
                success: function(form, result) {
                	console.log(form.down('#chkMultiple').isChecked);
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
    onCmbInternetConnectionChange: function(cmb,value){
        var me              = this;
        var form            = cmb.up('formpanel');
        var cntWbW          = form.down('#cntWbW');
        var pnlWanStatic    = form.down('#pnlWanStatic');
        var pnlWanPppoe     = form.down('#pnlWanPppoe');
        var pnlWifiStatic   = form.down('#pnlWifiStatic');
        var pnlWifiPppoe    = form.down('#pnlWifiPppoe');
        var pnlQmi          = form.down('#pnlQmi');
              
        if(value == 'wifi'){
            cntWbW.show();
            cntWbW.enable(); 
        }else{
            cntWbW.hide();
            cntWbW.disable();    
        }
        
        if(value == 'wan_static'){
            pnlWanStatic.setHidden(false);
            pnlWanStatic.setDisabled(false);   
        }else{
            pnlWanStatic.setHidden(true);
            pnlWanStatic.setDisabled(true);
        }

        if(value== 'wan_pppoe'){
            pnlWanPppoe.setHidden(false);
            pnlWanPppoe.setDisabled(false);   
        }else{
            pnlWanPppoe.setHidden(true);
            pnlWanPppoe.setDisabled(true);
        }
        
        if(value == 'wifi_static'){
            pnlWifiStatic.setHidden(false);
            pnlWifiStatic.setDisabled(false);   
        }else{
            pnlWifiStatic.setHidden(true);
            pnlWifiStatic.setDisabled(true);
        } 
        
        if(value == 'wifi_pppoe'){
            pnlWifiPppoe.setHidden(false);
            pnlWifiPppoe.setDisabled(false);   
        }else{
            pnlWifiPppoe.setHidden(true);
            pnlWifiPppoe.setDisabled(true);
        }
        
	  	if(value == 'qmi'){
            pnlQmi.setHidden(false);
            pnlQmi.setDisabled(false);   
        }else{
            pnlQmi.setHidden(true);
            pnlQmi.setDisabled(true);
        }           
    }, 
    onCmbEncryptionOptionsChangeWbw : function(cmb,value){
        var me      = this;
        var form    = cmb.up('formpanel');
        if(value == 'none'){
            form.down('#wbw_key').hide();
            form.down('#wbw_key').disable(); 
        }else{
            form.down('#wbw_key').show();
            form.down('#wbw_key').enable();  
        }
    },
    onCmbEncryptionOptionsChangeStatic : function(cmb,value){
        var me      = this;
        var form    = cmb.up('formpanel');
        if(value == 'none'){
            form.down('#wifi_static_key').hide();
            form.down('#wifi_static_key').disable();  
        }else{
            form.down('#wifi_static_key').show();
            form.down('#wifi_static_key').enable();  
        }
    },
    onCmbEncryptionOptionsChangePppoe : function(cmb,value){
        var me      = this;
        var form    = cmb.up('formpanel');
        if(value == 'none'){
            form.down('#wifi_pppoe_key').hide();
            form.down('#wifi_pppoe_key').disable();  
        }else{
            form.down('#wifi_pppoe_key').show();
            form.down('#wifi_pppoe_key').enable();  
        }
    },  
    onCmbHardwareOptionsChange: function(cmb,val){
     
		var me      = this;
        var form    = cmb.up('formpanel');        
        var r_count = 1;  
        var record  = cmb.getSelection();
        if(record != null){
            r_count =record.get('radios');
        }
        
        if(form.nodeId == 0){
            var params  = {model:val};
        }else{
            var params  = {model:val,node_id:form.nodeId};
        }  
        //Load the advanced settings for this hardware...       
         Ext.Ajax.request({
		 	url     : me.getUrlAdvancedSettingsForModel(), 
            method  : 'GET',
            params  : params,
		  	success: function(response) {		  	
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    me.getView().setValues(jsonData.data);
				    var w  = me.getView();
		            me.radioCountChange(jsonData.data.radio_count);               
		            var i;
		            var n = jsonData.data.radio_count;
		            for (i = 0; i < n; i++) {
		                if(jsonData.data['radio'+i+'_disabled']){
			                w.down('#radio'+i+'_enabled').setValue(false);
			            }else{
			                w.down('#radio'+i+'_enabled').setValue(true);
			            }    
		            }		            
		            return true;				       
		    	}		  		
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});         
	},
	loadBasicSettings: function(form){
        var me      = this;         
        if(me.getView().action == 'edit'){ //Only Edit needs to load data       
		    	Ext.Ajax.request({
			 	url     : me.getUrlView(), 
		        method  : 'GET',
		        params  : {'node_id': me.getView().node_id},
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
        }  
    },
	radioCountChange: function(count){
      
        var me 		= this;
        var form    = me.getView();
        if(count == undefined){ //If not specified or empty
            count = 0;
        }
        
        form.down('#cmbInternetConnection').enable();
      
        if(count == 0){     
             form.down('#pnlRadioR0').hide();
             form.down('#pnlRadioR0').disable()
             form.down('#pnlRadioR1').hide();
             form.down('#pnlRadioR1').disable()
             form.down('#pnlRadioR2').hide();
             form.down('#pnlRadioR2').disable()
             
            //Hide the whole option of selecting wbw
            form.down('#cmbInternetConnection').setValue('auto_detect');//This should take care of hiding the wbw options
            form.down('#cmbInternetConnection').disable();          
             
        }
        
        if(count == 1){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').enable()      
            form.down('#pnlRadioR1').hide();
            form.down('#pnlRadioR1').disable();
            form.down('#pnlRadioR2').hide();
            form.down('#pnlRadioR2').disable();
            
            form.down('#wbw_radio_1').disable();
            form.down('#wbw_radio_1').hide(); 
            form.down('#wbw_radio_2').disable();
            form.down('#wbw_radio_2').hide(); 
            
            form.down('#wifi_static_radio_1').disable();
            form.down('#wifi_static_radio_1').hide(); 
            form.down('#wifi_static_radio_2').disable();
            form.down('#wifi_static_radio_2').hide(); 
            
            form.down('#wifi_pppoe_radio_1').disable();
            form.down('#wifi_pppoe_radio_1').hide(); 
            form.down('#wifi_pppoe_radio_2').disable()
            form.down('#wifi_pppoe_radio_2').hide(); 
            
            //Only one option thus hide it 
            form.down('#wifi_static_radio_0').setValue(true);  
            form.down('#wifi_pppoe_radio_0').setValue(true);     
            form.down('#rgrpWifiPppoeRadio').hide();
            form.down('#rgrpWifiStaticRadio').hide();       
            form.down('#wbw_radio_0').setValue(true);       
            form.down('#rgrpWbWradio').hide();    
                                     
        }
        
        if(count == 2){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').enable(); 
            form.down('#pnlRadioR1').show();
            form.down('#pnlRadioR1').enable(); 
            form.down('#pnlRadioR2').hide();
            form.down('#pnlRadioR2').disable(); 
            
             form.down('#wbw_radio_1').enable();
            form.down('#wbw_radio_1').show(); 
            form.down('#wbw_radio_2').disable();
            form.down('#wbw_radio_2').hide();
            
            form.down('#wifi_static_radio_1').enable();
            form.down('#wifi_static_radio_1').show(); 
            form.down('#wifi_static_radio_2').disable();
            form.down('#wifi_static_radio_2').hide();
            
            form.down('#wifi_pppoe_radio_1').enable();
            form.down('#wifi_pppoe_radio_1').show(); 
            form.down('#wifi_pppoe_radio_2').disable();
            form.down('#wifi_pppoe_radio_2').hide();
            
            form.down('#rgrpWbWradio').show();
            form.down('#rgrpWifiPppoeRadio').show();
            form.down('#rgrpWifiStaticRadio').show();            
        }
        
        if(count == 3){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').enable();
            form.down('#pnlRadioR1').show();
            form.down('#pnlRadioR1').enable()
            form.down('#pnlRadioR2').show();
            form.down('#pnlRadioR2').enable();
            
            form.down('#wbw_radio_1').enable();
            form.down('#wbw_radio_1').show(); 
            form.down('#wbw_radio_2').enable();
            form.down('#wbw_radio_2').show();
            
            form.down('#wifi_static_radio_1').enable();
            form.down('#wifi_static_radio_1').show(); 
            form.down('#wifi_static_radio_2').enable();
            form.down('#wifi_static_radio_2').show();
            
            form.down('#wifi_pppoe_radio_1').enable();
            form.down('#wifi_pppoe_radio_1').show(); 
            form.down('#wifi_pppoe_radio_2').enable();
            form.down('#wifi_pppoe_radio_2').show();
            
            form.down('#rgrpWbWradio').show();
            form.down('#rgrpWifiPppoeRadio').show();
            form.down('#rgrpWifiStaticRadio').show();      
                 
        }      
    },
    onCmbQmiOptionsChange: function(cmb,value){
        var me      = this;
        var form    = cmb.up('formpanel');
        if(value == 'none'){
            form.down('#qmi_username').hide();
            form.down('#qmi_username').disable(); 
            form.down('#qmi_password').hide();
            form.down('#qmi_password').disable();  
        }else{
            form.down('#qmi_username').show();
            form.down('#qmi_username').enable();  
            form.down('#qmi_password').show();
            form.down('#qmi_password').enable();
        }
    },
    chkEnableSchedulesChange : function(chk,value){
		var me 		= this;
		var form	= chk.up('formpanel');
		var cnt	    = form.down('#cntSchedule');
		if(value){
		    cnt.show();
            cnt.enable(); 
		}else{
			cnt.hide();
            cnt.disable(); 
		}
	}    
});
