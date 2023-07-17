Ext.define('RdMobile.view.activityMonitor.cntRadaccts', {
    extend  : 'Ext.Container',
    xtype   : 'cntRadaccts',
    controller  : 'vcRadaccts',
    requires	: [
        'RdMobile.view.activityMonitor.vcRadaccts',
        'RdMobile.view.activityMonitor.pnlRadacctDetail'
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
							'<div class="item-value" style="font-size: x-small;padding:0px;">{in}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl" style="font-size: x-small;padding:0px;">OUT :</div>',
							'<div class="item-value" style="font-size: x-small;padding:0px;">{out}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl" style="font-size: x-small;padding:0px;">TOTAL :</div>',
							'<div class="item-value" style="font-size: x-small;padding:0px;">{total}</div>',
						'</div>'
					),
					data	: {}
				}
		    ]
        },
        {
        	xtype: 'gridRadaccts'               
        }      
    ],                   
    scrollable : true,
	initialize: function (){
        const me 	= this;
        var dd 		= Ext.getApplication().getDashboardData();         
        var tz_id 	= dd.user.timezone_id;    
          	                  
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
							{ label: 'Daily', 	name: 'spanx', value: 'daily', checked: true },
							{ label: 'Weekly', 	name: 'spanx', value: 'weekly'},
							{ label: 'Monthly', name: 'spanx', value: 'monthly' }
						]
					},
					{
						xtype	: 'datefield',
						label	: 'Day',
						itemId  : 'day',
						format  : 'Y-m-d',
						value   : new Date()
					},
					{
						xtype	: 'cmbTimezones',
						value	: tz_id,
						name	: 'tz_radacct'
					}					     
				 ]
		 	}
	 	);	 	
	 	me.add(asDate);
	 	
	 	 var menu = Ext.create({
			 xtype	: 'actionsheet',
			 itemId	: 'asMenu',
			 centered: false,
			 title: 'MENU',
				 items: [
				 	{
						 text		: 'More Detail',
						 iconCls	: 'x-fa fa-info-circle',
						 textAlign  : 'left',
						 itemId		: 'btnDetail'
					 },
					 {
						 text		: 'Graphs',
						 iconCls	: 'x-fa fa-chart-bar',
						 textAlign  : 'left',
						 itemId		: 'btnGraphs'
					 }
				 ]
		 	}
	 	);	 	
	 	me.add(menu);
	 	
  	}
});
