Ext.define('RdMobile.view.meshes.vcMeshEntries', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshEntries',
    config: {
        urlDelete           : '/cake4/rd_cake/radaccts/delete.json',
        containedIn			: 'cntMainNetworks',
        appTitle			: 'RADIUSdesk',
        backTo				: 0
    },
    control: {
    	'cntMeshEntries' : {
    		show	: 'show',
    		hide	: 'hide'
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
        me.getView().up('pnlMain').down('#lblMain').setHtml(Ext.getApplication().getAppTitle());
    }, 
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridMeshEntries').getStore().reload(); 
  
    },
    updateEntries : function(info){
    	var me = this;
    	me.getView().down('gridMeshEntries').getStore().getProxy().setExtraParam('mesh_id',info.mesh_id);
    	me.reload();    
    }
});
