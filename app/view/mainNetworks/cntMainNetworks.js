Ext.define('RdMobile.view.mainNetworks.cntMainNetworks', {
    extend      : 'Ext.Container',
    xtype       : 'cntMainNetworks',
    controller  : 'vcMainNetworks',
    requires	: [
        'RdMobile.view.mainNetworks.vcMainNetworks',
        'RdMobile.view.mainNetworks.gridMainNetworks',
    ],
    layout: {
		type        : 'card',
		pack        : 'start',
		align       : 'stretch',
		animation   : 'slide',
		deferredRender: true
	},
    items: [
        {
        	xtype	: 'container',
        	items	: [
        		{
					xtype	: 'label',
					html	: 'Networks',
					margin	: 5,
					padding : 5,
					cls		: 'detail-section'	
				},
        		{
        			xtype	: 'gridMainNetworks',
        			height	: 300	
        		}
        	]
        }, 
       /* //-- Meshes --(1)    
        {
            xtype	: 'cntMeshes',
            layout	: 'fit'
         },
         //-- MeshNodes --(2)
         {
            xtype	: 'cntNodes',
        	layout	: 'fit'
        }*/
    ]
});
