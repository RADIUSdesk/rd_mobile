Ext.define('RdMobile.view.viewport.vcViewport', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcViewport',
    config  : {
        urlCheckToken:          '/cake4/rd_cake/dashboard/check_token.json'
    },
    
    control: {
         '#btnCloud': {
            tap : 'onBtnCloudTap'
        },
        '#btnPassword': {
        	tap	: 'onBtnPasswordTap'
        },
        '#btnLogout' : {
        	tap	: 'onBtnLogoutTap'
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
        	viewport.add(view);
        	viewport.setActiveItem(view);
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
        if(session.token != undefined){
            Ext.Ajax.setExtraParams({});
            Ext.Ajax.setExtraParams({'token': session.token});
        }
        this.saveSession(session);
    
    	var extra_p 	 = Ext.Ajax.getExtraParams();
    	if(session.user.cloud_id){
    		extra_p.cloud_id = session.user.cloud_id;
    		Ext.Ajax.setExtraParams(extra_p);	
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
    	console.log("Gooi LoginMMM");
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
	onBtnCloudTap: function(){
		var me = this;
		console.log("Cloud Tapped");
		Ext.Viewport.hideMenu('left');
	
	},
	onBtnPasswordTap: function(){
		var me = this;
		console.log("Password Tapped");
		Ext.Viewport.hideMenu('left');
	},
	onBtnLogoutTap: function(){
		var me = this;
		console.log("Logout Tapped");
		Ext.Viewport.hideMenu('left');
		me.onLogout();
	}
});

