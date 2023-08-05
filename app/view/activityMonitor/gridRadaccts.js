Ext.define('RdMobile.view.activityMonitor.gridRadaccts', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridRadaccts',
    emptyText: 'No Radaccts Available',
    config  : {
        compdata: undefined,
    },
    requires: [
        'Ext.grid.plugin.PagingToolbar'
    ],
    hideHeaders: true,
    rowLines: true,
    trackMouseOver: false,
    viewConfig: {
        stripeRows: false
    },
    rowLines: false,
    disableSelection: true,
    plugins: {
        gridpagingtoolbar: true
    },
    selectable: {
		mode: 'single',
	},
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mRadacct', 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/radaccts/index-with-span.json',
                pageSize	: 50,
                batchActions: true,
                format      : 'json',
                reader: {
			        type: 'json',
			        rootProperty: 'items',
			        messageProperty: 'message',
			        totalProperty: 'totalCount' //Required for dynamic paging
			    }
            },
            listeners: {
            	load: function(store, records, successful) {
                    if(!successful){
                        console.log('Error encountered');
                    } 
                },
                exception: function(proxy, response, options) {
		            var jsonData = response.responseJson;
		            console.log('Error encountered');
		        },
		        metachange : function(store,meta,options) {
                	var totalIn     = Ext.ux.bytesToHuman(meta.totalIn);
                    var totalOut    = Ext.ux.bytesToHuman(meta.totalOut);
                    var totalInOut  = Ext.ux.bytesToHuman(meta.totalInOut);             
                	this.up('cntRadaccts').down('#lblMeta').setData({
                		in 		: totalIn,
                		out		: totalOut,
                		total	: totalInOut
                	});
                },
                scope: this
            },
            autoLoad	: false,
            remoteFilter: true,
            remoteSort  : true
        }));
        
        me.setColumns( [{
                text: 'Sessions',
                xtype: 'templatecolumn',                             
                cell: {
					encodeHtml: false,
					tpl: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
	                	'<div class="item-main">',
			            	'{username}',
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl">Start time :</div>',							
							'<div class="item-value">{acctstarttime}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Stop time :</div>',
							"<tpl if='active'>",
								'<div class="item-value clr-grey-dark" style="color: #1e5304; background: #d4e0ce;border-radius:3px;border:1px solid #1e5304;">{online_human} online</div>',
							'<tpl else>',
								'<div class="item-value">{acctstoptime}</div>',
							'</tpl>',							
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Session Time :</div>',							
							'<div class="item-value">{[Ext.ux.secondsToHuman(values.acctsessiontime)]}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Data Usage :</div>',							
							'<div class="item-value"><span class="clr-grey-dark">In</span><b> {[Ext.ux.bytesToHuman(values.acctinputoctets)]} </b><span class="clr-grey-dark">Out</span><b> {[Ext.ux.bytesToHuman(values.acctoutputoctets)]}</b> </div>',
						'</div>',
                    '</div>'	    			
                ),
				},
                flex: 1
            }]);	
		this.callParent();     
    }
 });
