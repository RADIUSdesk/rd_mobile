Ext.define('RdMobile.view.components.vcHardwareAddAction', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcHardwareAddAction',
    config 	: {
        urlNodeAdd  : '/cake4/rd_cake/node-actions/add.json',
        urlApAdd    : '/cake4/rd_cake/ap-actions/add.json'
    },
    control: {
    	'#rgpAction' : {
    		change	:  'rgrpChange'  		
    	}
    },
    onSubmit : function(btn){   
    	var me 		= this;   	
    	var url = me.getUrlApAdd();
    	if(me.getView().hw_type == 'node'){
    		url = me.getUrlNodeAdd();
    	}  	
    	
    	var store 	= me.getView().grid.getStore();  	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : url,
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
    rgrpChange: function(grp,value){
        var me = this;
       if(value == 'predefined_command'){
            me.getView().down('cmbPredefinedCommand').enable();
            me.getView().down('cmbPredefinedCommand').show();
            me.getView().down('#txtCommand').disable();
            me.getView().down('#txtCommand').hide();         
        }
        if((value == 'execute')||(value == 'execute_and_reply')){
            me.getView().down('cmbPredefinedCommand').disable();
            me.getView().down('cmbPredefinedCommand').hide();
            me.getView().down('#txtCommand').enable();
            me.getView().down('#txtCommand').show();      
        }
    }
});
