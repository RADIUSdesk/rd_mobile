Ext.define('RdMobile.view.devices.vcDeviceEdit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcDeviceEdit',
    config: {
        urlViewBasic  	: '/cake4/rd_cake/devices/view-basic-info.json',
        urlEditBasic   	: '/cake4/rd_cake/devices/edit-basic-info.json'
    },
    control: {
    	'frmDeviceEdit'	: {
    		show : 'show'
    	},
        '#never_expire' : {
        	change: 'chkNeverExpireChange'
      	}	
    },
    show	: function(){
    	var me 		= this;
    	var	cmbUser	= me.getView().down('cmbPermanentUser');   	  	  	
    	Ext.Ajax.request({
			url		: me.getUrlViewBasic(),
			method	: 'get',
		  	params	: {
		    	device_id : me.getView().device_id
		  	},
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    var rec	= Ext.create('RdMobile.model.mPermanentUser', {username: jsonData.data.permanent_user_username, id: jsonData.data.permanent_user_id});
        			cmbUser.getStore().loadData([rec],false);
        			me.getView().setValues(jsonData.data);      			      
        		}
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});   
    },
    onSubmit : function(btn){   
    	var me = this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlEditBasic(),
                waitMsg				: 'Lekker Man',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
            
                }
            });    	
    	}
    },
    chkNeverExpireChange: function(chk,value){
        var me      = this;
        var form    = chk.up('formpanel');
        var f    	= form.down('#from_date');
        var t		= form.down('#to_date');
        if(value){
            f.setDisabled(true); 
            f.setHidden(true); 
            t.setDisabled(true); 
            t.setHidden(true);               
        }else{
            f.setDisabled(false);
            f.setHidden(false);
            t.setDisabled(false);
            t.setHidden(false);
        }
    }
});
