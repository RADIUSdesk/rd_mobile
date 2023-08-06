Ext.define('RdMobile.view.meshes.frmMeshAddEditNode', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMeshAddEditNode',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-plus',
    title	: 'Add MESH Node',
    root 	: false,
    action	: 'edit',
    requires	: [
        'RdMobile.view.meshes.vcMeshAddEditNode',
        'RdMobile.view.components.cmbInternetConnection'
    ],
    controller  : 'vcMeshAddEditNode',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  = this; 
        
        var cmb = Ext.create('RdMobile.view.components.cmbMesh',{});
        
        var hide_multiple  = true; 
        if(me.action == 'add'){
        	hide_multiple = false;
        }       
           	          
        var items = [
			{
                xtype       : 'checkbox',      
                label    	: 'Add Multiple',
                itemId		: 'chkMultiple',
                checked     : false,
                labelWidth  : 'auto',
                hidden		: hide_multiple
            },
			cmb,
		    {
		        xtype       : 'textfield',
		        label  		: 'Name',
		        name        : 'name',
		        required	: true,
				errorTarget: 'under'
		    },
		    {
		        xtype       : 'textfield',
		        label  		: 'Description',
		        name        : 'description'
	        },
	        {
	        	xtype       : 'cmbHardwareOptions'  
		    },
	        {
			    xtype       : 'textfield',
			    label  		: 'MAC Address',
			    name        : "mac",
			    required	: true,
				errorTarget: 'under',
				value       : me.mac
			    //vtype       : 'MacAddress',
			    //fieldStyle  : 'text-transform:uppercase',			    
		    },
		    {
                xtype       : 'cmbInternetConnection',
                itemId      : 'cmbInternetConnection',
                listeners   : {
		            //change : 'onCmbInternetConnectionChange'
			    }   			                
            },
		    {
				xtype	: 'label',
				html	: '<i class="fas fa-cogs"></i> RADIOS',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
		    {
                xtype       : 'pnlNodeRadioDetail',
                itemId      : 'pnlRadioR0',
                radio_nr    : 0,
                hidden      : true,
                ui          : 'panel-green'
            },
            {
                xtype       : 'pnlNodeRadioDetail',
                itemId      : 'pnlRadioR1',
                radio_nr    : 1,
                hidden      : true,
                ui          : 'panel-green'
            },
            {
                xtype       : 'pnlNodeRadioDetail',
                itemId      : 'pnlRadioR2',
                radio_nr    : 2,
                hidden      : true,
                ui          : 'panel-green'
            }
		             
		];	
		me.setItems(items);        
 	}
});
