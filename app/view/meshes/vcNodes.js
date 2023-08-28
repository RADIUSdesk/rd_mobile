// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcNodes', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcNodes',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/meshes/mesh_node_delete.json',
        urlRestartNodes		: '/cake4/rd_cake/mesh-reports/restart_nodes.json',
        containedIn			: 'cntMainNetworks',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        asMenu				: false	
    },
    control: {
    	'cntNodes' : {
    		show	: 'show',
    		hide	: 'hide',
    		initialize : 'initCnt' 		
    	},
        'gridNodes': {
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
    	me.getAsMenu().down('#btnEdit').on('tap', 	    this.edit, this);
    	me.getAsMenu().down('#btnDetail').on('tap', 	this.detail, this);
    	me.getAsMenu().down('#btnRestart').on('tap', 	this.restart, this);
    	me.getAsMenu().down('#btnExecute').on('tap', 	this.execute, this);
    	me.getAsMenu().down('#btnHistory').on('tap', 	this.history, this);
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
    	var store 	= me.getView().down('gridNodes').getStore();
    	store.filter([{'property':'name','value':'jdksljsdklj','operator':'like'}]); //We do this hack to clear the grid in order to update the screen 
    	setTimeout(function(){
    		store.clearFilter(); 	
    	}, 50);    		  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridNodes').getStore();
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
    	var store 	= me.getView().down('gridNodes').getStore();
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
    	var w = Ext.widget('frmMeshAddEditNode',{grid:me.getView().down('gridNodes'), node_id: me.sel.get('id'),action: 'edit'});
        w.show();
    },
    add : function(){
    	var me = this;
    	var w = Ext.widget('frmMeshAddEditNode',{grid:me.getView().down('gridNodes'),action: 'add'});
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
    	var w = Ext.widget('pnlNodeDetail',{node_name : me.sel.get('name'), r: me.sel });
    	w.show();
    },
    restart  : function(btn){
    	var me = this;
    	Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(buttonId){    	
    		if(buttonId == 'yes'){		
    			var list     = [];
                Ext.Array.push(list,{'id' : me.sel.get('id')});
                Ext.Ajax.request({
                    url: me.getUrlRestartNodes(),
                    method: 'POST',          
                    jsonData: {nodes: list, mesh_id: me.sel.get('mesh_id')},
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
    	var w = Ext.widget('frmHardwareAddAction',{grid:me.getView().down('gridNodes'), node_id: me.sel.get('id'), hw_type: 'node'});
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
