// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.cntMeshViewNodesGraph', {
    extend  : 'Ext.Container',
    xtype   : 'cntMeshViewNodesGraph',
    controller  : 'vcMeshViewNodesGraph',
    layout	: 'fit',
    requires	: [
        'RdMobile.view.meshes.vcMeshViewNodesGraph',
        'RdMobile.view.meshes.cmbMeshViewNodes'
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
						padding	: 5,
						tpl	    : new Ext.XTemplate(
							'<div style="color:#3e3f40;text-align: center;font-size:small">{mesh_name}',
								'<div style="font-size: x-small;">{node}</div>',
								'<div style="font-size: x-small;">{span}</div>',
							'</div>'
						),
						data	: {}
					},
					{ xtype: 'spacer'},
					{
						xtype	: 'label',
						itemId	: 'lblMeta',
						tpl		: new Ext.XTemplate(
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">IN : </div>',
								'<div class="item-value" style="font-size: x-small;padding:0px;">{data_in}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">OUT : </div>',
								'<div class="item-value" style="font-size: x-small;padding:0px;">{data_out}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">TOTAL : </div>',
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
                  
    var columns = [
		{ 
        	text		: 'Alias / MAC Address',
        	dataIndex	: 'name',
        	flex		: 1,
        	hidden		: false,
        	xtype       : 'templatecolumn',
        	cell		: {
				encodeHtml : false
			},
			tpl      	: new Ext.XTemplate(
			    '<tpl if="cloud_flag & block_flag">',
			    	'<tpl if="alias">{alias}<tpl else>{mac}</tpl>',
			        '  <span style="font-size:110%;color:#cc6600;"><i class="fa fa-cloud"></i>  <i class="fa fa-ban"></i></span>',
			   	'<tpl elseif="cloud_flag & firewall_flag">',
			    	'<tpl if="alias">{alias}<tpl else>{mac}</tpl>',
			    	'  <span style="font-size:110%;color:#cc6600;"><i class="fa fa-cloud"></i>  <i class="fa fa-fire"></i></span> {fw_profile}</span>',
			    '<tpl elseif="cloud_flag & limit_flag">',
			    	'<tpl if="alias">{alias}<tpl else>{mac}</tpl>',
			    	'  <span style="font-size:110%;color:#cc6600;"><i class="fa fa-cloud"></i>  <i class="fa fa-tachometer-alt"></i> </span>',
			    '<tpl elseif="block_flag">',
			    	'<tpl if="alias">{alias}<tpl else>{mac}</tpl>',
			        '  <span style="font-size:110%;color:#cc6600;"><i class="fa fa-ban"></i></span>',
			  	'<tpl elseif="firewall_flag">',
			    	'<tpl if="alias">{alias}<tpl else>{mac}</tpl>',
			        '  <span style="font-size:110%;color:#cc6600;"><i class="fa fa-fire"></i> {fw_profile}</span>',
			    '<tpl elseif="limit_flag">',
			    	'<tpl if="alias">{alias}<tpl else>{mac}</tpl>',
			        '  <span style="font-size:110%;color:#cc6600;"><i class="fa fa-tachometer-alt"></i> </span>',
			    '<tpl else>',
			        '<tpl if="alias">{alias}<tpl else>{mac}</tpl>',
			    '</tpl>'
			)   
        },
		{ 
			text		: 'Data Total',
			dataIndex	: 'data_total',
			cell		: {
				cls		    : 'gridMain'
			},
			renderer: function(value){
		    	return Ext.ux.bytesToHuman(value)              
		  	} 
	   	}    
    ];
     
    var grid = Ext.create('Ext.grid.Grid', {        
        store: s,    
        columns: columns,
        itemId	: 'gridTopTen',
        active	: true       
    });
    
    var store_bar    = Ext.create(Ext.data.Store,{model: 'RdMobile.model.mUserStat'});
               
 	me.setItems(      
	    { 
	    	xtype	: 'panel',
	    	title   : 'Top Ten Devices',
	    	itemId	: 'pnlTopTen',
	    	ui		: 'panel-blue',
	    	masked: {
				xtype	: 'loadmask',
				message	: 'Loading....'
			},
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
				   interactions: ['rotate', 'itemhighlight'],
				   store	: s,
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
		 		},
		 		{
		 			xtype	: 'cartesian',
		 			itemId	: 'crtTopTen',
		 			store	: store_bar,
		 			axes: [
				        {
				            type        : 'numeric',
				            position    : 'left',
				            adjustByMajorUnit: true,
				            grid        : true,
				            fields      : ['data_in', 'data_out'],
				            renderer    : function(axis, label, layoutContext) {
				                return Ext.ux.bytesToHuman(label);
				            },
				            minimum: 0
				        }, {
				            type        : 'category',
				            position    : 'bottom',
				            grid        : false,
				            fields      : ['time_unit']
				        }
				    ],
				   	series: [
				        {
				            type    : 'bar',
				            title   : [ 'Data In', 'Data out' ],
				            xField  : 'time_unit',
				            yField  : ['data_in', 'data_out'],
				            stacked : true,
				            style   : {
				                opacity: 0.80
				            },
				            highlight: {
				                fillStyle: 'yellow'
				            }
				        }
				    ]		 		
		 		},
		 		{
				   xtype	: 'polar',
				   itemId	: 'plrNodes',
				   layout 	: 'fit',		
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
					handler	: 'showTable'
				}, 
				{
					iconCls : 'x-fa fa-chart-pie',
					handler	: 'showPie'
				}, 
				{
					iconCls : 'x-fa fa-chart-bar',
					handler	: 'showBar'
				},
				{
					iconCls : 'x-fa fa-balance-scale',
					handler	: 'showNodesPie'
				}
			]
		});
		
		
		var asDate 	= Ext.create({
			xtype	: 'actionsheet',
			itemId	: 'asDate',
			centered: false,
			title: 'DATE',
			tools: [
			{
				type: 'close',
				handler: 'asClose'
			}],
			items: [
				 	{
						xtype: 'radiogroup',
						vertical: false,
						itemId	: 'rgrpSpan',
						height	: 100,
						items: [
							{ label: 'Now', 	name: 's_n', value: 'hour', checked: true },
							{ label: '24 Hours',name: 's_n', value: 'day'},
							{ label: '7 Days', 	name: 's_n', value: 'week' }
						]
					},
					{
						xtype	: 'cmbMeshViewNodes'
					}				     
				 ]
		 	});	 	
		me.add(asDate);
		    
        
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
