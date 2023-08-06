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
	radioCountChange: function(count){
      
        var me 		= this;
        var form    = me.getView();
        if(count == undefined){ //If not specified or empty
            count = 0;
        }
        
        //form.down('#cmbInternetConnection').setDisabled(false);  
      
        if(count == 0){     
             form.down('#pnlRadioR0').hide();
             form.down('#pnlRadioR0').disable()
             form.down('#pnlRadioR1').hide();
             form.down('#pnlRadioR1').disable()
             form.down('#pnlRadioR2').hide();
             form.down('#pnlRadioR2').disable()
        }
        
        if(count == 1){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').enable()      
            form.down('#pnlRadioR1').hide();
            form.down('#pnlRadioR1').disable();
            form.down('#pnlRadioR2').hide();
            form.down('#pnlRadioR2').disable();                
        }
        
        if(count == 2){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').enable(); 
            form.down('#pnlRadioR1').show();
            form.down('#pnlRadioR1').enable(); 
            form.down('#pnlRadioR2').hide();
            form.down('#pnlRadioR2').disable();       
        }
        
        if(count == 3){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').enable();
            form.down('#pnlRadioR1').show();
            form.down('#pnlRadioR1').enable()
            form.down('#pnlRadioR2').show();
            form.down('#pnlRadioR2').enable();     
        }      
    },    
});
