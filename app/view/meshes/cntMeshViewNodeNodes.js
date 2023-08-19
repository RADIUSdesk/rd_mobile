// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.cntMeshViewNodeNodes', {
    extend  : 'Ext.Container',
    xtype   : 'cntMeshViewNodeNodes',
    controller  : 'vcMeshViewNodeNodes',
    layout	: 'fit',
    requires	: [
        'RdMobile.view.meshes.vcMeshViewNodeNodes',
        'RdMobile.view.meshes.gridMeshViewNodeNodes',
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
					{ ui: 'confirm', iconCls: 'x-fa fa-redo',		itemId : 'btnReload' },
					{ ui: 'normal',  iconCls: 'x-fa fa-calendar', 	itemId : 'btnDate' },					
					{
						xtype	: 'label',
						itemId	: 'lblInfo',
						padding	: 5,
						tpl	    : new Ext.XTemplate(
							'<div style="color:#3e3f40;text-align: center;font-size:small">{mesh_name}',
								'<div style="font-size: x-small;">{span}</div>',
							'</div>'
						),
						data	: {}
					}
		    ]
        },
        {
        	xtype: 'gridMeshViewNodeNodes'               
        }     
    ],                   
    scrollable : true,
	initialize: function (){
        const me = this;
        
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
							{ label: '1 Hour', 	name: 's_n_n', value: 'hour', checked: true },
							{ label: '24 Hours',name: 's_n_n', value: 'day'},
							{ label: '7 Days', 	name: 's_n_n', value: 'week' }
						]
					}			     
				 ]
		 	});	 	
		me.add(asDate);
        
	 	this.callParent(arguments);
  	}
});
