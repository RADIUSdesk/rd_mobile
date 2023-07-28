Ext.define('RdMobile.view.meshes.vcMeshEditEntries', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshEditEntries',
    config: {
        urlDelete           : '/cake4/rd_cake/radaccts/delete.json',
        containedIn			: 'cntMainNetworks',
        appTitle			: 'RADIUSdesk',
        backTo				: 0
    },
    control: {
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	}
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
    	me.getView().down('#chrtUsage').getStore().reload();  
    }
});
