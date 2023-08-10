// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.gridMeshEntries', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMeshEntries',
    emptyText: 'MESH Entries Found',
    config  : {
        compdata: undefined,
    },
    hideHeaders: true,
    rowLines: true,
    trackMouseOver: false,
    viewConfig: {
        stripeRows: false
    },
    rowLines: false,
    disableSelection: true,
    selectable: {
		mode: 'single'
	},
    initialize: function () {
        const me = this;
        me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mMeshEntry', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url     	: '/cake4/rd_cake/meshes/mesh_entries_index.json',
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
                	this.up('cntMeshes').down('#lblMeta').setData(meta);
                },
                scope: this
            }
        }));
        
        me.setColumns( [{
                text	: 'Mesh Entries',
                xtype	: 'templatecolumn',
                tpl		: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
			            '<div class="item-main">',
			            	'{name}',
			            '</div>',
			            '<div class="two-columns-grid">',
							'<div class="item-lbl">Encryption :</div>',
							'<div class="item-value">',
								'<tpl if="encryption==\'none\'"><i class="fa fa-unlock"></i> None</tpl>',
		                		'<tpl if="encryption==\'wep\'"><i class="fa fa-lock"></i>  WEP</tpl>', 
		                		'<tpl if="encryption==\'psk\'"><i class="fa fa-lock"></i> WPA Personal</tpl>',
		                		'<tpl if="encryption==\'psk2\'"><i class="fa fa-lock"></i> WPA2 Personal</tpl>',
		                		'<tpl if="encryption==\'wpa\'"><i class="fa fa-lock"></i> WPA_Enterprise</tpl>',
		                		'<tpl if="encryption==\'wpa2\'"><i class="fa fa-lock"></i> WPA2 Enterprise</tpl>',
		                		'<tpl if="encryption==\'ppsk\'"><i class="fa fa-lock"></i> Private PSK Key (PPSK)</tpl>',
                    		'</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Frequency :</div>',
							'<div class="item-value">',
								'<tpl if="frequency_band==\'both\'">2.4G & 5.8G</tpl>',
						        '<tpl if="frequency_band==\'two\'"> 2.4G </tpl>',
						        '<tpl if="frequency_band==\'five\'">5.8G</tpl>',
						        '<tpl if="frequency_band==\'five_lower\'">5G Lower Band</tpl>',
						        '<tpl if="frequency_band==\'five_upper\'">5G Upper Band</tpl>',
						  	'</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Hidden :</div>',
							'<div class="item-value">',
								'<tpl if="hidden"><i class="fa fa-check-circle"></i> Yes',
                    			'<tpl else>',
                    				'<i class="fa fa-times-circle"></i> No',
                    			'</tpl>',   
						  	'</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Client Isolation :</div>',
							'<div class="item-value">',
								'<tpl if="isolate"><i class="fa fa-check-circle"></i> Yes',
                    			'<tpl else>',
                    				'<i class="fa fa-times-circle"></i> No',
                    			'</tpl>',   
						  	'</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Apply To All :</div>',
							'<div class="item-value">',
								'<tpl if="apply_to_all"><i class="fa fa-check-circle"></i> Yes',
                    			'<tpl else>',
                    				'<i class="fa fa-times-circle"></i> No',
                    			'</tpl>',   
						  	'</div>',
						'</div>',
						'<div class="two-columns-grid">',
							'<div class="item-lbl">Connected To Exit :</div>',
							'<div class="item-value">',
								'<tpl if="connected_to_exit"><i class="fa fa-check-circle"></i> Yes',
                    			'<tpl else>',
                    				'<span class="clr-red"><i class="fa fa-times-circle"></i> No  </span>',
                    				'<span class="clr-grey" style="font-size:0.7em;">(Edit Exit Points To Fix)</span>',
                    			'</tpl>',   
						  	'</div>',
						'</div>',			
                    '</div>',
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            }]);	
		this.callParent();    
    }
 });
