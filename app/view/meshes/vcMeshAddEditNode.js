Ext.define('RdMobile.view.meshes.vcMeshAddEditNode', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshAddEditNode',
    config: {
       	urlAdvancedSettingsForModel : '/cake4/rd_cake/meshes/advanced_settings_for_model.json',
        urlViewNode : '/cake4/rd_cake/meshes/mesh-node-view.json'
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
		  	success: function(a,b,c) {
		  		 var w  = me.getView();
                me.radioCountChange(b.result.data.radio_count);
                /*
                var i;
                var n = b.result.data.radio_count;
                for (i = 0; i < n; i++) {
                    if(b.result.data['radio'+i+'_disabled']){
	                    w.down('#radio'+i+'_enabled').setValue(0,0);
	                }else{
	                    w.down('#radio'+i+'_enabled').setValue(1,1);
	                }    
                }*/
                return true;
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
        
        form.down('#cmbInternetConnection').setDisabled(false);  
      
        if(count == 0){     
             form.down('#pnlRadioR0').hide();
             form.down('#pnlRadioR0').setDisabled(true);
             form.down('#pnlRadioR1').hide();
             form.down('#pnlRadioR1').setDisabled(true);
             form.down('#pnlRadioR2').hide();
             form.down('#pnlRadioR2').setDisabled(true);
        }
        
        if(count == 1){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').setDisabled(false);      
            form.down('#pnlRadioR1').hide();
            form.down('#pnlRadioR1').setDisabled(true);
            form.down('#pnlRadioR2').hide();
            form.down('#pnlRadioR2').setDisabled(true);                 
        }
        
        if(count == 2){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').setDisabled(false); 
            form.down('#pnlRadioR1').show();
            form.down('#pnlRadioR1').setDisabled(false); 
            form.down('#pnlRadioR2').hide();
            form.down('#pnlRadioR2').setDisabled(true);          
        }
        
        if(count == 3){
            form.down('#pnlRadioR0').show();
            form.down('#pnlRadioR0').setDisabled(false);
            form.down('#pnlRadioR1').show();
            form.down('#pnlRadioR1').setDisabled(false);
            form.down('#pnlRadioR2').show();
            form.down('#pnlRadioR2').setDisabled(false);      
        }      
    },    
});
