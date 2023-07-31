Ext.define('RdMobile.view.components.vcWifiExitPoint', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcWifiExitPoint',
   	config	: {
        urlAdd  : '/cake4/rd_cake/realms/add.json'
    },
   	onBack : function(btn){
    	var me = this;
    	me.getView().up('frmWifiExitPointAdd').setActiveItem(0);   
    },
    onChkApplyFirewallProfileChange: function(chk,new_value){
		var me 		= this;
		var form    = chk.up('formpanel');
		var fw_prof = form.down('cmbFirewallProfile');
		if(new_value){
		    fw_prof.enable();		   
		}else{
		    fw_prof.disable();
		}
	},   
    onSubmit : function(btn){   
    	var me 	= this;
    	var store = me.getView().grid.getStore();    	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getView().submitUrl, //We pass the url to the component when creating it 
                waitMsg				: 'Adding Realm',
                success: function(form, result) {
            	    me.getView().toClose.close();
            	    store.reload();        
                },
                failure: function(form, result) {
                
            
                }
            });    	
    	}
    }
});
