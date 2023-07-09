Ext.define('RdMobile.view.profiles.vcPppoe', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPppoe',
    init    : function() {
        var me = this;
    },
    control: {
        '#chkBurstEnable' : {
            change : 'onChkBurstEnableChange'
        }
    },
    sldrToggleChange: function(sldr,value){
		var me 		= this;
		var main	= sldr.up('cntPppoe');
		var cnt     = main.down('#cntDetail');		 
		if(value){
		    cnt.show();     
		}else{
		    cnt.hide();
		}
	},
    sldrToggleChangeZZ: function(sldr){
		var me 		    = this;
		var pnl    	    = sldr.up('panel');
		var cnt         = pnl.down('#cntDetail');
        var pnlSettings = sldr.up('#pnlFupSettings');
        var components  = pnlSettings.down('#pnlFupComponents'); 

        var value       = sldr.getValue();     
		if(value == 0){
		    cnt.hide();
            components.disable();
		}else{
		    cnt.show();
            components.enable();
		}
	},
    onChkBurstEnableChange : function(chk,value){
        var me      = this;
        var form    = chk.up('formpanel');
        if(value){
            form.down('#nrFupBurstLimit').enable();
            form.down('#nrFupBurstTime').enable();
            form.down('#nrFupBurstThreshold').enable();       
        }else{
            form.down('#nrFupBurstLimit').disable();
            form.down('#nrFupBurstTime').disable();
            form.down('#nrFupBurstThreshold').disable();    
        }
    }
});
