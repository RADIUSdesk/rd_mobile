Ext.define('RdMobile.view.aps.frmApProfileAdd', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmApProfileAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-plus',
    title	: 'Add AP Profile',
    root 	: false,
    requires	: [
        'RdMobile.view.aps.vcApProfileAdd',
    ],
    controller  : 'vcApProfileAdd',
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
