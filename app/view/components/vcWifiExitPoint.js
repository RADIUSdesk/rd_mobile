Ext.define('RdMobile.view.components.vcWifiExitPoint', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcWifiExitPoint',
    config : {
        urlAdd  : '/cake4/rd_cake/meshes/add.json'
    },
    control: {
      //  'cmbEncryptionOptions': {
      //      change: 'cmbEncryptionChange'
      //  },
    
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
    onNext : function(btn){
    	var me = this;
    	console.log("Next Tapped");
    	var exit_type = me.getView().down('#rgrpExitType').getValue();
    	me.setDataGui(exit_type);
    	me.getView().setActiveItem(1);
    },
    onBack : function(btn){
    	var me = this;
    	me.getView().setActiveItem(0);   
    },
    setDataGui: function(exit_type){
    
    	var me = this;
    
    	var common = [   
    		{
				xtype	: 'label',
				html	: 'Common Settings',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
		    {
                itemId  : 'id',
                xtype   : 'textfield',
                name    : 'id',
                hidden  : true
            }, 
            {
                itemId  : 'ap_profile_id',
                xtype   : 'textfield',
                name    : "ap_profile_id",
                hidden  : true,
                value   : me.apProfileId
            },
            {
                itemId  : 'mesh_id',
                xtype   : 'textfield',
                name    : "mesh_id",
                hidden  : true,
                value   : me.meshId
            }, 
            {
                xtype       : 'textfield',
                label  		: 'SSID',
                name        : 'name',
                required	: true,
				errorTarget : 'under'
            }  
    	];
    	
    	me.getView().down('#scrnData').setItems(common);
    
    }
});
