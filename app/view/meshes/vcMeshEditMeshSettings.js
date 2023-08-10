// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcMeshEditMeshSettings', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshEditMeshSettings',
    config : {
        urlView  	: '/cake4/rd_cake/meshes/mesh-settings-view.json',
        urlEdit  	: '/cake4/rd_cake/meshes/mesh-settings-edit.json'
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
