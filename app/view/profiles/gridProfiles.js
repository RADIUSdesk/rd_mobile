Ext.define('RdMobile.view.profiles.gridProfiles', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridProfiles',
    emptyText: 'No Profiles Available',
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
    selectable: {
		mode: 'single'
	},
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mProfile', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : '/cake4/rd_cake/profiles/index.json',
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
                	this.up('cntProfiles').down('#lblMeta').setHtml('<div style="color:#3e3f40;text-align: center;">'+meta.total+'<div style="font-size: xx-small;">PROFILES</div></div>');
                },
                scope: this
            },
            remoteFilter: true,
            remoteSort: true
        }));
        
        me.setColumns( [{
                text: 'Profiles',
                xtype: 'templatecolumn',                
                
                cell: {
					encodeHtml: false,
					tpl: new Ext.XTemplate(
                	'<div class="grid-tpl-item">',
		                '<div class="item-main">',
		                	'<tpl if="for_system"><span style="color:#0d8024;"><i class="fas fa-umbrella"></i></span></tpl>',
		                	' {name}',
		                '</div>',
		             		'<tpl if="Ext.isEmpty(profile_components)"><div></div></tpl>',
				            '<tpl for="profile_components">',     // interrogate the profile_components property within the data
				                "<div style=\"color:#3e3f40;text-align:center;\"><i class=\"fas fa-puzzle-piece\"></i></i>   {groupname} <small><i>(priority => {priority})</i></small></div>",
				            '</tpl>',
                    '</div>',
                ),
				},
                flex: 1
            }]);
		this.callParent();     
    }
 });
