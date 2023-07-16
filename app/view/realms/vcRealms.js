Ext.define('RdMobile.view.realms.vcRealms', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRealms',
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
        urlDelete           : '/cake4/rd_cake/realms/delete.json',
        containedIn			: 'cntMainRadius',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        cntRadaccts			: 4,
        cntRealms			: 10,
        cntRadiusGraphs		: 11	
    },
    control: {
    	'cntRealms' : {
    		show	: 'show',
    		hide	: 'hide'
    	},
        'gridRealms': {
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
      	'#btnEdit' : {
      		tap	: 'edit'
      	},
      	'#btnGraphs' : {
      		tap	: 'graphs'
      	},
      	'#btnActivity' : {
      		tap	: 'activity'
      	}  
    },
    show	: function(){
    	var me = this;
    	console.log("Show");
    	me.getView().down('#btnAdd').show();
    },
    hide	: function(){
    	var me = this;
    	console.log("Hide");
    	me.getView().down('#btnAdd').hide();
    },
    back : function(btn){
        var me = this;
        btn.up(me.getContainedIn()).setActiveItem(0);
        me.getView().up('pnlMain').down('#lblMain').setHtml(me.getAppTitle());
    }, 
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridRealms').getStore().reload();  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridRealms').getStore();
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
    	console.log("Filter Button Tapped");
    	me.getView().down('#asFilter').show();
    },
    txtFilterValueChange : function(txt,new_value){
    	var me 		= this;
    	var store 	= me.getView().down('gridRealms').getStore();
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
    edit  : function(btn){
    	var me = this;	
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmRealmEdit',{grid:me.getView().down('gridRealms'), realm_id: me.sel.get('id'),realm_name : me.sel.get('name')});
        w.show();
    },
    add : function(){
    	var me 		= this;   	
    	var dd      = Ext.getApplication().getDashboardData();
    	var w = Ext.widget('frmRealmAdd',{grid:me.getView().down('gridRealms'),root:me.root});
        w.show(); 
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getView().down('#asMenu').show();	    	  	 
    },
    graphs	: function(btn){
    	var me 			= this;
    	var containedIn = btn.up(me.getContainedIn());
		containedIn.setActiveItem(me.getCntRadiusGraphs());
		var cntRG 		= containedIn.getActiveItem();
		cntRG.getController().updateGraph({type: 'realm',backTo : me.getCntRealms(),username:me.sel.get('id')});
		var ts 			= me.truncString(me.sel.get('name'),17,'...');
        me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-volleyball-ball fa-1x"></i> <i class="fa fa-chart-bar fa-1x"></i> '+ts); 
        me.getView().down('#asMenu').hide();
    },
    activity : function(btn){
    	var me 			= this;
    	var containedIn = btn.up(me.getContainedIn());
		containedIn.setActiveItem(me.getCntRadaccts());
		var cntRG 		= containedIn.getActiveItem();
		cntRG.getController().updateRadaccts({type: 'realm',backTo : me.getCntRealms(),username:me.sel.get('id')});
		var ts 			= me.truncString(me.sel.get('name'),17,'...');
        me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-volleyball-ball fa-1x"></i> <i class="fa fa-running fa-1x"></i> '+ts); 
        me.getView().down('#asMenu').hide();
    },
    truncString : function truncString(str, max, add){
	   add = add || '...';
	   return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
	}
});	
