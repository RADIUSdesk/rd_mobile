// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.vcActionHistories', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcActionHistories',
    sel		: null,
    config: {
        containedIn		: 'cntMainNetworks',
        appTitle		: 'RADIUSdesk',
        sortDesc		: true,
        asMenu			: false,
        hwType			: 'node',
        nodeId			: undefined,
        apId			: undefined,
        urlNodeIndex  	: '/cake4/rd_cake/node-actions/index.json',
        urlNodeDelete 	: '/cake4/rd_cake/node-actions/delete.json',
        urlApIndex	    : '/cake4/rd_cake/ap-actions/index.json',
        urlApDelete	    : '/cake4/rd_cake/ap-actions/delete.json',
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
    	var url = me.getUrlNodeDelete();
    	if(me.getHwType() == 'ap'){
    		url = me.getUrlApDelete();
    	}   	
    	Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(buttonId){    	
    		if(buttonId == 'yes'){
    			Ext.Ajax.request({
				    url		: url,
				    method	: 'POST',          
				    jsonData: [{'id': me.sel.get('id')}],
				    success	: function(batch,options){
				        me.reload(); //Reload from server
				        me.getAsMenu().hide();
				    },                                    
				    failure	: function(batch,options){
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
		if(me.getHwType() == 'node'){
    		var w = Ext.widget('frmHardwareAddAction',{grid:me.getView().down('gridActionHistories'), node_id: me.getNodeId(), hw_type: 'node'});
        	w.show();
        }
        if(me.getHwType() == 'ap'){
    		var w = Ext.widget('frmHardwareAddAction',{grid:me.getView().down('gridActionHistories'), ap_id: me.getApId(),     hw_type: 'ap'});
        	w.show();
        }
    },
    setHardwareId : function(info){
    	var me 		= this;
    	var store 	= me.getView().down('gridActionHistories').getStore();
    	if(info.hw_type == 'ap'){
    		me.setApId(info.ap_id);
    		store.getProxy().setExtraParam('ap_id',info.ap_id);
    		store.getProxy().setUrl(me.getUrlApIndex());
    	}
    	if(info.hw_type == 'node'){
    		me.setNodeId(info.node_id);
    		store.getProxy().setExtraParam('node_id',info.node_id);
    		store.getProxy().setUrl(me.getUrlNodeIndex());
    	}
    	
    	me.setHwType(info.hw_type);    	
    	me.reload();  
    }
});
