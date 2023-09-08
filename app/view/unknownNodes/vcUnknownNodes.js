// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.unknownNodes.vcUnknownNodes', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcUnknownNodes',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/unknown-nodes/delete.json',
        containedIn			: 'cntMainNetworks',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        asMenu				: false	
    },
    control: {
    	'cntUnknownNodes' : {
    		show	: 'show',
    		initialize : 'initCnt'    		
    	},
        'gridUnknownNodes': {
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
      	'#btnDelete' : {
      		tap	: 'delete'
      	}    	
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asMenu'));
    	me.getAsMenu().down('#btnDelete').on('tap', 	this.delete, this);
    	me.getAsMenu().down('#btnNodeAdd').on('tap', 	this.nodeAdd, this);
    	me.getAsMenu().down('#btnApAdd').on('tap', 		this.apAdd, this);
    },
    show	: function(){
    	var me = this;
    	me.reload();
    },
    back : function(btn){
        var me = this;
        btn.up(me.getContainedIn()).setActiveItem(0);
        me.getView().up('pnlMain').down('#lblMain').setHtml(me.getAppTitle());
    },
    reload	: function(btn){
    	var me = this;
    	console.log("Reloading....");
    	me.getView().down('gridUnknownNodes').getStore().reload();  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridUnknownNodes').getStore();
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
    	var store 	= me.getView().down('gridUnknownNodes').getStore();
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
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getAsMenu().show();	    	  	 
    },
    nodeAdd : function(){
    	var me = this;
    	me.getAsMenu().hide();
    	var w = Ext.widget('frmMeshAddEditNode',{grid:me.getView().down('gridUnknownNodes'),action: 'attach', mac : me.sel.get('mac')});
        w.show(); 
    },
    apAdd : function(){
    	var me = this;
    	me.getAsMenu().hide();
    	var w = Ext.widget('frmApProfileAddEditAp',{grid:me.getView().down('gridUnknownNodes'),action: 'attach', mac : me.sel.get('mac')});
        w.show(); 
    }
});
