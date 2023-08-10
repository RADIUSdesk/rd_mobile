// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcNodeRadioDetail', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcNodeRadioDetail',
    control: {
    	'#chkMesh' : {
    		change : 'onChkMeshChange'
    	}
    },
    sldrToggleChange: function(sldr,value){
		var me 		    = this;
		var pnl    	    = sldr.up('panel');
		var cnt         = pnl.down('#cntDetail');
		var radio_nr    = pnl.radio_nr;
		var rad_dis     = pnl.down('#radio'+radio_nr+'_disabled');		 
		if(value){
			cnt.show();
			cnt.enable();
			rad_dis.setValue(false);    
		}else{
			cnt.hide();
			cnt.disable();
			rad_dis.setValue(true);	  
		}
	},
	sldrPowerChange: function(sldr,value){
        var me 		= this;
		var fc    	= sldr.up('container');
        fc.down('displayfield').setValue(value+'(dBm)');
    },
    onBandChange: function(band,value){
        var me      = this;   
        var pnl     = me.getView();
        
        if(value =='2g'){
	        pnl. setUi('panel-green');
		}	
		if(value =='5g'){
		    pnl.setUi('panel-blue');
		}	 
    },     
    onModeChange: function(mode){
        var me      = this;   
        var pnl     = mode.up('panel');//fs   
        var n_t		= pnl.down('#numRadioTwoChan');
		var n_v		= pnl.down('#numRadioFiveChan');
		var mesh    = pnl.down('#chkMesh');
		var band    = pnl.down('#band');
		var title   = "2.4GHz-N";
		
		if(mesh.getValue()){ //Hide channel selection if there is a mesh interface
		    n_t.hide();
		    n_t.disable();
		    n_v.hide();
		    n_v.disable();
		}else{
		    if(band.getValue() =='2g'){
		        n_t.show();
		        n_t.enable();
		        n_v.hide();
		        n_v.disable();
		    }else{
		        n_t.hide();
		        n_t.disable();
		        n_v.show();
		        n_v.enable();
		    }
        }
        pnl.down('#radio_width_80').hide();
        pnl.down('#radio_width_160').hide();
        
        if((band.getValue() == '2g')&&(mode.getValue()== 'ax')){
            title   = "2.4GHz-AX";
        }
        
        if((band.getValue() == '5g')&&(mode.getValue()== 'ac')){
            pnl.down('#radio_width_80').show();
            title   = "5GHz-AC";
        }
        if((band.getValue() == '5g')&&(mode.getValue()== 'ax')){
            pnl.down('#radio_width_80').show();
            pnl.down('#radio_width_160').show();
            title   = "5GHz-AX";
        }
        
        pnl.down('#rgrpWidth').show(); //Unhide it first
        
        if(mode.getValue()== 'g'){
            pnl.down('#rgrpWidth').hide();
            title   = "2.4GHz-G (Legacy)";
        }
        
        if(mode.getValue()== 'a'){
            pnl.down('#rgrpWidth').hide();
            title   = "5GHz-A (Legacy)";
        }
             
        pnl.setTitle(title);	
    },
    onChkMeshChange:function(chk,value){
        var me      = this;   
        var pnl     = chk.up('panel');
        var n_t		= pnl.down('#numRadioTwoChan');
		var n_v		= pnl.down('#numRadioFiveChan');
		var band    = pnl.down('#band');
		if(value == 'on'){ //FIXME there seems to be a bug causing a false trigger with the value set to 'on' before it is shown
			return;
		}
		if(value){ //Hide channel selection if there is a mesh interface
		    n_t.hide();
		    n_t.disable();
		    n_v.hide();
		    n_v.disable();
		}else{
		    if(band.getValue() =='2g'){
		        n_t.show()
		        n_t.enable();
		        n_v.hide();
		        n_v.disable();
		    }else{
		        n_t.hide();
		        n_t.disable();
		        n_v.show();
		        n_v.enable();
		    }
        }
    },
    OnChkIncludeBeaconIntervalChange : function(chk,value){
        var me = this;
        var w  = me.getView();
        var i  = w.down('#nfBeaconInterval');
        if(value){
            i.show();
            i.enable();
        }else{
            i.hide();
            i.disable();
        }  
    },
    OnChkIncludeDistanceChange : function(chk,value){
        var me = this;
        var w  = me.getView();
        var i  = w.down('#nfDistance');
        if(value){
            i.show();
            i.enable();
        }else{
            i.hide();
            i.disable();
        }  
    }  
});
