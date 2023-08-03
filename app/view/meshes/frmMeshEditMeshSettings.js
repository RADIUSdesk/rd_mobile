Ext.define('RdMobile.view.meshes.frmMeshEditMeshSettings', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMeshEditMeshSettings',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Edit MESH Settings',
    root 	: false,
    requires	: [
        'RdMobile.view.meshes.vcMeshEditMeshSettings',
    ],
    controller  : 'vcMeshEditMeshSettings',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadMeshSettings' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me  = this;    	          
        var items = [
			{
				xtype	: 'label',
				html	: '<i class="fas fa-link"></i> Connectivity',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
				xtype       : 'textfield',
				hidden		: true,
				name		: 'mesh_id'	
			},
			{
                xtype       : 'radiogroup',
                vertical    : false,
                items       : [
                	{
			            label  		: 'Ad-hoc',
			            name      	: 'connectivity',
			            value		: 'IBSS',
			            labelWidth  : '170'
			        },
			        { 
                  		label  		: '802.11s',
				        name      	: 'connectivity',
				        value		: 'mesh_point',
				        labelWidth  : 'auto',
						checked		: true
					}
                ]
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Encryption',
                labelWidth  : 'auto',
                name        : 'encryption',
                itemId      : 'chkEncryption',
                checked     : false
            },
            {
	            xtype       : 'textfield',
	            label  		: 'Key',
	            name        : 'encryption_key',
	            itemId      : 'txtEncryptionKey',
	            minLength   : 8,
	            hidden      : true,
	            disabled    : true,
	            required	: true,		
				errorTarget	: 'under'
	        },
	        {
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> Batman-adv Settings',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
                xtype       : 'radiogroup',
                vertical    : false,
                items       : [
                	{
			            label  		: 'BATMAN IV',
			            name      	: 'routing_algo',
			            value		: 'BATMAN_IV',
			            labelWidth  : '170'
			        },
			        { 
                  		label  		: 'BATMAN V',
				        name      	: 'routing_algo',
				        value		: 'BATMAN_V',
				        labelWidth  : 'auto',
						checked		: true
					}
                ]
            },
            {
                xtype       : 'checkbox',      
                label    	: 'AP Isolation',
                name        : 'ap_isolation',
                labelWidth  : 'auto',
                checked     : true
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Bridge Loop Avoidance',
                name        : 'bridge_loop_avoidance',
                labelWidth  : 'auto',
                checked     : true
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Aggregation',
                name        : 'aggregated_ogms',
                labelWidth  : 'auto',
                checked     : true
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Bonding',
                name        : 'bonding',
                labelWidth  : 'auto',
                checked     : true
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Fragmentation',
                name        : 'fragmentation',
                labelWidth  : 'auto',
                checked     : true
            },
	        {
                xtype       : 'checkbox',      
                label  		: 'Distributed ARP table',
                name        : 'distributed_arp_table',
                labelWidth  : 'auto',
                checked     : true
            },
            {
                xtype       : 'numberfield',
                name        : 'orig_interval',
                label  		: 'OGM Interval (ms)',
                value       : 1000,
                maxValue    : 20000,
                step        : 100,
                minValue    : 1,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'numberfield',
                name        : 'gw_sel_class',
                label  		: 'Gateway Switching',
                value       : 20,
                maxValue    : 255,
                step        : 1,
                minValue    : 1,
                required	: true,		
				errorTarget	: 'under'
            }      
		];	
		me.setItems(items);        
 	}
});
