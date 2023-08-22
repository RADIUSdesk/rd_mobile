// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.pnlWifiMacConnectInfo', {
    extend  	: 'Ext.Panel',
    xtype   	: 'pnlWifiMacConnectInfo',
    floated		: true,
    modal		: true,
    centered	: true,
    closable	: true,
    fullscreen 	: true,
    padding		: 6,
    scrollable	: true,
    iconCls 	: 'x-fa fa-wifi',    
    initialize	: function (){
        const me = this;
        me.setTitle(me.mac);
     	var items = [
     		{	
		 		xtype	: 'container',
		 		itemId	: 'cntUsage', 	
			 	tpl		: new Ext.XTemplate(
					'<div class="detail-section">',
					'Data Usage',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="font-size:larger;padding:5px;">IN : </div>',
						'<div class="item-value" style="font-size:larger;padding:5px;">{data_in}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="font-size:larger;padding:5px;">OUT : </div>',
						'<div class="item-value" style="font-size:larger;padding:5px;">{data_out}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="font-size:larger;padding:5px;">TOTAL : </div>',
						'<div class="item-value" style="font-size:larger;padding:5px;">{data_total}</div>',
					'</div>'
				),
				data : {}
			},
     		{	
		 		xtype	: 'container',
		 		itemId	: 'cntInfo',	
			 	tpl		: new Ext.XTemplate(
					'<div class="detail-section">',
					'Connection Info',
					'</div>',
					"<div>",   
                        '<ul class="fa-ul">',    
                            "<li style='color:#3c6cb7;'><i class='fa-li fa  fa-tablet'></i>{mac}",
                                "<tpl if='(!Ext.isEmpty(vendor))'>",
                                    "<br><span style='color:#353535;'>({vendor})</span>",
                                "</tpl>",
                            "</li>",
                            "<li style='color:#238080;'><i class='fa-li fa fa-wifi'></i> {mesh_entry.name}",               
                                "<span style='color:#353535;'>  (",
                                "<tpl if='frequency_band == \"two\"'>",
                                    "2.4GHz",
                                "</tpl>",
                                "<tpl if='frequency_band == \"five_lower\"'>",
                                    "5GHz-Lower",
                                "</tpl>",
                                "<tpl if='frequency_band == \"five_upper\"'>",
                                    "5GHz-Upper",
                                "</tpl>",
                                ")</span>",
                            "</li>",
                            "<li><i class='fa-li fa  fa-cube'></i> {node.name}</li>",  
                            "<li><i class='fa-li fa  fa-clock'></i><b>Last Seen</b> {last_seen}</li>",
                        '</ul>',
                        "<tpl if='type == \"device\"'>",
                            "<div style='text-align:center;color:white;background-color:coral;'><b>Recent Connections</b></div>",
                            '<ul style="list-style: none;padding-left:4px;">',
                            '<tpl for="device_history">',
                                "<li style='color:#238080;'><b>{nasname}</b> <span style='color:#353535;font-size:smaller;'>{last_seen_human}</span></li>",
                            '</tpl>',
                            '</ul>',
                        "</tpl>",
                    '</div>'
				),
				data : {}
			},
			
     		{
            	xtype		: 'rdCustomProgressBar',
				minGradient	: {red: 179, green: 0, blue: 3},
				midGradient	: {red: 179, green: 125, blue: 0},
				maxGradient	: {red: 2, green: 92, blue: 6},
				value		: me.bigData.device_info.signal_bar,
				text		: 'Signal Now '+me.bigData.device_info.signal_now+' dBm',
				margin		: '0 0 20 0'
			},
			{
            	xtype		: 'rdCustomProgressBar',
				minGradient	: {red: 179, green: 0, blue: 3},
				midGradient	: {red: 179, green: 125, blue: 0},
				maxGradient	: {red: 2, green: 92, blue: 6},
				value		: me.bigData.device_info.signal_avg_bar,
				text		: 'Signal Average '+me.bigData.device_info.signal_avg+' dBm',
				margin		: '0 0 20 0'
			}
		 	
		];    	
     	me.setItems(items); 
     	me.down('#cntInfo').setData(me.bigData.device_info);
     	me.down('#cntUsage').setData(me.bigData.totals);     	
  	}
});
