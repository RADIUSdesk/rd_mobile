Ext.define('RdMobile.view.meshes.vcMeshes', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshes',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/meshes/delete.json',
        containedIn			: 'cntMainNetworks',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        asMenu				: false	
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
      	'#btnDelete' : {
      		tap	: 'delete'
      	},
      	'#btnDetail' : {
      		tap	: 'detail'
      	},
      	'#cmbEdit' : {
      		change: 'cmbEditChange'
      	},
      	'#cmbView' : {
      		change: 'cmbViewChange'
      	}        	
    },
    initCnt	: function(){
    	var me = this;
    	me.setAsMenu(me.getView().down('#asMenu'));
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
    	console.log("Reloading....");
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
    	var w = Ext.widget('pnlMeshDetail',{device_name : me.sel.get('name'), r: me.sel });
    	w.show();
    },
    cmbEditChange : function(a,b){
    	var me = this;
    	if(b == 'general'){
    		var w = Ext.widget('frmMeshEditGeneral',{mesh_name : me.sel.get('name'), r: me.sel });
    		w.show();
    	}
    	if(b == 'entry_points'){
    		var containedIn = a.up(me.getContainedIn());
    		var cnt = containedIn.down('cntMeshEditEntries');
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			//cntRG.getController().updateGraph({type: 'permanent',backTo : me.getCntPermanentUsers(),username:me.sel.get('username')});
			//var ts 			= me.truncString(me.sel.get('username'),10,'...');
        	//me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-user fa-1x"></i> <i class="fa fa-chart-bar fa-1x"></i> '+ts); 
    	}
    	if(b == 'mesh_settings'){
    		var w = Ext.widget('frmMeshEditGeneral',{mesh_name : me.sel.get('name'), r: me.sel });
    		w.show();
    	}
    	if(b == 'exit_points'){
    		var containedIn = a.up(me.getContainedIn());
    		var cnt = containedIn.down('cntMeshEditEntries');
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			//cntRG.getController().updateGraph({type: 'permanent',backTo : me.getCntPermanentUsers(),username:me.sel.get('username')});
			//var ts 			= me.truncString(me.sel.get('username'),10,'...');
        	//me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-user fa-1x"></i> <i class="fa fa-chart-bar fa-1x"></i> '+ts); 
    	}
    	if(b == 'node_settings'){
    		var w = Ext.widget('frmMeshEditGeneral',{mesh_name : me.sel.get('name'), r: me.sel });
    		w.show();
    	}
    	if(b == 'nodes'){
    		var containedIn = a.up(me.getContainedIn());
    		var cnt = containedIn.down('cntMeshEditEntries');
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			//cntRG.getController().updateGraph({type: 'permanent',backTo : me.getCntPermanentUsers(),username:me.sel.get('username')});
			//var ts 			= me.truncString(me.sel.get('username'),10,'...');
        	//me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-user fa-1x"></i> <i class="fa fa-chart-bar fa-1x"></i> '+ts); 
    	}
		me.getAsMenu().hide(); 	    
    },
    cmbViewChange : function(a,b){
    	var me = this;
    	console.log(b);
    	a.setValue('choose_one');
    	me.getAsMenu().hide();    
    
    }
});
