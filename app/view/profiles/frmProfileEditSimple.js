Ext.define('RdMobile.view.profiles.frmProfileEditSimple', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmProfileEditSimple',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 5,
    margin	: 0,
    title	: 'Simple Edit',
    root 	: false,
    requires	: [
        'RdMobile.view.profiles.vcProfileEditSimple',
        'RdMobile.view.components.rdSliderData',
        'RdMobile.view.profiles.cntDataLimit'
    ],
    controller  : 'vcProfileEditSimple',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me 		= this;      
        var hide_system = true;
        if(me.root){
            hide_system = false;
        }
              
        var items = [
			
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
                xtype       : 'cntDataLimit'
            }
		];		
		me.setItems(items);        
 	}
});
