// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcMeshViewNodesGraph', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshViewNodesGraph',
    config	: {
        containedIn		: 'cntMainNetworks',
        backTo			: 0,
        meshId			: undefined,
        nodeId			: -1,
        meshName		: '',
        span			: 'hour', //can be hour / day /week
        mac             : false,
        urlUsageForSsid : '/cake4/rd_cake/wifi-charts/usage-for-ssid.json',
        urlEditAlias    : '/cake4/rd_cake/wifi-charts/edit-mac-alias.json',
        urlEditLimit    : '/cake4/rd_cake/wifi-charts/edit-mac-limit.json',
        UrlEditBlock	: '/cake4/rd_cake/wifi-charts/edit-mac-block.json',
        UrlEditFirewall	: '/cake4/rd_cake/wifi-charts/edit-mac-firewall.json'
    },
    control: {
    	'cntMeshViewNodesGraph' : {
    		show	: 'show'
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
      	'#rgrpSpan' : {
      		change 	: 'spanChange'
      	},
      	'cmbMeshViewNodes' : {
            change: 'onChangeNodes'
        }
    },
    show	: function(){
    	var me = this;   	
    	setTimeout(function(){ //FIXME We add a small delay in order to set everything up
    		me.reload();	
    	}, 1000);	
    },
    back : function(btn){
        var me = this;
        var c = btn.up(me.getContainedIn());
        var m = c.down('cntMeshes');       
        c.setActiveItem(m);
        me.getView().up('pnlMain').down('#lblMain').setHtml('MESH Networks');
    },
    doUpdateId : function(info){
    	var me = this;
    	var mesh_id = info.mesh_id;
    	me.setMeshId(mesh_id);
    	me.setMeshName(info.mesh_name);
    	me.getView().down('cmbMeshViewNodes').getStore().getProxy().setExtraParam('mesh_id',mesh_id);
    	me.getView().down('cmbMeshViewNodes').getStore().reload();
    	me.getView().down('cmbMeshViewNodes').setValue(-1); //Reset
    	me.reload();
    },
    reload	: function(btn){
    	var me = this;
    	
    	var dd      = Ext.getApplication().getDashboardData();
        var tz_id   = dd.user.timezone_id;      
		var	t 		= 'mesh_nodes';
		var ssid_id = me.getView().down('cmbMeshViewNodes').getValue();
        var node_id = false; 
              
        me.getView().down('#pnlTopTen').setMasked(true);

        Ext.Ajax.request({
            url: me.getUrlUsageForSsid(),
            params: {
                type        : t,
                span        : me.getSpan(),
                mesh_id     : me.getMeshId(),
                timezone_id : tz_id,
                mesh_entry_id : ssid_id,
                node_id     : me.getNodeId(),
                mac         : me.getMac()
            },
            method: 'GET',
            success: function(response){
            	me.getView().down('#pnlTopTen').setMasked(false);
                var jsonData = Ext.JSON.decode(response.responseText);                
                if(jsonData.success){    
                    me.paintDataUsage(jsonData.data);
                   
                }else{

                  
                }
            }
        }); 
    },
    showPie	: function(btn){
    	var me = this;
    	var a = me.getView().down('#plrTopTen');
    	me.getView().down('#pnlTopTen').setActiveItem(a);
    },
    showBar	: function(btn){
    	var me = this;
    	var a = me.getView().down('#crtTopTen');
    	me.getView().down('#pnlTopTen').setActiveItem(a);
    },
    showTable : function(btn){
    	var me = this;
    	var a = me.getView().down('#gridTopTen');
    	me.getView().down('#pnlTopTen').setActiveItem(a);  
    },
    showNodesPie : function(btn){
    	var me = this;
    	var a = me.getView().down('#plrNodes');
    	me.getView().down('#pnlTopTen').setActiveItem(a);  
    },
    paintDataUsage: function(data){
    
        var me					= this;
        var total    			= me.getView().down('#lblMeta');      
        data.totals.data_in     = Ext.ux.bytesToHuman(data.totals.data_in);
        data.totals.data_out    = Ext.ux.bytesToHuman(data.totals.data_out);
        data.totals.data_total  = Ext.ux.bytesToHuman(data.totals.data_total);
        
        total.setData(data.totals);     
       	me.getView().down('#gridTopTen').getStore().setData(data.top_ten);                
        me.getView().down('#plrTopTen').getStore().setData(data.top_ten);
        me.getView().down('#crtTopTen').getStore().setData(data.graph.items);
        me.getView().down('#plrNodes').getStore().setData(data.node_data);  
        
        me.updateInfo();
               
    },
    date	: function(tbn){
    	var me  = this;
    	me.getView().down('#asDate').show();
    },
    spanChange	: function(a,value){
    	var me = this;
    	me.setSpan(value);
        me.reload(); 	
    },
   	updateInfo	: function(){
    	var me 		= this;
    	var span  	= me.getSpan();
    	var node_id	= me.getView().down('cmbMeshViewNodes').getValue();		
    	var node_record = me.getView().down('cmbMeshViewNodes').getStore().findRecord('id',node_id);   	
    	me.getView().down('#lblInfo').setData({
    		mesh_name   : me.getMeshName(),
    		span		: span.toUpperCase(),
    		node		: node_record.get('name')
    	});   
    },
    asClose : function(){
    	var me = this
    	me.getView().down('#asDate').hide();
    },
    onChangeSsids: function(cmb){
        var me = this;
        me.reload();
    },
    onChangeNodes : function(cmb,value){
        var me = this;
        me.setNodeId(value);
        me.reload();
    }
});
