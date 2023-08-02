Ext.define('RdMobile.view.meshes.frmMeshEditNodeSettings', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMeshEditNodeSettings',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Edit MESH Node Settings',
    root 	: false,
    requires	: [
 //       'RdMobile.view.meshes.vcMeshEditGeneral',
    ],
   // controller  : 'vcMeshEditGeneral',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  = this;    	          
        var items = [
			{
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> System',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
		   	{
                xtype		: 'passwordfield',
                label		: 'Password',
                name		: 'password',
                revealable	: true,
                required	: true,		
				errorTarget	: 'under'
            },
            {
                xtype       : 'cmbCountries'
            },
            {
                xtype       : 'cmbTimezones'
            },
            {
                xtype       : 'checkbox',      
                label  		: 'Apply Schedule',
                name        : 'enable_schedules',
	            itemId		: 'chkEnableSchedules',
                checked     : false
            },
			/*{
				xtype       : 'cmbSchedule',
				required	: true,		
				errorTarget	: 'under'
			} */ 
		];	
		me.setItems(items);        
 	}
});
