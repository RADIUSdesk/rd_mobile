// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.vcActionHistories', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcActionHistories',
    sel		: null,
    config: {
        urlDelete    	: '/cake4/rd_cake/aps/ap_profile_ap_delete.json',
        containedIn		: 'cntMainNetworks',
        appTitle		: 'RADIUSdesk',
        sortDesc		: true,
        asMenu			: false	
    },
    control: {
    	'cntActionHistories' : {
    		show	: 'show',
    		hide	: 'hide',
    		initialize : 'initCnt' 		
    	},
        'gridActionHistories': {
            select: 'onGridChildTap'
        },
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	},      	
      	'#btnAdd' : {
      		tap	: 'add'
      	},
      	'#btnDelete' : {
      		tap	: 'delete'
      	}   	
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asMenu'));
    	me.getAsMenu().down('#btnDelete').on('tap', 	this.delete, this);    	
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
    	me.getView().down('gridActionHistories').getStore().reload();    	  
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
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getAsMenu().show();	    	  	 
    },
    add	: function(){
    	var me = this;
    	me.getAsMenu().hide();
    	var w = Ext.widget('frmHardwareAddAction',{grid:me.getView().down('gridActionHistories'), ap_id: me.sel.get('id'), hw_type: 'ap'});
        w.show();
    }
});
