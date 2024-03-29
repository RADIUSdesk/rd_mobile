// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcMeshExits', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshExits',
    config: {
        urlDelete   : '/cake4/rd_cake/meshes/mesh-exit-delete.json',
        urlAdd		: '/cake4/rd_cake/meshes/mesh-exit-add.json',
        urlView		: '/cake4/rd_cake/meshes/mesh-exit-view.json',
        urlEdit		: '/cake4/rd_cake/meshes/mesh-exit-edit.json',
        containedIn	: 'cntMainNetworks',
        backTo		: 0,
        meshId		: undefined,
        asMenu		: false
    },
    control: {
    	'cntMeshExits' : {
    		show	: 'show',
    		hide	: 'hide',
    		initialize : 'initCnt'
    	},
    	'gridMeshExits': {
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
      	},
      	'#btnEdit' : {
      		tap	: 'edit'
      	}
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asMenu'));
    	//FIXME NOTE We have to manually add the event bindings for items in the ActionSheet when we add the parent container on the fly (//**)
    	me.getAsMenu().down('#btnDelete').on('tap', 	this.delete, this);
    	me.getAsMenu().down('#btnEdit').on('tap', 		this.edit, this);
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
        var c = btn.up(me.getContainedIn());
        var m = c.down('cntMeshes');       
        c.setActiveItem(m);
        me.getView().up('pnlMain').down('#lblMain').setHtml('MESH Networks');
    }, 
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridMeshExits').getStore().reload(); 
  
    },
    updateExits : function(info){
    	var me = this;
    	me.setMeshId(info.mesh_id);
    	me.getView().down('gridMeshExits').getStore().getProxy().setExtraParam('mesh_id',info.mesh_id);
    	me.reload();    
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
    	var w = Ext.widget('frmWifiExitPointAdd',{
    		grid		: me.getView().down('gridMeshExits'),
    		action		: 'add',					
    		meshId  	: me.getMeshId(),
    		mode		: 'mesh',		//Will determine the url called for available 'connect_with' list (from MESH or APdesk)
    		submitUrl 	: me.getUrlAdd()
    	});
        w.show();
    },
    edit : function(){
    	var me = this;
    	me.getAsMenu().hide();
        var exit_id  = me.sel.get('id');
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {exit_id : exit_id},
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    var w = Ext.widget('frmWifiExitPointEdit',{
				    	grid		: me.getView().down('gridMeshExits'),
				    	action		: 'edit',
				    	exit_type	: jsonData.data.type,
				    	exit_id		: exit_id,
				    	meshId  	: me.getMeshId(),
				    	mode		: 'mesh',		//Will determine the url called for available 'connect_with' list (from MESH or APdesk)
				    	submitUrl 	: me.getUrlEdit(),
				    	values		: jsonData.data //Exit ID will be in here
				    });
        			w.show();       			        
        		}
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});      
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getAsMenu().show();	    	  	 
    }
});
