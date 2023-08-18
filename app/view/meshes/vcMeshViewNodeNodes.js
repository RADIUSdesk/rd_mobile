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
        span		: 'week', //can be hour / day /week
    },
    control: {
    	'cntMeshViewNodeNodes' : {
    		show	: 'show'
    	},
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	}
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
    	//me.getView().down('gridMeshViewNodeNodes').getStore().getProxy().setExtraParam('mesh_id',me.getMeshId());
    	//me.getView().down('gridMeshViewNodeNodes').getStore().getProxy().setExtraParam('timespan',me.getSpan());
    	//me.getView().down('gridMeshViewNodeNodes').getStore().reload(); 
    },
    doUpdateId : function(info){
    	var me = this;
    	me.setMeshId(info.mesh_id);
    	me.setMeshName(info.mesh_name);   	
    	me.reload();
    }
});
