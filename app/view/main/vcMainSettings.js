// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.main.vcMainSettings', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainSettings',
    config	: {
        urlSettingsSubmit   : '/cake4/rd_cake/dashboard/settings_submit.json',
        urlViewSettings     : '/cake4/rd_cake/dashboard/settings_view.json',
    },
    onSubmit : function(btn){   
    	var me 	= this;	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlSettingsSubmit(),
                waitMsg				: 'Changing Password',
                success: function(form, result) {
            	    form.close();
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    },
    load : function(){    
        var me     	= this;
        var img     = me.getView().down('#imgWlLogo');
        Ext.Ajax.request({
			url		: me.getUrlViewSettings(),
			method	: 'get',
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    me.getView().setValues(jsonData.data);
				   	if(jsonData.data.wl_img != null){
		                img.setSrc(jsonData.data.wl_img);
		            }    
        		}
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});
    },
    onCmbCloudsChange: function(cmb,value){
        var me      = this;
        var pnl     = cmb.up('formpanel');
        var realm   = pnl.down('cmbRealm');
        realm.getStore().getProxy().setExtraParam('settings_cloud_id',value);
        realm.getStore().load();
        pnl.down('#txtChangedCloudId').setValue(cmb.getValue());
    },
    onOverviewsToIncludeSelect: function(tag){
		var me      = this;
		var form    = tag.up('formpanel');
		var realm   = form.down('cmbRealm');
		var s       = tag.getValue();
		if(Ext.Array.contains(s,'radius_overview')){
		    realm.show();
		    realm.enable();      
		}else{
		    realm.hide();
		    realm.disable();
		}
	},
	onChkWlActiveChange: function(chk){
        var me       = this;
        var pnl    = chk.up('formpanel');
         if(chk.getValue()){ 
         
            pnl.down('#txtWlHeader').disable();
            pnl.down('#clrWlHeaderBg').disable();
            pnl.down('#clrWlHeaderFg').disable(); 
            pnl.down('#txtWlFooter').disable(); 
            pnl.down('#chkWlImgActive').disable(); 
            pnl.down('#flWlImgFileUpload').disable();
          
         }else{
         
            pnl.down('#txtWlHeader').enable();
            pnl.down('#clrWlHeaderBg').enable();
            pnl.down('#clrWlHeaderFg').enable(); 
            pnl.down('#txtWlFooter').enable(); 
            pnl.down('#chkWlImgActive').enable(); 
            pnl.down('#flWlImgFileUpload').enable();
         }  
    },
    onChkWlImgActiveChange: function(chk){
        var me      = this;
        var pnl     = chk.up('formpanel');
        var value   = chk.getValue();
        if(value){   
            pnl.down('#flWlImgFileUpload').enable();       
        }else{
            pnl.down('#flWlImgFileUpload').disable();
        }
    },   
});
