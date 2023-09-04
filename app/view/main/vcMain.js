// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.main.vcMain', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMain',
    control: {
    	'pnlMain' : {
    		painted : 'onMainPainted'
    	},
       	'#tpMain': {
            beforeactiveitemchange: 'onTpMainChange'
        },
        '#btnMenu': {
        	tap	: 'onBtnMenuTap'
        }
    },
    routes : {
        'home' 		: 'onRouteHome',
        'radius'	: 'onRouteRadius',
        'networks'	: 'onRouteNetworks',
        'other'		: 'onRouteOther'
    },    
    onTpMainChange : function(tabPanel, newTab) {
    	var me = this;
   		console.log(newTab.getItemId());
   		me.redirectTo(newTab.getItemId());
   		//Within the handler func that handles the route
    	tabPanel.suspendEvent('beforeactiveitemchange');
    	tabPanel.setActiveItem(newTab);
    	tabPanel.resumeEvent('beforeactiveitemchange');                
    },
    onRouteHome	: function(){
    	var me = this;
    	me.getView().down('#tpMain').setActiveItem(0);  
    },
    onRouteRadius	: function(){
    	var me = this;
    	me.getView().down('#tpMain').setActiveItem(0);  
    },
    onRouteNetworks	: function(){
    	var me = this;
    	me.getView().down('#tpMain').setActiveItem(1);  
    },
    onRouteOther	: function(){
    	var me = this;
    	me.getView().down('#tpMain').setActiveItem(2);  
    },
    onBtnMenuTap 	: function(){
    	var me = this;
    	Ext.Viewport.showMenu('left');   	
    },
    onMainPainted : function(){
    	var me = this;
    	console.log("Main Painted");
    	var dd = Ext.getApplication().getDashboardData();
    	if(dd.user.cloud_count == 0){
        	var w = Ext.widget('frmWizard',{});
    		w.show();
    	}  
    }
});
