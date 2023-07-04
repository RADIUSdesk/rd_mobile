Ext.define('RdMobile.view.profiles.vcDataLimit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcDataLimit',
    init    : function() {
        var me = this;
    },
    sldrToggleChange: function(sldr){
		var me 		= this;
		var main	= sldr.up('cntDataLimit');
		var cnt     = main.down('#cntDetail');		
        var value  	= sldr.getValue();     
		if(value == 0){
		    cnt.hide();     
		}else{
		    cnt.show();
		}
	},
	rgrpDataResetChange: function(rgrp,valObj){
		var me 		    = this;
		var pnl    	    = rgrp.up('panel');
		if(valObj.data_reset == 'top_up'){	
		    pnl.down('#pnlDataTopUp').show();
		    pnl.down('#rgrpDataCap').hide();
		    pnl.down('rdSliderData').hide();
		    pnl.down('#chkDataMac').hide();
		}else{
		    pnl.down('#pnlDataTopUp').hide(); 
		    pnl.down('#rgrpDataCap').show();
		    pnl.down('rdSliderData').show();
		    pnl.down('#chkDataMac').show();		
		}
	}
});
