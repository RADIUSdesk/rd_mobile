Ext.define('RdMobile.view.profileComponents.frmProfileComponentAdd', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmProfileComponentAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Add Profile Component',
    requires	: [
        'RdMobile.view.profileComponents.vcProfileComponentAdd',
    ],
    controller  : 'vcProfileComponentAdd',
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
    	var items = [
			{
				xtype	: 'label',
				html	: 'Basic Info',
				margin	: 0,
				padding : 5,
				style	: {
	   				'font-size' 	: '1.5em',
	   				'border-bottom' : '5px solid #667078',
	   				'color'			: '#027534'
				}		
			},			
		    {
		        xtype       : 'textfield',
		        label  		: 'Name',
		        name        : 'name',
		        required	: true,
		        errorTip: {
				    anchor: true,
				    align: 'l-r?'
				},
				errorTarget: 'under'
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
		    }
		];
		me.setItems(items);
	}
});
