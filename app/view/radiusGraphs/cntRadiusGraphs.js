Ext.define('RdMobile.view.radiusGraphs.cntRadiusGraphs', {
    extend  : 'Ext.Container',
    xtype   : 'cntRadiusGraphs',
    controller  : 'vcRadiusGraphs',
    requires	: [
        'RdMobile.view.radiusGraphs.vcRadiusGraphs'
    ],
	initialize: function (){
        const me 	= this;      
        var dd 		= Ext.getApplication().getDashboardData();         
        var tz_id 	= dd.user.timezone_id;       
        var store   = Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mUserStat',
            proxy: {
                type        : 'ajax',
                format      : 'json',
               // extraParams : { 'username' : me.username, 'type' : me.type, 'span' : me.span, 'timezone_id' : me.timezone_id },
                url         : '/cake4/rd_cake/user-stats/index.json',
                reader      : {
                    type            : 'json',
                    rootProperty    : 'items',
                    messageProperty : 'message'
                }
            },
            listeners   : {
                beforeload  : function(s){
                	console.log("Lekker");
                    me.down('#chrtUsage').setMasked(true); //show the mask
                },
                load        : function(s){
                    me.down('#chrtUsage').setMasked(false);
                   /* var rawData     = chart.getStore().getProxy().getReader().rawData;
                    var totalIn     = Ext.ux.bytesToHuman(rawData.totalIn);
                    var totalOut    = Ext.ux.bytesToHuman(rawData.totalOut);
                    var totalInOut  = Ext.ux.bytesToHuman(rawData.totalInOut);
                    me.down('#totals').update({'in': totalIn, 'out': totalOut, 'total': totalInOut });*/
                }
            },
            autoLoad: false   
        });
               
        me.setItems([
        	{
				    xtype : 'toolbar',
				    docked: 'top',
				    items: [
						{ ui: 'normal', iconCls: 'x-fa fa-arrow-left', itemId : 'btnBack'  },
						{
							xtype: 'label',
							html: '|'
						},
						{ ui: 'confirm', iconCls: 'x-fa fa-redo',			itemId : 'btnReload' },
						{ ui: 'normal',  iconCls: 'x-fa fa-calendar', 	itemId : 'btnDate' },
						{
							xtype	: 'label',
							itemId	: 'lblInfo',
							html	: 'gooi hom'
						},
						{ xtype: 'spacer'},
						{
							xtype	: 'label',
							itemId	: 'lblMeta',
							html	: 'gooi haar'
						}
				]
		    },
        	{
				itemId	: 'chrtUsage',
				xtype	: 'cartesian',
				store	: store,
				axes	: [
			        {
			            type        : 'numeric',
			            position    : 'left',
			            adjustByMajorUnit: true,
			            grid        : true,
			            fields      : ['data_in', 'data_out'],
			            //renderer    : function(axis, label, layoutContext) {
			                //return Ext.ux.bytesToHuman(label);
			                //return label;
			            //},
			            minimum: 0
			        }, 
			        {
			            type        : 'category',
			            position    : 'bottom',
			            grid        : false,
			            fields      : ['time_unit']
			        }
			   ],
			   series: {
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
			}        
        ]);      
            
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
						{ label: 'Daily', 	name: 'span', value: 'daily', checked: true },
						{ label: 'Weekly', 	name: 'span', value: 'weekly'},
						{ label: 'Monthly', name: 'span', value: 'monthly' }
					]
				},
				{
				    xtype	: 'datefield',
				    label	: 'Day',
				    name   	: 'day',
				    itemId  : 'day',
				    format  : 'Y-m-d',
				    value   : new Date(),  // limited to the current date or after
				},
				{
					xtype	: 'cmbTimezones',
					value	: tz_id
				}					     
			 ]
	 	});	 	
	 	me.add(asDate);
  	}
});
