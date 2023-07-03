Ext.define('RdMobile.view.profileComponents.frmProfileComponentEntryAdd', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmProfileComponentEntryAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    requires	: [
        'RdMobile.view.profileComponents.vcProfileComponentEntryAdd',
        'RdMobile.view.components.cmbVendor',
        'RdMobile.view.components.cmbAttribute',
        'RdMobile.view.components.cmbOperator'
    ],
    controller  : 'vcProfileComponentEntryAdd',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me = this;        
        var hide_system = true;
        if(me.root){
            hide_system = false;
        }
        
        me.setTitle('Entry For '+me.profile_component_name);             
    	var items = [
			
			 {
                    xtype   : 'textfield',
                    name    : 'profile_component_id',
                    value   : me.profile_component_id,
                    hidden  : true
                },
                {
                    xtype       : 'radiogroup',
                    columns     : 2,
                    vertical    : false,
                    items: [
                        { label: 'Check',   name: 'type',    value: 'check' },
                        { label: 'Reply',   name: 'type',    value: 'reply', checked: true},
                    ]
                },
			{
		    	xtype	: 'cmbVendor',
		    	required: true
			},	
			{
		    	xtype	: 'cmbAttribute',
		    	required: true
			},
			{
		    	xtype	: 'cmbOperator',
		    	required: true,
		    	value	: ':='  
			},
			{
		        xtype       : 'textfield',
		        label  		: 'Value',
		        name        : 'value',
		        required	: true,
		        errorTip: {
				    anchor: true,
				    align: 'l-r?'
				},
				errorTarget: 'under'
		    },
		    {
		        xtype       : 'textfield',
		        label  		: 'Comment',
		        name        : 'comment',
		        value		: ''	    
		    }	    
		];
		me.setItems(items);
	}
});
