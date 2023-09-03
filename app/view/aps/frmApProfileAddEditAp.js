// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.frmApProfileAddEditAp', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmApProfileAddEditAp',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-plus',
    title	: 'Add AP',
    root 	: false,
    action	: 'edit',
    node_id	: 0, //Default for add
    requires	: [
        'RdMobile.view.aps.vcApProfileAddEditAp',
        'RdMobile.view.components.cmbInternetConnection',
        'RdMobile.view.components.cmbApProfile',
        'RdMobile.view.aps.cmbApHardwareOptions'
    ],
    controller  : 'vcApProfileAddEditAp',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'loadBasicSettings' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me  = this; 
        var p = 10;
        var m = 10;
        var bg = 'background:rgb(46, 95, 115);';     
        var cmb = Ext.create('RdMobile.view.components.cmbApProfile',{});
        
        var hide_multiple  = true; 
        if(me.action == 'add'){
        	hide_multiple = false;
        }
        
        if(me.action == 'edit'){
        	me.setIconCls('x-fa fa-pen');
        	me.setTitle('Edit AP');
        }
        
        if(me.action == 'attach'){
        	me.setIconCls('x-fa fa-paperclip');
        	me.setTitle('Attach AP');
        }
              
        var pnlWanStatic 	= Ext.create('RdMobile.view.components.cntInetWanStatic',{itemId  : 'pnlWanStatic'});   
        var pnlWanPppoe 	= Ext.create('RdMobile.view.components.cntInetWanPppoe',{itemId  : 'pnlWanPppoe'});         
        var pnlWifiStatic 	= Ext.create('RdMobile.view.components.cntInetWifiStatic',{itemId  : 'pnlWifiStatic'});       
        var pnlWifiPppoe 	= Ext.create('RdMobile.view.components.cntInetWifiPppoe',{itemId  : 'pnlWifiPppoe'});        
        var cntWbW 			= Ext.create('RdMobile.view.components.cntInetWbw',{itemId  : 'cntWbW'});
        var pnlQmi			= Ext.create('RdMobile.view.components.cntInetQmi',{itemId  : 'pnlQmi'});
                   	          
        var items = [
			{
                xtype       : 'checkbox',      
                label    	: 'Add Multiple',
                itemId		: 'chkMultiple',
                checked     : false,
                labelWidth  : 'auto',
                hidden		: hide_multiple
            },
            {
			    itemId      : 'node_id',
			    xtype       : 'textfield',
			    name        : 'id',
			    hidden      : true,
			    value       : me.node_id
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
		        name        : 'description',
		        value		: ''
	        },
	        {
	        	xtype       : 'cmbApHardwareOptions',
	        	width		: '100%',  
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
		            change : 'onCmbInternetConnectionChange'
			    }   			                
            },
            pnlWanStatic,
            pnlWanPppoe,
            cntWbW,
            pnlWifiStatic,
            pnlWifiPppoe,
            pnlQmi,
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
                padding		: 10,
                margin		: 10,
                radio_nr    : 0,
                hidden      : true,
                ui          : 'panel-green'
            },
            {
                xtype       : 'pnlNodeRadioDetail',
                itemId      : 'pnlRadioR1',
                padding		: 10,
                margin		: 10,
                radio_nr    : 1,
                hidden      : true,
                ui          : 'panel-green'
            },
            {
                xtype       : 'pnlNodeRadioDetail',
                itemId      : 'pnlRadioR2',
                padding		: 10,
                margin		: 10,
                radio_nr    : 2,
                hidden      : true,
                ui          : 'panel-green'
            }
		             
		];	
		me.setItems(items);        
 	}
});
