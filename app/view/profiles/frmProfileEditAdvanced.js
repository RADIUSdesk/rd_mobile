Ext.define('RdMobile.view.profiles.frmProfileEditAdvanced', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmProfileEditAdvanced',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: '0 10 0 10',
    margin	: 0,
    root 	: false,
    iconCls : 'x-fa fa-cogs',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    requires: [
    	'RdMobile.view.profiles.vcProfileEditAdvanced'
    ],
    controller  : 'vcProfileEditAdvanced',  
    initialize: function () {
        const me 		= this;      
        var hide_system = true;
        if(me.root){
            hide_system = false;
        }
        
        me.setTitle(me.profile_name);
        var s 	= Ext.create('RdMobile.store.sProfileComponents', {}); 
              
        var items = [      
        	{
		        xtype   : 'textfield',
		        name    : 'id',
		        hidden  : true,
		        value	: me.profile_id,
		        itemId	: 'profileId'
		    },	
			{
		        xtype		: 'checkboxfield',
		        label		: 'System Wide',
		        name    	: 'for_system',
		      	value  		: 'for_system',
		      	labelWidth 	: 200,
		        checked		: false,
		       	hidden      : hide_system,
                disabled    : hide_system            
		    },
		    {
                xtype       : 'radiogroup',
                columns     : 2,
                vertical    : false,
                items: [
                    { label: 'Add Component',        	name: 'rb',     value: 'add', checked: true },
                    { label: 'Remove Component',        name: 'rb',     value: 'remove'}
                ]
            },
            {
                xtype		: 'combobox',
                label		: 'Profile Component',
                store		: s,
                queryMode	: 'local',
                editable	: false,
                name		: 'component_id',
                displayField: 'name',
                valueField	: 'id',
                required: true,
		        errorTip: {
				    anchor: true,
				    align: 'l-r?'
				},
				errorTarget: 'under'
            },
            {
                xtype	: 'numberfield',
                name	: 'priority',
                label	: 'Priority <br><small><i>(Higher takes priority)</i></small>',
                value	: 5,
                maxValue: 5,
                minValue: 1,
                itemId	: 'priority',
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
