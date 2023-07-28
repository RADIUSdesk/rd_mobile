Ext.define('RdMobile.view.meshes.frmMeshAdd', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMeshAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Add MESH Network',
    root 	: false,
    requires	: [
        'RdMobile.view.meshes.vcMeshAdd',
    ],
    controller  : 'vcMeshAdd',
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
				html	: '<i class="fas fa-cogs"></i> General',
				margin	: 0,
				padding : 5,
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
                label    	: 'Create Multiple Items',
                name        : 'multiple',
                itemId		: 'chkMultiple',
                checked     : false,
                labelWidth  : 'auto'
            },         
		];	
		me.setItems(items);        
 	}
});
