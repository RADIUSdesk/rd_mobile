// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.vcAps', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcAps',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/aps/ap_profile_ap_delete.json',
        containedIn			: 'cntMainNetworks',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        asMenu				: false	
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
    	me.getView().down('gridAps').getStore().reload();    	  
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
    }
});
