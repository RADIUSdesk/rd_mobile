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
		    }     
		];	
		me.setItems(items);        
 	}
});
