// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profiles.vcDataLimit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcDataLimit',
    init    : function() {
        var me = this;
    },
    sldrToggleChange: function(sldr,value){
		var me 		= this;
		var main	= sldr.up('cntDataLimit');
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
