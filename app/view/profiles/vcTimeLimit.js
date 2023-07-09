Ext.define('RdMobile.view.profiles.vcTimeLimit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcTimeLimit',
    init    : function() {
        var me = this;
    },
    sldrToggleChange: function(sldr,value){
		var me 		= this;
		var main	= sldr.up('cntTimeLimit');
		var cnt     = main.down('#cntDetail');		 
		if(value){
		    cnt.show();     
		}else{
		    cnt.hide();
		}
	},
	rgrpDataResetChange : function(rgrp,valObj){
		var me 		    = this;
		var pnl    	    = rgrp.up('panel');
		if(valObj == 'top_up'){	
		    pnl.down('#pnlTimeTopUp').show();
		    pnl.down('#rgrpTimeCap').hide();
		    pnl.down('rdSliderTime').hide();
		    pnl.down('#chkTimeMac').hide();
		}else{
		    pnl.down('#pnlTimeTopUp').hide(); 
		    pnl.down('#rgrpTimeCap').show();
		    pnl.down('rdSliderTime').show();
		    pnl.down('#chkTimeMac').show();		
		}
	}
});
