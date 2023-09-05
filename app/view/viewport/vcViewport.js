// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.viewport.vcViewport', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcViewport',
    config  : {
        urlCheckToken:          '/cake4/rd_cake/dashboard/check_token.json'
    },    
    control: {
        '#btnSettings': {
        	tap	: 'onBtnSettingsTap'
        },
        '#btnPassword': {
        	tap	: 'onBtnPasswordTap'
        },
        '#btnLogout' : {
        	tap	: 'onBtnLogoutTap'
        },
        '#cmbMainCloud' : {
        	change	: 'onCloudChange'
        }
    },
    
    listen  : {
        //To listen to "login", "logout" and also any unmatchedroute events fired by any controller
        controller: {
            '*': {
                login           : 'onLogin',
                logout          : 'onLogout',
                info            : 'onInfo',
                mainSubmitOk    : 'onMainSubmitOk'
            }
        }
    },
    
    
    routes : {
        'user/:id' : {
            before  : 'onBeforeUser',
            action  : 'onUser'
        }
    },
    
    onLaunch: function() {
    	var me = this;
    	me.restoreSession();   
        //me.getView().add({
        //    xtype: 'pnlMain'
        //});                 
    },
    showView: function(xtype) {
    	var me = this;
        var view = me.lookup(xtype),
        viewport = me.getView();
        if (!view) {
            viewport.removeAll(true);
            view = viewport.add({
                xtype: xtype,
                reference: xtype
            });
        }else{
        	viewport.removeAll(true);
        	viewport.add(view);
      	}
    }, 
    
    onLogin: function(session) {    	
        this.initiateSession(session);
    },
    onLogout: function(){
        this.showView('cntLogin'); 
    },
    onLogout: function() {
        var me  = this,
        view    = me.getView();
        me.terminateSession();
        view.setMasked({ xtype: 'loadmask' });
        view.setMasked(false);
        this.showView('cntLogin');
        return;
    },
       
    onInfo: function(){
        this.showView('cntInfo');
    }, 
    
    onMainSubmitOk: function(){
        this.showView('pnlMainComplete');
    },
    
    initiateSession: function(session) {
    	me = this;
        if(session.token != undefined){
            Ext.Ajax.setExtraParams({});
            Ext.Ajax.setExtraParams({'token': session.token});
        }
        this.saveSession(session);
    	if(session.user.cloud_id){
    		me.setCloudId(session.user.cloud_id);
    	}    	
    	//Set the dashboard data
    	Ext.getApplication().setDashboardData(session);
    	        
        this.showMain();
    },   
          
    restoreSession: function() {
        var me      = this;
        var session = RdMobile.util.State.get('session');
        if(session !== null && session.token !== undefined){
            me.checkToken(session.token).catch(function(error) {
				me.showAuth();
			}).then(function(authData) {
                if(authData != undefined){	
					me.onLogin(authData.data);
				}
				return;
			});  
        }else{
            me.showAuth();
        }
    },
    showAuth: function() {
    	var me = this;
        me.showView('cntLogin');
    },     
    showMain: function() {
        this.showView('pnlMain');
    },
    terminateSession: function() {
        this.saveSession(null);
    },
    saveSession: function(session) {
        RdMobile.util.State.set('session', session);
        this.session = session;
    }, 
    checkToken: function(token){
		var me = this;
        return new Ext.Promise(function (resolve, reject) {  
            //Check if the back-end likes our token
            Ext.Ajax.request({
                url     : me.getUrlCheckToken(),
                params  : {
                    token  : token
                },
                method  : 'GET',
                success : function(response){
                    var jsonData = Ext.JSON.decode(response.responseText);
                    //Set the phrases
                    if(jsonData.success){ //Token is ok, let us continiue
                        resolve(jsonData);
                    }else{
                        reject(response.status+':'+response.statusText);
                    }
                },
				failure: function(response, opts) {
					 reject(response.status+':'+response.statusText);
				}
            });
		});
	},
	onBtnSettingsTap: function(){
		var me = this;
		var p = Ext.Ajax.getExtraParams();		
		Ext.Viewport.hideMenu('left',false);
		var w  = Ext.widget('frmMainSettings',{api_key : p.token});
        w.show();
	
	},
	onBtnPasswordTap: function(){
		var me = this;
		Ext.Viewport.hideMenu('left',false);
		var w  = Ext.widget('frmMainPassword',{});
        w.show();	
	},
	onBtnLogoutTap: function(){
		var me = this;
		console.log("Logout Tapped");
		Ext.Viewport.hideMenu('left');
		me.onLogout();
	},
	onCloudChange	: function(cmb,value){
    	var me = this;   	
    	setTimeout(function(){
    		me.setCloudId(value);
    		Ext.Viewport.hideMenu('left');
    		Ext.toast({
				message		: 'Switched To Different Cloud',
				alignment	: 'tc-tc',
				timeout		: 2000
			}); 
    		
    		var record  = cmb.getSelection();
    		var cloud_name = 'Unknown';
		    if(record != null){
		        cloud_name =record.get('name');
		    }   		
    		var l = Ext.ComponentQuery.query('#lblCloud');
        	var lbl = l[0];
        	
        	lbl.setData({
        		cloud_name 	: cloud_name,
		    	warn_flag	: false      	
        	})		
    		 		
    	}, 1000); 
    },
    setCloudId	: function(cloud_id){
    	var me 			= this;
    	var e_p			= Ext.Ajax.getExtraParams();
    	e_p.cloud_id	= cloud_id;
    	Ext.Ajax.setExtraParams(e_p);  
    }
});

