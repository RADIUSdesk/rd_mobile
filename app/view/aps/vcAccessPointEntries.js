// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.vcAccessPointEntries', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcAccessPointEntries',
    config: {
        urlDelete   : '/cake4/rd_cake/ap-profiles/ap-profile-entry-delete.json',
        urlAdd		: '/cake4/rd_cake/ap-profiles/ap-profile-entry-add.json',
        urlView		: '/cake4/rd_cake/ap-profiles/ap-profile-entry-view.json',
        urlEdit		: '/cake4/rd_cake/ap-profiles/ap-profile-entry-edit.json',
        containedIn	: 'cntMainNetworks',
        backTo		: 0,
        apProfileId		: undefined
    },
    control: {
    	'cntAccessPointEntries' : {
    		show	: 'show',
    		hide	: 'hide'
    	},
    	'gridAccessPointEntries': {
            select: 'onGridChildTap'
        },
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	},
      	'#btnAdd' : {
      		tap	: 'add'
      	},
      	'#btnDelete' : {
      		tap	: 'delete'
      	},
      	'#btnEdit' : {
      		tap	: 'edit'
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
        var m = c.down('cntApProfiles');       
        c.setActiveItem(m);
        me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-cubes fa-1x"></i> AP Profiles');
    }, 
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridAccessPointEntries').getStore().reload(); 
  
    },
    updateEntries : function(info){
    	var me = this;
    	me.setApProfileId(info.ap_profile_id);
    	me.getView().down('gridAccessPointEntries').getStore().getProxy().setExtraParam('ap_profile_id',info.ap_profile_id);
    	me.reload();    
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
    add : function(){
    	var me = this;
        var w = Ext.widget('frmWifiEntryPoint',{grid:me.getView().down('gridAccessPointEntries'),'apProfileId': me.getApProfileId(),'submitUrl' : me.getUrlAdd()});
        w.setTitle('Add SSID');
        w.show(); 
    },
    edit : function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
        var entry_id  = me.sel.get('id');
        Ext.Ajax.request({
			url		: me.getUrlView(),
			method	: 'get',
		  	params	: {entry_id : entry_id},
		  	success: function(response) {
		  		var jsonData	= Ext.JSON.decode(response.responseText);
        		if(jsonData.success){
				    var w = Ext.widget('frmWifiEntryPoint',{grid:me.getView().down('gridAccessPointEntries'),'submitUrl' : me.getUrlEdit(),'apProfileId': me.getApProfileId()});
				    w.setValues(jsonData.data);
				    w.setIconCls('x-fa fa-pencil-alt');
				    w.setTitle('Edit SSID');
        			w.show();       			        
        		}
		  	},
		  	failure: function() {
		    	console.log('in failure');
		  	}
		});      
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getView().down('#asMenu').show();	    	  	 
    }
});
