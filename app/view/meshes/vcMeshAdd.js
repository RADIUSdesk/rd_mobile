// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcMeshAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshAdd',
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
    }
});
