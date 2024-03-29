// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.permanentUsers.vcPermanentUsers', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPermanentUsers',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/permanent-users/delete.json',
        containedIn			: 'cntMainRadius',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        cntPermanentUsers  	: 1,
        cntRadaccts			: 4,
        cntRadiusGraphs		: 11	
    },
    control: {
    	'cntPermanentUsers' : {
    		show	: 'show',
    		hide	: 'hide'
    	},
        'gridPermanentUsers': {
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
      	'#btnEditBasic' : {
      		tap	: 'editBasic'
      	},
      	'#btnEditPersonal' : {
      		tap	: 'editPersonal'
      	},
      	'#btnEmail' : {
      		tap	: 'email'
      	},
      	'#btnPassword' : {
      		tap	: 'password'
      	},
      	'#btnEnable' : {
      		tap	: 'enableDisable'
      	},
      	'#btnRadius' : {
      		tap	: 'radius'
      	}, 
      	'#btnDetail' : {
      		tap	: 'detail'
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
    	me.getView().down('gridPermanentUsers').getStore().reload();  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridPermanentUsers').getStore();
    	me.setSortDesc(!me.getSortDesc());
    	if(me.getSortDesc()){
    		btn.setIconCls('x-fa fa-sort-alpha-down'); 
    		store.sort([{
				property : 'username',
				direction: 'ASC'
			}]);
    	}else{
    		btn.setIconCls('x-fa fa-sort-alpha-up');
    		store.sort([{
				property : 'username',
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
    	var store 	= me.getView().down('gridPermanentUsers').getStore();
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
    editBasic  : function(btn){
    	var me = this;	
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmPermanentUserEditBasic',{grid:me.getView().down('gridPermanentUsers'), user_id: me.sel.get('id')});
        w.show();
    },
    editPersonal  : function(btn){
    	var me = this;	
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmPermanentUserEditPersonal',{grid:me.getView().down('gridPermanentUsers'), user_id: me.sel.get('id')});
        w.show();
    },
    password  : function(btn){
    	var me = this;	
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmPassword',{grid:me.getView().down('gridPermanentUsers'), user_id: me.sel.get('id'),user_name : me.sel.get('username')});
        w.show();
    },
    enableDisable  : function(btn){
    	var me = this;	
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmEnableDisable',{grid:me.getView().down('gridPermanentUsers'), user_id: me.sel.get('id'),user_name : me.sel.get('username')});
        w.show();
    },
    add : function(){
    	var me = this;
    	console.log(me.getView());
    	var w = Ext.widget('frmPermanentUserAdd',{grid:me.getView().down('gridPermanentUsers')});
        w.show(); 
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getView().down('#asMenu').show();	    	  	 
    },
    radius	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmRadiusClient',{grid:me.getView().down('gridPermanentUsers'), user_id: me.sel.get('id'),user_name : me.sel.get('username'), user_type : 'permanent' });
    	w.show();    	
    },
    email	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmPermanentUserEmail',{grid:me.getView().down('gridPermanentUsers'), userId: me.sel.get('id'),username : me.sel.get('username'),email: me.sel.get('email') });
    	w.show();    	
    },
    detail	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('pnlPermanentUserDetail',{user_name : me.sel.get('username'), r: me.sel });
    	w.show();
    },
    graphs	: function(btn){
    	var me 			= this;
    	var containedIn = btn.up(me.getContainedIn());
		containedIn.setActiveItem(me.getCntRadiusGraphs());
		var cntRG 		= containedIn.getActiveItem();
		cntRG.getController().updateGraph({type: 'permanent',backTo : me.getCntPermanentUsers(),username:me.sel.get('username')});
		var ts 			= me.truncString(me.sel.get('username'),10,'...');
        me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-user fa-1x"></i> <i class="fa fa-chart-bar fa-1x"></i> '+ts); 
        me.getView().down('#asMenu').hide();
    },
    activity : function(btn){
    	var me 			= this;
    	var containedIn = btn.up(me.getContainedIn());
		containedIn.setActiveItem(me.getCntRadaccts());
		var cntRG 		= containedIn.getActiveItem();
		cntRG.getController().updateRadaccts({type: 'permanent',backTo : me.getCntPermanentUsers(),username:me.sel.get('username')});
		var ts 			= me.truncString(me.sel.get('username'),10,'...');
        me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-user fa-1x"></i> <i class="fa fa-running fa-1x"></i> '+ts); 
        me.getView().down('#asMenu').hide();
    },
    truncString : function truncString(str, max, add){
	   add = add || '...';
	   return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
	}
});
