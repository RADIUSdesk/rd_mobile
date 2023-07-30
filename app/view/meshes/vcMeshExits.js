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
        meshId		: undefined
    },
    control: {
    	'cntMeshExits' : {
    		show	: 'show',
    		hide	: 'hide'
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
        //var w = Ext.widget('frmWifiEntryPoint',{grid:me.getView().down('gridMeshEntries'),'meshId': me.getMeshId(),'submitUrl' : me.getUrlAdd()});
       // w.show(); 
    },
    edit : function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
        var exit_id  = me.sel.get('id');
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {exit_id : exit_id},
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				  //  var w = Ext.widget('frmWifiEntryPoint',{grid:me.getView().down('gridMeshEntries'),'submitUrl' : me.getUrlEdit()});
				 //   w.setValues(jsonData.data);
        		//	w.show();       			        
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
