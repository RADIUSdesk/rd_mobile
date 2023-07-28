Ext.define('RdMobile.view.meshes.cntMeshEditEntries', {
    extend  : 'Ext.Container',
    xtype   : 'cntMeshEditEntries',
    controller  : 'vcMeshEditEntries',
    requires	: [
        'RdMobile.view.meshes.vcMeshEditEntries',
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
					{ ui: 'confirm', iconCls: 'x-fa fa-redo',	itemId : 'btnReload' },
					{
						xtype: 'spacer'
					},
					{
						xtype	: 'label',
						itemId	: 'lblMeta'
					}
		    ]
        },
        {
        	xtype: 'container'               
        }     
    ],                   
    scrollable : true,
	initialize: function (){
        const me = this;
        
     	 var menu = Ext.create({
		 xtype	: 'actionsheet',
		 itemId	: 'asMenu',
		 centered: false,
		 title: 'MENU',
			 items: [
				{
					 text		: 'Delete',
					 iconCls	: 'x-fa fa-trash',
					 textAlign  : 'left',
					 itemId		: 'btnDelete'
				 }, 
				 {
					 text		: 'Edit',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnEdit'
				 },
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				}
			 ]
	 	});
     	
	 	me.add(menu);
	 	var fab = Ext.create({
			xtype: "button",
			ui: 'round',
			floated: true,
			iconCls: "x-fa fa-plus",
			right: 20,
			bottom: 140,
			border: false,
			itemId	: 'btnAdd'
		});
	 	
	 	me.add(fab);
	 	this.callParent(arguments);
  	}
});
