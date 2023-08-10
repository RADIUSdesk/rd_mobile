// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcMeshEntries', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshEntries',
    config: {
        urlDelete   : '/cake4/rd_cake/meshes/mesh-entry-delete.json',
        urlAdd		: '/cake4/rd_cake/meshes/mesh-entry-add.json',
        urlView		: '/cake4/rd_cake/meshes/mesh-entry-view.json',
        urlEdit		: '/cake4/rd_cake/meshes/mesh-entry-edit.json',
        containedIn	: 'cntMainNetworks',
        backTo		: 0,
        meshId		: undefined
    },
    control: {
    	'cntMeshEntries' : {
    		show	: 'show',
    		hide	: 'hide'
    	},
    	'gridMeshEntries': {
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
        me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-sitemap fa-1x"></i> MESH Networks');
    }, 
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridMeshEntries').getStore().reload(); 
  
    },
    updateEntries : function(info){
    	var me = this;
    	me.setMeshId(info.mesh_id);
    	me.getView().down('gridMeshEntries').getStore().getProxy().setExtraParam('mesh_id',info.mesh_id);
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
				        me.getView().down('#asMenu').hide();
				    },                                    
				    failure: function(batch,options){
				        me.reload(); //Reload from server
				        me.getView().down('#asMenu').hide();
				    }
				});		
    		}    	
    	});   	
    	me.getView().down('#asMenu').hide();
    },
    add : function(){
    	var me = this;
        var w = Ext.widget('frmWifiEntryPoint',{grid:me.getView().down('gridMeshEntries'),'meshId': me.getMeshId(),'submitUrl' : me.getUrlAdd()});
        w.show(); 
    },
    edit : function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
        var entry_id  = me.sel.get('id');
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {entry_id : entry_id},
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    var w = Ext.widget('frmWifiEntryPoint',{grid:me.getView().down('gridMeshEntries'),'submitUrl' : me.getUrlEdit()});
				    w.setValues(jsonData.data);
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
    	me.getView().down('#asMenu').show();	    	  	 
    }
});
