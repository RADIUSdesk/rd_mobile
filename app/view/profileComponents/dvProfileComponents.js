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
                		'<div class="sub-check">', //FIXME Create a class for check in CSS
                			'<div style="font-size:10px;color:#acacad;text-align:center;padding:2px;">CHECK</div>',
		            		'<div style="font-size:18px;color:#016316;padding:2px;">{attribute} <span style="color:#161617;">{op}</span> <span style="color:#0539f5;">{value}</span></div>',
		            		'<tpl if="comment!==\'\'">',
		            			'<div style="font-size:12px;color:#747475;text-align:left;padding:5px;"><i>{comment}</i></div>',
		            		'</tpl>',
				        '</div>',
                	'</tpl>',
                	
                	'<tpl if="type==\'reply\'">',
                		'<div class="sub">',
                			'<div style="font-size:10px;color:#acacad;text-align:center;padding:2px;">REPLY</div>',
		            		'<div style="font-size:18px;color:#016316;padding:2px;">{attribute} <span style="color:#161617;">{op}</span> <span style="color:#0539f5;">{value}</span></div>', 
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
                        Ext.ux.Toaster.msg(
                            'Error encountered',
                            store.getProxy().getReader().rawData.message.message,
                            Ext.ux.Constants.clsWarn,
                            Ext.ux.Constants.msgWarn
                        );
                    } 
                },
                scope: this
            }
        }));
       // me.setItemTpl('<div>{name} is {age} years old</div>');
        me.getStore().reload()		
		this.callParent();    
    }
 });
