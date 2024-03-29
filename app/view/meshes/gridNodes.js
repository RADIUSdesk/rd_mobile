// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.gridNodes', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridNodes',
    emptyText: 'No Nodes Found',
    config  : {
        compdata: undefined,
    },
    requires: [
        'Ext.grid.plugin.PagingToolbar',
        'RdMobile.view.meshes.cntViewNodeHardware'
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
            model: 'RdMobile.model.mNodeDetail', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/node-lists/index.json',
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
                	this.up('cntNodes').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">NODES</div></div>');
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
								this.component.up('cntNodes').getController().onGridChildTap(this.component,record);
		     				}
		     			}						
					},
		            widget: {
                        xtype: 'cntViewNodeHardware',
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
        
       /* me.setColumns( [{
                text	: 'Nodes',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	
		            	'<tpl if="gateway==\'yes\'">',
		            		'<div class="grid-tpl-item" style="border:1px solid #0c3b99;">',
		            			'<div class="item-main" style="color:#0c3b99;">', //#0c3b99; border:1px solid #a3aeb8;
		            	'<tpl else>',
		            		'<div class="grid-tpl-item" style="">',
		            			'<div class="item-main" style="color:#727478;font-style:italic;">',
		            	'</tpl>',
		            		"<tpl if='reboot_flag == \"1\"'>",
		            			'<i class="fa fa-power-off" style="color:orange;"></i>  ',
		            		'</tpl>',			            
			            	'{name}',
			            '</div>',
                    	'<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-sitemap fa-1x"></i> Mesh :</div>',					
							'<div class="item-value">{mesh}</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-cogs fa-1x"></i> Config Fetched :</div>',
							'<tpl if="[Ext.ux.isRecent(config_fetched_human)]==\'green\'">',
								'<div class="item-value clr-green">{config_fetched_human}</div>',
							'<tpl else>',
								'<div class="item-value clr-grey-dark">{config_fetched_human}</div>',
							'</tpl>',						
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl"><i class="fa fa-heartbeat fa-1x"></i> Heartbeat :</div>',
							'<tpl if="[Ext.ux.isRecent(last_contact_human)]==\'green\'">',
								'<div class="item-value clr-green">{last_contact_human}</div>',
							'<tpl else>',
								'<div class="item-value clr-orange">{last_contact_human}</div>',
							'</tpl>',
						'</div>',						
                    '</div>'
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            }]);*/
		this.callParent();
		//console.log(this._record)      
    }
 });
