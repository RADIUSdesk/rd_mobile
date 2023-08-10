// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.profileComponents.frmProfileComponentEntryEdit', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmProfileComponentEntryEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    requires	: [
        'RdMobile.view.profileComponents.vcProfileComponentEntryEdit',
        'RdMobile.view.components.cmbVendor',
        'RdMobile.view.components.cmbAttribute',
        'RdMobile.view.components.cmbOperator'
    ],
    controller  : 'vcProfileComponentEntryEdit',
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
        
        me.setTitle('Edit Entry');             
    	var items = [
			
			 	{
                    xtype   : 'textfield',
                    name    : 'profile_component_id',
                    hidden  : true
                },
                {
                    xtype   : 'textfield',
                    name    : 'id',
                    hidden  : true
                },
                {
                    xtype   : 'textfield',
                    name    : 'groupname',
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
		    	required: false
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
		var a 		= me.r.get('attribute');
		var rec  	= Ext.create('RdMobile.model.mAttribute', {name: a, id: a});
        me.down('cmbAttribute').getStore().loadData([rec],false);
		me.setValues(me.r.getData());
	}
});
