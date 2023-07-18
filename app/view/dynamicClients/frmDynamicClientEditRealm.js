Ext.define('RdMobile.view.dynamicClients.frmDynamicClientEditRealm', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmDynamicClientEditRealm',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-pencil-alt',
    root 	: false,
    requires	: [
        'RdMobile.view.dynamicClients.vcDynamicClientEditRealm',
        'RdMobile.view.components.cmbRealm'
    ],
    controller  : 'vcDynamicClientEditRealm',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadDynamicClientRealm' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me  = this;
        
        me.setTitle(' <i class="fas fa-cogs"></i> '+me.dynamic_client_name);
              
        var items = [
        	{
		        xtype   : 'textfield',
		        name    : 'id',
		        hidden  : true,
		        value	: me.dynamic_client_id
		    },
			{
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> General',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
		        xtype	: 'checkboxfield',
		        label	: 'Available To All',
		        name    : 'available_to_all',
		      	itemId  : 'chkAvailableToAll',
		      	labelWidth : 200,
		        checked	: false            
		    },
			{
				xtype	: 'cmbRealm',
				multiSelect: true,
				name	: 'realms',
				required: true,
		    	errorTip: {
				    anchor: true,
				    align: 'l-r?'
				},
				errorTarget: 'under'			
			}
		];	
		me.setItems(items);        
 	}
});
