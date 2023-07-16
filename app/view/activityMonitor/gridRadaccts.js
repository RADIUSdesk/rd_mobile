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
                url         : '/cake4/rd_cake/radaccts/index.json',
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
                	this.up('cntRadaccts').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">SESSIONS</div></div>');
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
                    '</div>',
                    {
			            isRecent: function(value_human) {
			            	var color = 'grey';
			            	if(
					            (value_human.match(/just now/g))||
					            (value_human.match(/minute/g))||
					            (value_human.match(/second/g))
					        ){
					            color = 'green';
					        }
	        				return color;
	    				}
	    			}
                ),
				},
                flex: 1
            }]);
        //me.getStore().reload()		
		this.callParent();     
    }
 });
