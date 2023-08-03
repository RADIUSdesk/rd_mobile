Ext.define('RdMobile.view.meshes.vcMeshEditGeneral', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshEditGeneral',
    config : {
        urlEdit  : '/cake4/rd_cake/meshes/mesh-general-edit.json',
        urlView : '/cake4/rd_cake/meshes/mesh-settings-view.json'
    },
    btnChangeGrouping : function(button){
    	var me 				= this;
    	var form           	= button.up('formpanel');
        var updateDisplay  	= form.down('#displTag');
        var updateValue   	= form.down('#hiddenTag');	
        var w 				= Ext.widget('pnlClouds',{updateDisplay:updateDisplay,updateValue:updateValue});
        w.show();  
    },
    loadMeshSettings : function(){
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
				    me.getView().down('#displTag').setHtml(jsonData.data.tag_path);       
        		}
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});  
    },
    onSubmit : function(btn){   
    	var me 		= this;
    	var store 	= me.getView().grid.getStore(); 
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEdit(),
                waitMsg				: 'Add MESH Network',
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
    }
});
