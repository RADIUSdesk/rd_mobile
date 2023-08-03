Ext.define('RdMobile.view.meshes.frmMeshEditGeneral', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMeshEditGeneral',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Edit MESH Network General',
    root 	: false,
    requires	: [
        'RdMobile.view.meshes.vcMeshEditGeneral',
    ],
    controller  : 'vcMeshEditGeneral',
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
				xtype       : 'textfield',
				hidden		: true,
				name		: 'mesh_id',
				mesh_id		: me.meshId	
			},
			{
				xtype	: 'label',
				html	: 'Grouping',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			
			{
                itemId      : 'displTag',
                xtype       : 'label',
                label  		: 'Grouping',
                name        : 'tag_path'
            },
            {
                xtype	: 'button',
                text	: 'Change Grouping',
                handler	: 'btnChangeGrouping'
            },
            {
				xtype	: 'label',
				margin	: 0,
				padding : 10,
				cls		: 'form-section'	
			},
		    {
		        xtype       : 'textfield',
		        label  		: 'Name',
		        name        : 'name',
		        required	: true,
				errorTarget: 'under'
		    },
            {
                xtype       : 'checkbox',
                label    	: 'Enable Alerts',
                name        : 'enable_alerts',
                labelWidth  : 'auto'
            },
            {
                xtype       : 'checkbox',
                label    	: 'Include In Overviews',
                name        : 'enable_overviews',
                labelWidth  : 'auto'  
            }            
		];	
		me.setItems(items);        
 	}
});
