// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcMeshViewNodeNodes', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshViewNodeNodes',
    config: {
        containedIn	: 'cntMainNetworks',
        backTo		: 0,
        meshId		: undefined,
        meshName	: '',
        span		: 'hour', //can be hour / day /week
        urlNodeNode	: '/cake4/rd_cake/mesh-reports/view_node_nodes.json',
        asMenu		: false	
    },
    control: {
    	'cntMeshViewNodeNodes' : {
    		show	: 'show',
    		initialize : 'initCnt' 
    	},
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	},
      	'#btnDate' : {
      		tap		: 'date'
      	},
      	'#rgrpSpan' : {
      		change 	: 'spanChange'
      	},
      	'gridMeshViewNodeNodes': {
            select: 'onGridChildTap'
        },
        '#btnDetail' : { //**
      		tap	: 'detail'
      	}
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asMenu'));
    	//FIXME NOTE We have to manually add the event bindings for items in the ActionSheet when we add the parent container on the fly (//**)

    },
    show	: function(){
    	var me = this;   	
    	setTimeout(function(){ //FIXME We add a small delay in order to set everything up
    		me.reload();	
    	}, 1000);	
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
    	me.getView().down('gridMeshViewNodeNodes').setMasked(true);
        Ext.Ajax.request({
            url: me.getUrlNodeNode(),
            params: {
                timespan  	: me.getSpan(),
                mesh_id     : me.getMeshId()
            },
            method: 'GET',
            success: function(response){
            	me.getView().down('gridMeshViewNodeNodes').setMasked(false);
                var jsonData = Ext.JSON.decode(response.responseText);                
                if(jsonData.success){    
                    me.getView().down('gridMeshViewNodeNodes').gridStore.loadData(jsonData.items)
                    me.updateInfo();                
                }else{

                  
                }
            }
        }); 
    },
    doUpdateId : function(info){
    	var me = this;
    	me.setMeshId(info.mesh_id);
    	me.setMeshName(info.mesh_name);   	
    	me.reload();
    },
    date	: function(tbn){
    	var me  = this;
    	me.getView().down('#asDate').show();
    },
    spanChange	: function(a,value){
    	var me = this;
    	me.setSpan(value);
        me.reload(); 	
    },
    updateInfo	: function(){
    	var me 		= this;
    	var span  	= me.getSpan();  	
    	me.getView().down('#lblInfo').setData({
    		mesh_name   : me.getMeshName(),
    		span		: span.toUpperCase()
    	});   
    },
    asClose : function(){
    	var me = this
    	me.getView().down('#asDate').hide();
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;			
    	me.getAsMenu().show();   	   	  	 
    },
    detail	: function(){
    	var me = this;
    	me.getAsMenu().hide();
    	var w = Ext.widget('pnlMeshViewNodeNodesDetail',{peer_name : me.sel.get('peer_name'), r: me.sel });
    	w.show();
    },
});
