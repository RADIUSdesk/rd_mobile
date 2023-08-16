// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.vcMeshViewEntriesGraph', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMeshViewEntriesGraph',
    config	: {
        containedIn		: 'cntMainNetworks',
        backTo			: 0,
        meshId			: undefined,
        koos			: undefined,
        mac             : false,
        urlUsageForSsid : '/cake4/rd_cake/wifi-charts/usage-for-ssid.json',
        urlEditAlias    : '/cake4/rd_cake/wifi-charts/edit-mac-alias.json',
        urlEditLimit    : '/cake4/rd_cake/wifi-charts/edit-mac-limit.json',
        UrlEditBlock	: '/cake4/rd_cake/wifi-charts/edit-mac-block.json',
        UrlEditFirewall	: '/cake4/rd_cake/wifi-charts/edit-mac-firewall.json'
    },
    control: {
    	'cntMeshViewEntriesGraph' : {
    		show	: 'show'
    	},
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	}
    },
    show	: function(){
    	var me = this;
    	me.reload();
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
    	//me.reload();
    },
    reload	: function(btn){
    	var me = this;
    	
    	var dd      = Ext.getApplication().getDashboardData();
        var tz_id   = dd.user.timezone_id; 
		var	t 		= 'mesh_entries';
		var span 	= 'week';
		var ssid_id = false;
        var node_id = false;	

        var mesh_id = me.getMeshId();
        Ext.Ajax.request({
            url: me.getUrlUsageForSsid(),
            params: {
                type        : t,
                span        : span,
                mesh_id     : mesh_id,
                timezone_id : tz_id,
                mesh_entry_id : ssid_id,
                node_id     : node_id,
                mac         : me.getMac()
            },
            method: 'GET',
            success: function(response){
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
    	me.getView().down('#toolPie').hide();
    	me.getView().down('#toolTable').show();
    	me.getView().down('#toolBar').show();
    	me.getView().down('#pnlTopTen').setActiveItem(a);
    },
    showBar	: function(btn){
    	var me = this;
    },
    showTable : function(btn){
    	var me = this;
    	var a = me.getView().down('#gridTopTen');
    	me.getView().down('#toolPie').show();
    	me.getView().down('#toolTable').hide();
    	me.getView().down('#toolBar').show();
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
        
        /*
             
        if(data.node_data !== undefined){   
            me.getView().down('#plrNodes').getStore().setData(data.node_data);
        }
        
        if(data.device_info !== undefined){
        
            //===Signal NOW===
            var bar = data.device_info.signal_bar;           
            if(bar > 0.5){
                var cls = "wifigreen";
                me.getView().down('#pbSnow').toggleCls("wifiyellow",false);
                me.getView().down('#pbSnow').toggleCls("wifired",false);
                me.getView().down('#pbSnow').toggleCls(cls,true);     
            } 
            if((bar >= 0.3)&(bar <= 0.5)){
                cls = "wifiyellow";
                me.getView().down('#pbSnow').toggleCls("wifigreen",false);
                me.getView().down('#pbSnow').toggleCls("wifired",false);
                me.getView().down('#pbSnow').toggleCls(cls,true);   
            }
            if(bar < 0.3){
                cls = "wifired"
                me.getView().down('#pbSnow').toggleCls("wifigreen",false);
                me.getView().down('#pbSnow').toggleCls("wifiyellow",false);
                me.getView().down('#pbSnow').toggleCls(cls,true);   
            }
            var str_data_usage = '<i class="fa fa-wifi"></i>  Signal Now '+data.device_info.signal_now+' dBm';          
            me.getView().down('#pbSnow').show().setValue(bar).updateText(str_data_usage);
            
            //===Signal Average===            
            var bar_avg = data.device_info.signal_avg_bar;           
            if(bar_avg > 0.5){
                var cls = "wifigreen";
                me.getView().down('#pbSavg').toggleCls("wifiyellow",false);
                me.getView().down('#pbSavg').toggleCls("wifired",false);
                me.getView().down('#pbSavg').toggleCls(cls,true);     
            } 
            if((bar_avg >= 0.3)&(bar_avg <= 0.5)){
                cls = "wifiyellow";
                me.getView().down('#pbSavg').toggleCls("wifigreen",false);
                me.getView().down('#pbSavg').toggleCls("wifired",false);
                me.getView().down('#pbSavg').toggleCls(cls,true);   
            }
            if(bar_avg < 0.3){
                cls = "wifired"
                me.getView().down('#pbSavg').toggleCls("wifigreen",false);
                me.getView().down('#pbSavg').toggleCls("wifiyellow",false);
                me.getView().down('#pbSavg').toggleCls(cls,true);   
            }
            var str_data_usage = '<i class="fa fa-wifi"></i>  Signal Average '+data.device_info.signal_avg+' dBm';          
            me.getView().down('#pbSavg').show().setValue(bar_avg).updateText(str_data_usage);
         
            me.getView().down('#pnlInfo').setData(data.device_info)
        }*/
    },
});
