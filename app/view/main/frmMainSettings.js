// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.main.frmMainSettings', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMainSettings',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Settings',
    iconCls : 'x-fa fa-wrench',
    root 	: false,
    requires	: [
        'RdMobile.view.main.vcMainSettings',
    ],
    controller  : 'vcMainSettings',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    listeners       : {
        show : 'load' //Trigger a load of the settings (This is only on the initial load)
    },
    initialize: function () {
        const me  = this;  
                  
        var items = [
        	{
				xtype	: 'label',
				html	: 'Overviews',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
        	{
                xtype           : 'combobox',
                label      		: 'Include Overviews',
                name            : 'overviews_to_include[]',
                valueField      : 'id',
    			displayField    : 'name',
                multiSelect		: true,
                errorTarget		: 'under',
                required	    : true,
   				queryMode       : 'local',        
                listeners   	: {
                    select  : 'onOverviewsToIncludeSelect',
                    change  : 'onOverviewsToIncludeSelect'
                },
                store: {
                    autoLoad    : true,
                    fields      :[
                       'id',
                       'name'
                    ],
                    data: [                       
                        {
                            id  : 'meshdesk_overview',
                            name: "Networks"
                        },
                        {
                            id  : 'radius_overview',
                            name: "RADIUS"
                        }
                    ]
                }    
            },
			{
                xtype       : 'cmbCloud',
                label  		: 'Default Cloud',
                hidden      : false,
                disabled    : false,
                required	: true,
                name		: 'cloud_id',
                errorTarget : 'under',
                listeners   : {
                    change  : 'onCmbCloudsChange'
                }
            },
            {
                xtype       : 'textfield',
                name        : "changed_cloud_id",
                hidden      : true,
                itemId      : 'txtChangedCloudId'
            },                                    
            {
                xtype       : 'cmbRealm',
                label  		: 'Default Realm',
                hidden      : true,
                required	: true,
                disabled    : true,
                errorTarget : 'under'
            },
            {
                xtype       : 'cmbTimezones',
                name        : 'timezone_id',
                required	: true,
                errorTarget : 'under'
            },
            {
                xtype       : 'checkbox',      
                label    	: 'Compact View',
                name        : 'compact_view',
                checked     : true
            },
            {
				xtype		: 'label',
				html		: 'White Labeling',
				margin		: 0,
				padding 	: 5,
				cls			: 'form-section'	
			},
			{
                xtype       : 'textfield',
                name        : 'wl_active',
                hidden      : true
            }, 
			{
                xtype       : 'textfield',
                label  		: 'Header Text',
                required	: true,
                name        : 'wl_header',
                errorTarget : 'under'
            },
            {
            	xtype		: 'colorfield',
     			//required	: true,
     			format		: 'hex8',
            	name        : 'wl_h_bg',
            	label  		: 'Header Background',
            	errorTarget : 'under'
            },
            {
            	xtype		: 'colorfield',
     			//required	: true,
     			format		: 'hex8',
            	name        : 'wl_h_fg',
            	label  		: 'Header Foreground',
            	errorTarget : 'under'
            },
            {
                xtype       : 'textfield',
                label  		: 'Footer Text',
                required	: true,
                name        : 'wl_footer',
                errorTarget : 'under'
            },
             {
                xtype       : 'checkbox',
                itemId      : 'chkWlImgActive',      
                label  		: 'Include Logo',
                name        : 'wl_img_active',
                checked     : false,
                listeners   : {
                    change : 'onChkWlImgActiveChange'
                } 
            },
            {
			    xtype		: 'filefield',
			    label		: 'New Logo File',
			    name        : 'wl_img_file_upload',
			    itemId		: 'flWlImgFileUpload',
			    accept		: 'image'
			},
			{
                xtype       : 'textfield',
                name        : 'wl_img_file',
                hidden      : true
            },
            {
                xtype       : 'image',
                src         : '/cake4/rd_cake/img/access_providers/logo.png', //Souces it when form loads
                itemId      : 'imgWlLogo',
                maxHeight	: 100,
                minHeight	: 50,
                margin      : 5,
                padding		: 5
            },
			{
				xtype	: 'label',
				html	: 'API Key',
				margin	: 0,
				padding : 5,
				cls		: 'form-section'	
			},
			{
				xtype	: 'label',
				html	: me.api_key,
				userSelectable : true,
				margin	: 0,
				padding : 5	
			}
			
		];	
		me.setItems(items);        
 	}
});
