// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcMeshes', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshes',
    sel		: null,
    config: {
        urlDelete  	: '/cake4/rd_cake/meshes/delete.json',
        containedIn	: 'cntMainNetworks',
        appTitle	: 'RADIUSdesk',
        sortDesc	: true,
        asMenu		: false	
    },
    control: {
    	'cntMeshes' : {
    		show	: 'show',
    		hide	: 'hide',
    		initialize : 'initCnt'  		
    	},
        'gridMeshes': {
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
      	'#btnAdd' : {
      		tap	: 'add'
      	},
      	'#btnDelete' : { //**
      		tap	: 'delete'
      	},
      	'#btnDetail' : { //**
      		tap	: 'detail'
      	},
      	'#cmbEdit' : { //**
      		select: 'cmbEditChange'
      	},
      	'#cmbView' : { //**
      		select: 'cmbViewChange'
      	}        	
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asMenu'));
    	//FIXME NOTE We have to manually add the event bindings for items in the ActionSheet when we add the parent container on the fly (//**)
    	me.getAsMenu().down('#btnDelete').on('tap', 	this.delete, this);
    	me.getAsMenu().down('#btnDetail').on('tap', 	this.detail, this);
    	me.getAsMenu().down('#cmbEdit').on('select', 	this.cmbEditChange, this);
    	me.getAsMenu().down('#cmbView').on('select', 	this.cmbViewChange, this);
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
    	me.getView().down('gridMeshes').getStore().reload();    	  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridMeshes').getStore();
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
    	var store 	= me.getView().down('gridMeshes').getStore();
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
    add : function(){
    	var me = this;
    	var w = Ext.widget('frmMeshAdd',{grid:me.getView().down('gridMeshes')});
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
    	var w = Ext.widget('pnlMeshDetail',{mesh_name : me.sel.get('name'), r: me.sel });
    	w.show();
    },
    cmbEditChange : function(a,value){
    	var me 	= this;
    	var b 	= a.getValue();
    	if(b == 'general'){
    		var w = Ext.widget('frmMeshEditGeneral',{mesh_name : me.sel.get('name'),grid:me.getView().down('gridMeshes'), meshId : me.sel.get('id') });
    		w.show();
    	}
    	if(b == 'entry_points'){
    		var containedIn = me.getView().up(me.getContainedIn());
    		var cnt = containedIn.down('cntMeshEntries');
    		if(!cnt){
				var cn = Ext.create({
					xtype	: 'cntMeshEntries',
					layout	: 'fit'
				});
				cnt = containedIn.add(cn);
			} 	
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			cntRG.getController().updateEntries({mesh_name : me.sel.get('name'), mesh_id : me.sel.get('id')});
        	me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-sitemap fa-1x"></i> <i class="fa fa-pen fa-1x"></i> Entry Points'); 
    	}
    	if(b == 'mesh_settings'){
    		var w = Ext.widget('frmMeshEditMeshSettings',{mesh_name : me.sel.get('name'),meshId : me.sel.get('id') });
    		w.show();
    	}  	
    	if(b == 'exit_points'){
    		var containedIn = me.getView().up(me.getContainedIn());
    		var cnt = containedIn.down('cntMeshExits');
    		if(!cnt){
				var cn = Ext.create({
					xtype	: 'cntMeshExits',
					layout	: 'fit'
				});
				cnt = containedIn.add(cn);
			} 	
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			cntRG.getController().updateExits({mesh_name : me.sel.get('name'), mesh_id : me.sel.get('id')});
			me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-sitemap fa-1x"></i> <i class="fa fa-pen fa-1x"></i> Exit Points');
    	}
    	
    	if(b == 'node_settings'){
    		var w = Ext.widget('frmMeshEditNodeSettings',{mesh_name : me.sel.get('name'),meshId : me.sel.get('id')});
    		w.show();
    	}
    	
    	if(b == 'nodes'){
    		me.showNodes();	
    	}
    	
    	setTimeout(function(){
    		me.getAsMenu().hide();  //ON Slow browsers cause double trigger
    		a.setValue('choose_one');   		
    	}, 1000);			    
    },
    cmbViewChange : function(a,value){
    	var me 	= this; 
    	var b 	= a.getValue();	
    	if(b == 'view_entries'){
    		var containedIn = me.getView().up(me.getContainedIn());
    		var cnt = containedIn.down('cntMeshViewEntriesGraph');
    		if(!cnt){
				var cn = Ext.create({
					xtype	: 'cntMeshViewEntriesGraph',
					layout	: 'fit'
				});
				cnt = containedIn.add(cn);
			} 	
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			cntRG.getController().doUpdateId({mesh_name : me.sel.get('name'), mesh_id : me.sel.get('id')});
        	me.getView().up('pnlMain').down('#lblMain').setHtml('SSID <i class="fa fa-exchange-alt fa-1x"></i> Device'); 
    	}
    	
    	if(b == 'view_nodes'){
    		var containedIn = me.getView().up(me.getContainedIn());
    		var cnt = containedIn.down('cntMeshViewNodesGraph');
    		if(!cnt){
				var cn = Ext.create({
					xtype	: 'cntMeshViewNodesGraph',
					layout	: 'fit'
				});
				cnt = containedIn.add(cn);
			} 	
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			cntRG.getController().doUpdateId({mesh_name : me.sel.get('name'), mesh_id : me.sel.get('id')});
        	me.getView().up('pnlMain').down('#lblMain').setHtml('Node <i class="fa fa-exchange-alt fa-1x"></i> Device'); 
    	}
    	
    	if(b == 'view_node_node'){
    		var containedIn = me.getView().up(me.getContainedIn());
    		var cnt = containedIn.down('cntMeshViewNodeNodes');
    		if(!cnt){
				var cn = Ext.create({
					xtype	: 'cntMeshViewNodeNodes',
					layout	: 'fit'
				});
				cnt = containedIn.add(cn);
			} 	
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			cntRG.getController().doUpdateId({mesh_name : me.sel.get('name'), mesh_id : me.sel.get('id')});
        	me.getView().up('pnlMain').down('#lblMain').setHtml('Node <i class="fa fa-exchange-alt fa-1x"></i> Node'); 
    	}
    	
    	if(b == 'nodes'){
    		me.showNodes();	
    	}
    	
    	setTimeout(function(){
    		me.getAsMenu().hide();  //ON Slow browsers cause double trigger
    		a.setValue('choose_one');   		
    	}, 1000);	      
    },
    showNodes : function(){
    	var me = this;
    	var containedIn = me.getView().up(me.getContainedIn());
		var cnt = containedIn.down('cntNodes');
		if(!cnt){
			var cn = Ext.create({
				xtype	: 'cntNodes',
				layout	: 'fit'
			});
			cnt = containedIn.add(cn);
		}
		containedIn.setActiveItem(cnt);
		var cntRG 	= containedIn.getActiveItem();
		cntRG.getController().nodesForMesh({mesh_name : me.sel.get('name'), mesh_id : me.sel.get('id')});
		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-sitemap fa-1x"></i> <i class="fa fa-code-branch fa-1x"></i> MESH Nodes');    
    } 
});
