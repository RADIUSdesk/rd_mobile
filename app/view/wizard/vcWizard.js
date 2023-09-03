// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.wizard.vcWizard', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcWizard',
    config : {
        urlOneSubmit                : '/cake4/rd_cake/wizards/new-site-step-one.json',
        urlTwoSubmit                : '/cake4/rd_cake/wizards/new-site-step-two.json',
        urlViewDynamicDetail        : '/cake4/rd_cake/wizards/view-logo.json',
        urlLogoBase                 : '/cake4/rd_cake/img/dynamic_details/',
        urlUploadLogo               : '/cake4/rd_cake/wizards/upload-logo/',
        UrlPnlTwo                   : '/cake4/rd_cake/wizards/view-country-and-timezone.json',
        UrlChangeTheme              : '/cake4/rd_cake/wizards/change-theme.json',
        UrlPreviewMobile            : '/cake4/rd_cake/dynamic-details/preview-chilli-mobile',
        UrlPreviewDesktop           : '/cake4/rd_cake/dynamic-details/preview-chilli-desktop',
        urlCancel           		: '/cake4/rd_cake/wizards/cancel.json',
        urlUploadPhoto      		: '/cake4/rd_cake/wizards/upload-photo/',
        //These are placeholders that will be filled as the person goes through the wizard.
        //If they click the cancel button or close the window, we need to undo what has been done
        realmId			: undefined,
        dynamicDetailId	: undefined,
        stepOneDone		: false,
        lastStepDone	: false,
        stepOneName		: '',
    },
    control: {  	
      	'#scrnTwo': {
    		activate	: 'pnlTwoActivate',		
    	},
    	'#scrnThree': {
    		activate	: 'pnlThreeActivate',		
    	},
    	'frmWizard'	: {
    		destroy		: 'frmDestroy'
    	}
    },
    onTxtNameChange : function(t,value){
        var me  = this;
        var f   = t.up('formpanel');
        var g   = f.down('#ssid_guest');
        var w   = f.down('#ssid_wireless');
        var v   = value.trim();
        if(v == ''){
            g.setValue("Guest");
            w.setValue("Wireless");
        }else{
            g.setValue(v+" Guest");
            w.setValue(v+" Wireless");
        }       
    },
    onTxtNameBlur : function(component){   //We added this to prevent spaces leading and trailing spaces to kreep in and cause havoc
    	if(component.getValue()){
        	component.setValue(component.getValue().trim());
        }
    },
    onBtnOneNextClick: function(b){
        var me  = this;
        var f   = b.up('formpanel');        
        f.setMasked(true);    
        if(f.validate()){    	
    		f.submit({
                clientValidation    : true,
                url                 : me.getUrlOneSubmit(),
                waitMsg				: 'Add Items',
                success: function(form, result) {
                	me.setStepOneDone(true);
                	me.setStepOneName(me.getView().down('#txtName').getValue())
                	me.getView().setActiveItem(me.getView().getLayout().next()); //Zero based
                	f.setMasked(false);
       
                },
                failure: function(form,result ) {
                	form.setErrors(result.errors);
                	f.setMasked(false);          
                }
            });    	
    	}else{
    		console.log("Form does not validate");
    		f.setMasked(false);
    	}
    	f.setMasked(false);
    },
    pnlTwoActivate: function(pnl){
        var me      = this;
        Ext.Ajax.request({
			url		: me.getUrlPnlTwo(),
			method	: 'get',
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    pnl.setValues(jsonData.data);       
        		}
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});
    },
    onBtnTwoNextClick: function(b){
    
        var me  = this;
        var f   = b.up('formpanel');
        var n   = me.getView().down('#txtName');
        var name= n.getValue();
        
        var p   = me.getView().down('#txtPassword');
        var pwd = p.getValue();
        
        f.setMasked(true);
        
        if(f.validate()){  
		    f.submit({
		        clientValidation    : true,
		        url                 : me.getUrlTwoSubmit(),
		        params              : {name:name,password:pwd},
		        success: function(form, action) {
		            f.setMasked(false);                
		            me.getView().setActiveItem(me.getView().getLayout().next()); //Zero based
		        },
		         failure: function(form,result ) {
                	form.setErrors(result.errors);
                	f.setMasked(false);          
                }
		    });
		    
		}else{
    		console.log("Form does not validate");
    		f.setMasked(false);
    	}
    	f.setMasked(false);
    },
    pnlThreeActivate: function(pnl){
        var me  = this;  
        var n   = me.getView().down('#txtName');
        var name= n.getValue();

        var p_img   = pnl.down('#pnlImg');
        Ext.Ajax.request({
            url     : me.getUrlViewDynamicDetail(),
            method  : 'GET',
            params  : {name:name},
            success : function(response){
                var jsonData    = Ext.JSON.decode(response.responseText);
                if(jsonData.success){
                    var img_url = me.getUrlLogoBase()+jsonData.data.icon_file_name;
                    p_img.setData({image:img_url});
                }   
            },
            scope: me
        });
    },
    onBtnLogoSaveClick: function(button){
        var me      = this;
        var f    	= button.up('formpanel');
        var p_img   = me.getView().down('#pnlImg');    
        var n       = me.getView().down('#txtName');
        var name    = n.getValue();
        
        f.setMasked(true);
        if(f.validate()){     
		    f.submit({
		        clientValidation    : true,
		        waitMsg             : 'Uploading your photo...',
		        url                 : me.getUrlUploadLogo(),
		        params              : {name:name},
		        success: function(form, result) { 		        
            	    if(result.success){ 
		                var new_img = result.icon_file_name;    
		                var img_url = me.getUrlLogoBase()+new_img;
		                p_img.setData({image:img_url});
		                f.setMasked(false); 
		            }	           
		        },
		        failure: function(form,result ) {
                	form.setErrors(result.errors);
                	f.setMasked(false);          
                }
		    });
		}else{
    		console.log("Form does not validate");
    		f.setMasked(false);
    	}
    	f.setMasked(false);
    },
    onBtnThreeNextClick: function(b){
        var me  = this;
       	me.setLastStepDone(true);
       	
       	var l = Ext.ComponentQuery.query('#cmbMainCloud');
        var cmb = l[0];
        cmb.getStore().reload(); //load the latest list of clouds
      
       	me.getView().close();
    },
    onBtnCancelClick : function(b){
    	var me = this;
    	me.getView().close();  
    },
    frmDestroy : function(frm){
        var me = this; 
        if((me.getStepOneDone())&&(!(me.getLastStepDone()))){  
        	Ext.Msg.confirm("Confirmation", 'Remove items created in <b>step One</b>?', function(buttonId){    	
				if(buttonId == 'yes'){
                    var name    = me.getStepOneName();                 
                    Ext.Ajax.request({
                        url: me.getUrlCancel(),
                        method: 'POST',          
                        jsonData: {name: name},
                        success: function(batch,options){
                            consloe.log("Cleanup Cool");
                        }
                    });	
				}    	
			});   	
        
        }else{
            return true;
        }      
    }   
});
