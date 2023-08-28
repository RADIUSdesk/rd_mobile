// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.vcAps', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcAps',
    sel		: null,
    config: {
        urlDelete    	: '/cake4/rd_cake/aps/ap_profile_ap_delete.json',
        urlRestartAps   : '/cake4/rd_cake/ap-actions/restart_aps.json',
        containedIn		: 'cntMainNetworks',
        appTitle		: 'RADIUSdesk',
        sortDesc		: true,
        asMenu			: false	
    },
    control: {
    	'cntAps' : {
    		show	: 'show',
    		hide	: 'hide',
    		initialize : 'initCnt' 		
    	},
        'gridAps': {
            select: 'onGridChildTap'
        },
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	},
      	'#btnSort' : {
      		tap		: 'sort'
      	},
      	'#btnFilter' : {
      		tap		: 'filter'
      	},
      	'#txtFilterValue' : {
      		change	: 'txtFilterValueChange'
      	},
      	'#btnEdit' : {
      		tap	: 'edit'
      	},
      	'#btnAdd' : {
      		tap	: 'add'
      	},
      	'#btnDelete' : {
      		tap	: 'delete'
      	},
      	'#btnDetail' : {
      		tap	: 'detail'
      	}     	
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asMenu'));
    	me.getAsMenu().down('#btnDelete').on('tap', 	this.delete, this);
    	
    	me.getAsMenu().down('#btnRestart').on('tap', 	this.restart, this);
    	me.getAsMenu().down('#btnExecute').on('tap', 	this.execute, this);
    	me.getAsMenu().down('#btnHistory').on('tap', 	this.history, this);
    	
    	me.getAsMenu().down('#btnSsidDevice').on('tap', this.ssidDevice, this);
    	me.getAsMenu().down('#btnDetail').on('tap', 	this.detail, this);
    	
    },
    show	: function(){
    	var me = this;
    	me.getView().down('#btnAdd').show();
    	me.reload();
    },
    hide	: function(){
    	var me = this;
    	me.getView().down('#btnAdd').hide();
    },
    back : function(btn){
        var me = this;
        btn.up(me.getContainedIn()).setActiveItem(0);
        me.getView().up('pnlMain').down('#lblMain').setHtml(me.getAppTitle());
    },
    reload	: function(btn){
    	var me = this;
    	var store 	= me.getView().down('gridAps').getStore();
    	store.filter([{'property':'name','value':'jdksljsdklj','operator':'like'}]); //We do this hack to clear the grid in order to update the screen 
    	setTimeout(function(){
    		store.clearFilter(); 	
    	}, 50);
    		  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridAps').getStore();
    	me.setSortDesc(!me.getSortDesc());
    	if(me.getSortDesc()){
    		btn.setIconCls('x-fa fa-sort-alpha-down'); 
    		store.sort([{
				property : 'name',
				direction: 'ASC'
			}]);
    	}else{
    		btn.setIconCls('x-fa fa-sort-alpha-up');
    		store.sort([{
				property : 'name',
				direction: 'DESC'
			}]); 
    	}
    },
    filter	: function(tbn){
    	var me  = this;
    	me.getView().down('#asFilter').show();
    },
    txtFilterValueChange : function(txt,new_value){
    	var me 		= this;
    	var store 	= me.getView().down('gridAps').getStore();
    	var btn		= me.getView().down('#btnFilter');
    	var cmb		= me.getView().down('#cmbFilterOn'); 
    	if(new_value == ''){
    		store.clearFilter();
    		btn.setBadgeText('');
    	}else{
    		store.filter([{'property':cmb.getValue(),'value':new_value,'operator':'like'}]);
    		btn.setBadgeText('+');
    	}
    },
    delete  : function(btn){
    	var me = this;
    	Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(buttonId){    	
    		if(buttonId == 'yes'){
    			Ext.Ajax.request({
				    url: me.getUrlDelete(),
				    method: 'POST',          
				    jsonData: [{'id': me.sel.get('id')}],
				    success: function(batch,options){
				        me.reload(); //Reload from server
				        me.getAsMenu().hide();
				    },                                    
				    failure: function(batch,options){
				        me.reload(); //Reload from server
				        me.getAsMenu().hide();
				    }
				});		
    		}    	
    	});   	
    	me.getAsMenu().hide();
    },
    edit  : function(btn){
    	var me = this;	
    	me.getAsMenu().hide();
    	var w = Ext.widget('frmApProfileAddEditAp',{grid:me.getView().down('gridAps'), ap_id: me.sel.get('id'),action: 'edit'});
        w.show();
    },
    add : function(){
    	var me = this;
    	var w = Ext.widget('frmApProfileAddEditAp',{grid:me.getView().down('gridAps'),action: 'add'});
        w.show(); 
    },
    onWidgetcellTap: function(a,sel){
    	var me 	= this;
    	me.sel = sel;
    	me.getAsMenu().show();	  
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getAsMenu().show();	    	  	 
    },
    detail	: function(){
    	var me = this;
    	me.getAsMenu().hide();
    	var w = Ext.widget('pnlApDetail',{ap_name : me.sel.get('name'), r: me.sel });
    	w.show();
    },
    ssidDevice	: function(){
    	var me = this;
    	var containedIn = me.getView().up(me.getContainedIn());
    	var cnt = containedIn.down('cntApViewSsidsGraph');
		if(!cnt){
			var cn = Ext.create({
				xtype	: 'cntApViewSsidsGraph',
				layout	: 'fit'
			});
			cnt = containedIn.add(cn);
		} 	
		containedIn.setActiveItem(cnt);
		var cntRG 	= containedIn.getActiveItem();
		cntRG.getController().doUpdateId({ap_name : me.sel.get('name'), ap_id : me.sel.get('id')});
    	me.getView().up('pnlMain').down('#lblMain').setHtml('SSID <i class="fa fa-exchange-alt fa-1x"></i> Device');     
    },
    restart  : function(btn){
    	var me = this;
    	Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(buttonId){    	
    		if(buttonId == 'yes'){		
    			var list     = [];
                Ext.Array.push(list,{'id' : me.sel.get('id')});
                Ext.Ajax.request({
                    url: me.getUrlRestartAps(),
                    method: 'POST',          
                    jsonData: {aps: list},
                    success: function(batch,options){
                        me.reload(); //Reload from server
				        me.getAsMenu().hide();
                    },                                    
                    failure: function(batch,options){
                        me.reload(); //Reload from server
				        me.getAsMenu().hide();
                    }
                });
    		}    	
    	});   	
    	me.getAsMenu().hide();
    },
    execute	: function(){
    	var me = this;
    	me.getAsMenu().hide();
    	var w = Ext.widget('frmHardwareAddAction',{grid:me.getView().down('gridAps'), ap_id: me.sel.get('id'), hw_type: 'ap'});
        w.show();
    },
    history : function(){
    	var me = this;
    	var containedIn = me.getView().up(me.getContainedIn());
    	var cnt = containedIn.down('cntActionHistories');
		if(!cnt){
			var cn = Ext.create({
				xtype	: 'cntActionHistories',
				layout	: 'fit'
			});
			cnt = containedIn.add(cn);
		} 	
		containedIn.setActiveItem(cnt);
		var cntRG 	= containedIn.getActiveItem();
		//cntRG.getController().doUpdateId({ap_name : me.sel.get('name'), ap_id : me.sel.get('id')});
    	me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-clock fa-1x"></i> Action History');        
    }
});
