// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profileComponents.dvProfileComponents', {
    extend  : 'Ext.dataview.DataView',
    xtype   : 'dvProfileComponents',
    config  : {
        compdata: undefined,
    },    
    initialize: function () {
        const me = this;
        
        var imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="plain-wrap">',
                	'<tpl if="type==\'profile_component\'">',
                		'<div class="main">',
                			'<i class="fa fa-puzzle-piece"></i>',
                				'<tpl if="for_system">',
                					'<i class="fa fa-umbrella"></i>',
                				'</tpl>',
                			' {name}',
                		'</div>', 
                	'</tpl>',
                	
                	'<tpl if="type==\'check\'">',
                		'<div class="sub-check">',
                			'<div style="font-size:10px;color:#acacad;text-align:center;padding:2px;">CHECK</div>',
		            		'<div style="font-size:1.2em;color:#2642ab;padding:2px;">{attribute} <span style="color:#161617;">{op}</span> <span style="color:#016316;">{value}</span></div>',
		            		'<tpl if="comment!==\'\'">',
		            			'<div style="font-size:12px;color:#747475;text-align:left;padding:5px;"><i>{comment}</i></div>',
		            		'</tpl>',
				        '</div>',
                	'</tpl>',
                	
                	'<tpl if="type==\'reply\'">',
                		'<div class="sub-reply">',
                			'<div style="font-size:10px;color:#acacad;text-align:center;padding:2px;">REPLY</div>',
		            		'<div style="font-size:1.2em;color:#2642ab;padding:2px;">{attribute} <span style="color:#161617;">{op}</span> <span style="color:#016316;">{value}</span></div>', 
		            		'<tpl if="comment!==\'\'">',
		            			'<div style="font-size:12px;color:#747475;text-align:left;padding:5px;"><i>{comment}</i></div>',
		            		'</tpl>',
				        '</div>',
                	'</tpl>',
                	
                	'<tpl if="type==\'add\'">',
                		'<div style="margin-bottom:40px;padding:5px;cursor:move;font-size:18px;color:green;text-align:right;">',
                			'<span style="padding:5px;border:1px solid #76cf15;" onMouseOver="this.style.background=\'#76cf15\'" onMouseOut="this.style.background=\'#FFF\'"><i class="fa fa-plus"></i> NEW ENTRY</span>',
                		'</div>', 
                	'</tpl>',
                '</div>',
            '</tpl>'
        );
        
        me.setItemTpl(imageTpl);
        
       	me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mProfileComponentDataView',
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/profile-components/index-data-view.json',
                batchActions: true,
                format      : 'json',
                reader      : {
                    type        : 'json',
                    rootProperty: 'items'
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
                	this.up('cntProfileComponents').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">COMPONENTS</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
		this.callParent();    
    }
 });
