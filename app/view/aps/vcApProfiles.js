// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.vcApProfiles', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcApProfiles',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/ap-profiles/delete.json',
        containedIn			: 'cntMainNetworks',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        asMenu				: false	
    },
    control: {
    	'cntApProfiles' : {
    		show	: 'show',
    		hide	: 'hide',
    		initialize : 'initCnt'    		
    	},
        'gridApProfiles': {
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
      	'#cmbEdit' : {
      		select: 'cmbEditChange'
      	}       	
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asMenu'));
    	me.getAsMenu().down('#btnDelete').on('tap', 	this.delete, this);
    	me.getAsMenu().down('#cmbEdit').on('select', 	this.cmbEditChange, this);
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
    	me.getView().down('gridApProfiles').getStore().reload();  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridApProfiles').getStore();
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
    	var store 	= me.getView().down('gridApProfiles').getStore();
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
    	var w = Ext.widget('frmApProfileAdd',{grid:me.getView().down('gridApProfiles')});
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
    	var w = Ext.widget('pnlApProfileDetail',{ap_profile_name : me.sel.get('name'), r: me.sel });
    	w.show();
    },
    cmbEditChange : function(a,value){
    	var me 	= this;
    	var b 	= a.getValue();
    	if(b == 'general'){
    		var w = Ext.widget('frmApEditGeneral',{ap_profile_name : me.sel.get('name'),grid:me.getView().down('gridApProfiles'), apProfileId : me.sel.get('id') });
    		w.show();
    	}
    	if(b == 'ssids'){
    		var containedIn = me.getView().up(me.getContainedIn());
    		var cnt = containedIn.down('cntAccessPointEntries');
    		if(!cnt){
				var cn = Ext.create({
					xtype	: 'cntAccessPointEntries',
					layout	: 'fit'
				});
				cnt = containedIn.add(cn);
			} 	
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			cntRG.getController().updateEntries({ap_profile_name : me.sel.get('name'), ap_profile_id : me.sel.get('id')});
        	me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-cubes fa-1x"></i> <i class="fa fa-pen fa-1x"></i> SSIDs'); 
    	}
    	
    	if(b == 'exit_points'){
    		var containedIn = me.getView().up(me.getContainedIn());
    		var cnt = containedIn.down('cntAccessPointExits');
    		if(!cnt){
				var cn = Ext.create({
					xtype	: 'cntAccessPointExits',
					layout	: 'fit'
				});
				cnt = containedIn.add(cn);
			} 	
			containedIn.setActiveItem(cnt);
			var cntRG 	= containedIn.getActiveItem();
			cntRG.getController().updateExits({ap_profile_name : me.sel.get('name'), ap_profile_id : me.sel.get('id')});
			me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-cubes fa-1x"></i> <i class="fa fa-pen fa-1x"></i> Exit Points');
    	}
    	
    	if(b == 'common_settings'){
    		var w = Ext.widget('frmAccessPointCommonSettings',{ap_profile_name : me.sel.get('name'),grid:me.getView().down('gridApProfiles'), apProfileId : me.sel.get('id')});
    		w.show();
    	}
    	
    	if(b == 'aps'){
    		me.showAps();
    	}
    	
    	setTimeout(function(){
    		me.getAsMenu().hide();  //ON Slow browsers cause double trigger
    		a.setValue('choose_one');   		
    	}, 1000);			    
    },
    showAps : function(){
    	var me = this;
    	var containedIn = me.getView().up(me.getContainedIn());
		var cnt = containedIn.down('cntAps');
		if(!cnt){
			var cn = Ext.create({
				xtype	: 'cntAps',
				layout	: 'fit'
			});
			cnt = containedIn.add(cn);
		}
		containedIn.setActiveItem(cnt);
		var cntRG 	= containedIn.getActiveItem();
		cntRG.getController().apsForProfile({ap_profile_name : me.sel.get('name'), ap_profile_id : me.sel.get('id')});
		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-sitemap fa-1x"></i> <i class="fa fa-cube fa-1x"></i> APs');    
    } 
});
