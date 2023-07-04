Ext.define('RdMobile.view.profileComponents.vcProfileComponentEntryEdit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcProfileComponentEntryEdit',
    config	: {
        urlAdd     : '/cake4/rd_cake/profile-components/edit-comp.json',
    },
    control: {
    	'cmbVendor': {
            change	: 'cmbVendorChange'
        }
    },
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().dv.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Edit Profile Component Entry',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    },
    cmbVendorChange: function(cmb){
        var me 		= this;
        var value   = cmb.getValue();
        var attr    = me.getView().down('cmbAttribute');
        attr.getStore().getProxy().setExtraParam('vendor',value);
        attr.getStore().load();   
    }  
});
