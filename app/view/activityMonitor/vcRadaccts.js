Ext.define('RdMobile.view.activityMonitor.vcRadaccts', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRadaccts',
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
        userType			: 'cloud', //can be voucher, device, permanent, realm, nas??
        span				: 'daily', //can be daily, weekly, monthly
        username			: 0, //Zero has special meaning,
        cntRadaccts			: 4,
        cntRadiusGraphs		: 11 	
    },
    control: {
    	'cntRadaccts' : {
    		show	: 'show'
    	},
        'gridRadaccts': {
            select: 'onGridChildTap'
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
      	'#day'	: {
      		change	: 'dayChange'
      	},
      	'#rgrpSpan' : {
      		change 	: 'spanChange'
      	},
      	'cmbTimezones' : {
      		change	: 'tzChange'
      	},
      	'#btnDetail' : {
      		tap	: 'detail'
      	}, 
      	'#btnGraphs' : {
      		tap	: 'graphs'
      	},  
    },
    show : function(){
    	var me = this;
    	me.setParams();
    	me.reload();
    },
    back : function(btn){
        var me = this;
        btn.up(me.getContainedIn()).setActiveItem(me.getBackTo());
        me.getView().up('pnlMain').down('#lblMain').setHtml(me.getAppTitle());
    }, 
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridRadaccts').getStore().reload();  
    },
    date	: function(tbn){
    	var me  = this;
    	me.getView().down('#asDate').show();
    },
    asClose : function(){
    	var me = this
    	me.getView().down('#asDate').hide();
    },
    setParams	: function(){
    	var me = this;
    	me.getView().down('gridRadaccts').getStore().getProxy().setExtraParam('username',me.getUsername());
    	me.getView().down('gridRadaccts').getStore().getProxy().setExtraParam('span',me.getSpan());
    	me.getView().down('gridRadaccts').getStore().getProxy().setExtraParam('type',me.getUserType());
    	
    	var tz_id  = me.getView().down('cmbTimezones').getValue(); 
    	me.getView().down('gridRadaccts').getStore().getProxy().setExtraParam('timezone_id',tz_id);
    	
    	//var d  	= me.getView().down('#day').getValue();
    	//var d_s = d.toDateString();
    	//me.getView().down('gridRadaccts').getStore().getProxy().setExtraParam('day', d_s); //The timezone from the browser causes k*k leave it out here   	 	
    	me.updateInfo();    
    },
    dayChange	: function(a,value){
    	var me = this;
    	me.getView().down('gridRadaccts').getStore().getProxy().setExtraParam('day',value);
    	me.updateInfo();
        me.reload();
    },
    spanChange	: function(a,value){
    	var me = this;
    	me.setSpan(value);
    	me.getView().down('gridRadaccts').getStore().getProxy().setExtraParam('span',value);
    	me.updateInfo();
        me.reload(); 	
    },
    tzChange	: function(a,value){
    	var me = this;
    	me.getView().down('gridRadaccts').getStore().getProxy().setExtraParam('timezone_id',value);
    	me.updateInfo();
        me.reload();       
    },
    updateInfo	: function(){
    	var me        = this;
    	var d         = me.getView().down('#day').getValue();
    	var d_s       = d.toDateString();
    	var tz_id     = me.getView().down('cmbTimezones').getValue(); 
    	var tz_record = me.getView().down('cmbTimezones').getStore().findRecord('id',tz_id);
    	var span 	  = me.getView().down('#rgrpSpan').getChecked().getValue();
    	me.getView().down('#lblInfo').setData({
    		day 		: d_s,
    		span		: span.toUpperCase(),
    		timezone 	: tz_record.get('name')
    	});   
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getView().down('#asMenu').show();	    	  	 
    },
    updateRadaccts : function(upd_info){
    	var me = this;
    	me.setUserType(upd_info['type']);
    	me.setUsername(upd_info['username'])
    	me.setBackTo(upd_info['backTo']);  	
    	me.setParams();
    	me.reload();  	
    },
    clearBackButton : function(){
    	var me = this;
    	me.setBackTo(0);
    },
    detail	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('pnlRadacctDetail',{user_name : me.sel.get('username'), r: me.sel });
    	w.show();
    },
    graphs	: function(btn){
    	var me 			= this;
    	var containedIn = btn.up(me.getContainedIn());
		containedIn.setActiveItem(me.getCntRadiusGraphs());
		var cntRG 		= containedIn.getActiveItem();
		cntRG.getController().updateGraph({type: 'permanent',backTo : me.getCntRadaccts(),username:me.sel.get('username')}); //Make the type as permanent
		var ts 			= me.truncString(me.sel.get('username'),10,'...');
        me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-running fa-1x"></i> <i class="fa fa-chart-bar fa-1x"></i> '+ts); 
        me.getView().down('#asMenu').hide();
    },
    truncString : function truncString(str, max, add){
	   add = add || '...';
	   return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
	}
});	
