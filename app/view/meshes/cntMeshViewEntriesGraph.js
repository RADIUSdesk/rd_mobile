// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.cntMeshViewEntriesGraph', {
    extend  : 'Ext.Container',
    xtype   : 'cntMeshViewEntriesGraph',
    controller  : 'vcMeshViewEntriesGraph',
    layout	: 'fit',
    requires	: [
        'RdMobile.view.meshes.vcMeshViewEntriesGraph'
    ],
	items   : [
        {
		        xtype : 'toolbar',
		        docked: 'top',
		        items: [
					{ ui: 'normal', iconCls: 'x-fa fa-arrow-left', itemId : 'btnBack'  },
					{
						xtype: 'label',
						html: '|'
					},
					{ ui: 'confirm', iconCls: 'x-fa fa-redo',	itemId : 'btnReload' },
					{ ui: 'normal',  iconCls: 'x-fa fa-calendar', 	itemId : 'btnDate' },
					{
						xtype	: 'label',
						itemId	: 'lblInfo',
						tpl	    : '<div style="color:#3e3f40;text-align: center;font-size:small">{day}<div style="font-size: xx-small;">{span}</div><div style="font-size: xx-small;">{timezone}</div></div>',
						data	: {}
					},
					{ xtype: 'spacer'},
					{
						xtype	: 'label',
						itemId	: 'lblMeta',
						tpl		: new Ext.XTemplate(
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">IN :</div>',
								'<div class="item-value" style="font-size: x-small;padding:0px;">{data_in}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">OUT :</div>',
								'<div class="item-value" style="font-size: x-small;padding:0px;">{data_out}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">TOTAL :</div>',
								'<div class="item-value" style="font-size: x-small;padding:0px;">{data_total}</div>',
							'</div>'
						),
						data	: {}
					}
		    ]
        }    
    ],                   
    scrollable : true,
	initialize: function (){      
        var me      = this; 
        var m       = 5;
        var p       = 5;   
        var s       = Ext.create('Ext.data.Store', {
            fields  :[ 
                {name: 'id',            type: 'int'},
                {name: 'name',          type: 'string'},
                {name: 'alias',         type: 'string'},
                {name: 'mac',           type: 'string'},
                {name: 'vendor',        type: 'string'},
                {name: 'data_in',       type: 'int'},
                {name: 'data_out',      type: 'int'},
                {name: 'data_total',    type: 'int'}
            ]
        });
        
        var s_nodes   = Ext.create('Ext.data.Store', {
            fields  :[ 
                {name: 'id',            type: 'int'},
                {name: 'name',          type: 'string'},
                {name: 'data_in',       type: 'int'},
                {name: 'data_out',      type: 'int'},
                {name: 'data_total',    type: 'int'}
            ]
        });
           
    var columns = [{
        text: 'Alias / MAC',
        dataIndex: 'name',
        flex: 1
    }, {
        text: 'Data',
        dataIndex: 'data',
        width: 100
    }];
     
    var grid = Ext.create('Ext.grid.Grid', {        
        store: s,    
        columns: columns,
        itemId	: 'gridTopTen',
        active	: true       
    });
               
 	me.setItems(      
	    { 
	    	xtype	: 'panel',
	    	title   : 'Top Ten Devices',
	    	itemId	: 'pnlTopTen',
	    	ui		: 'panel-blue',
	    	layout: {
				type        : 'card',
				pack        : 'start',
				align       : 'stretch',
				animation   : 'slide',
				deferredRender: true
			},
	    	items	: [
	    		grid,	    		
	    		{
				   xtype	: 'polar',
				   itemId	: 'plrTopTen',
				   layout 	: 'fit',
				   hidden	: true,			
				   interactions: ['rotate', 'itemhighlight'],
				   store	: s_nodes,
				   series	: {
                       type         : 'pie',                       
                       highlight    : true,
                       angleField   : 'data_total',
                       label        : {
                           field    : 'name',
                           display  : 'rotate'
                       },
                       donut        : 10,
                       tooltip : {
                            trackMouse: true,
                            renderer: function (tooltip, record, item) {
                                tooltip.setHtml(
                                    "<h2>"+record.get('name')+"</h2><h3>"+Ext.ux.bytesToHuman(record.get('data_total'))+"</h3>"                           
                                );
                            }
                        } 
                    }
		 		}		    		
	    	],
	    	tools: [
	    	{
				iconCls : 'x-fa fa-table',
				handler	: 'showTable',
				hidden	: true,
				itemId	: 'toolTable' 
			}, 
	    	{
				iconCls : 'x-fa fa-chart-pie',
				handler	: 'showPie',
				itemId	: 'toolPie'
			}, 
			{
				iconCls : 'x-fa fa-chart-bar',
				handler	: 'showBar',
				itemId	: 'toolBar'
			}]
		});    
        
   		var menu = Ext.create({
			xtype	: 'actionsheet',
			itemId	: 'asMenu',
			centered: false,
			title: 'MENU',
			 items: [
				 {
					 text		: 'Create Alias',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnAlias'
				 }
			 ]
		});     	
	 	me.add(menu);	 	
	 	this.callParent(arguments);
  	}
});
