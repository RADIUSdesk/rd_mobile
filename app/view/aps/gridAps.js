// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.gridAps', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridAps',
    emptyText: 'No APs Found',
    config  : {
        compdata: undefined,
    },
    requires: [
        'Ext.grid.plugin.PagingToolbar',
        'RdMobile.view.aps.cntViewHardware'
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
		mode: 'single'
	},
	itemConfig: {
        viewModel: true
    },
    rowViewModel: true,
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
        	autoLoad: false,
        	clearOnPageLoad:true,
            model: 'RdMobile.model.mApList', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/aps/index.json',
                pageSize	: 50,
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
                	this.up('cntAps').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">APs</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
               
    	me.setColumns([
    		{
				flex		: 1,
		        cell		: {
		            xtype: 'widgetcell',
		            listeners: {
						click: {
							element: 'element', //bind to the underlying el property on the panel
							fn: function(a,b,c){ 
								const record = this.component.getRecord();
								this.component.up('cntAps').getController().onGridChildTap(this.component,record);
		     				}
		     			}						
					},
		            widget: {
                        xtype: 'cntViewHardware',
                        listeners: {
							painted  : function(a,b,c){
								const record = a.up('widgetcell').getRecord();
                                a.down('#cntInfo').setData(record.getData());
                                a.down('#sklBar').setValues(record.get('dayuptimehist'));
                                a.down('#sklPie').setValues(record.get('uptimhistpct'));
							}
						},
						bind: {
                            n: '{record.name}'                        
                        }
                    }
		        }	       
		    }
    	]);
            
		this.callParent();
		//console.log(this._record)      
    }
 });
