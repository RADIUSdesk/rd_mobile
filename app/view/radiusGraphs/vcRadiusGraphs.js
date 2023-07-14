Ext.define('RdMobile.view.radiusGraphs.vcRadiusGraphs', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRadiusGraphs',
    sel		: null,
    init    : function() { 
    	var me = this;   
    	var dd = Ext.getApplication().getDashboardData();
    	//Set root to use later in the app in order to set 'for_system' (root)
        me.root    = false;
        if(dd.isRootUser){
            me.root = true;   
        }
    },
    config: {
        urlDelete           : '/cake4/rd_cake/radaccts/delete.json',
        containedIn			: 'cntMainRadius',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        backTo				: 0,
        type				: 'permanent', //can be voucher, device, permanent, realm, nas??
        span				: 'daily', //can be daily, weekly, monthly
        username			: ''
    },
    control: {
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	},
      	'#btnDate' : {
      		tap		: 'date'
      	},
      	'#day'	: {
      		change	: 'dayChange'
      	},
      	'#rgrpSpan' : {
      		change 	: 'spanChange'
      	},
      	'cmbTimezones' : {
      		change	: 'tzChange'
      	}
    },
    back : function(btn){
        var me = this;
        btn.up(me.getContainedIn()).setActiveItem(me.getBackTo());
        me.getView().up('pnlMain').down('#lblMain').setHtml(me.getAppTitle());
    }, 
    reload	: function(btn){
    	var me = this;
    	me.getView().down('#chrtUsage').getStore().reload();  
    },
    date	: function(tbn){
    	var me  = this;
    	me.getView().down('#asDate').show();
    },
    updateGraph : function(upd_info){
    	var me = this;
    	me.setType(upd_info['type']);
    	me.setUsername(upd_info['username'])
    	me.setBackTo(upd_info['backTo']);
    	me.setParams();
    	me.reload();  	
    },
    asClose : function(){
    	var me = this
    	me.getView().down('#asDate').hide();
    },
    setParams	: function(){
    	var me = this;
    	chart = me.getView().down('#chrtUsage').getStore().getProxy().setExtraParams({
    		username 	: me.getUsername(),
    		span		: me.getSpan(),
    		type		: me.getType()	
    	});    
    },
    dayChange	: function(a,value){
    	var me = this;
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('day',value);
        me.reload();
    },
    spanChange	: function(a,value){
    	var me = this;
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('span',value);
        me.reload(); 	
    },
    tzChange	: function(a,value){
    	var me = this;
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('timezone_id',value);
        me.reload();
        me.updateInfo(); 
    },
    updateInfo	: function(){
    	var me = this;
    	var d  = me.getView().down('#day').getValue();
    	
    	me.getView().down('#lblInfo').setHtml('<div style="color:#3e3f40;text-align: center;font-size:small">'+d.toDateString()+'<div style="font-size: xx-small;">DAILY</div><div style="font-size: xx-small;">Africa/Johannesburg</div></div>');    
    }
});	
