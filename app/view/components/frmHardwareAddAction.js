// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.frmHardwareAddAction', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmHardwareAddAction',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-wrench',
    title	: 'Execute Command',
    requires	: [
        'RdMobile.view.components.vcHardwareAddAction',
        'RdMobile.view.components.cmbPredefinedCommand'
    ],
    controller  : 'vcHardwareAddAction',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    hw_type	: 'ap', //'ap' or 'node'
    initialize: function () {
        const me  	= this;      	          
        var items 	= [
            {
                xtype       : 'textfield',
                name        : "node_id",
                hidden      : true,
                value       : me.node_id
            },
            {
                xtype       : 'textfield',
                name        : "ap_id",
                hidden      : true,
                value       : me.ap_id
            },
            {
                xtype       : 'radiogroup',
                vertical    : true,
                itemId		: 'rgpAction',
                items       : [
                    {
                        label  	: 'Predefined Command',
                        name    : 'action',
                        value	: 'predefined_command',
                        checked : true,
                        labelWidth  : 'auto'
                    },                         
                    {
                        label  : 'Execute Command',
                        name   : 'action',
                        value	: 'execute',
                        labelWidth  : 'auto'
                    }, 
                    {
                        label 	: 'Execute & Reply',
                        name    : 'action',
                        value	: 'execute_and_reply',
                        labelWidth  : 'auto'
                    }                  
                ],
                listeners   : {
                   change  : 'rgrpChange'
                }
            },
            {
                xtype       : 'cmbPredefinedCommand',
                errorTarget : 'under'
            },
            {
                xtype       : 'textfield',
                itemId		: 'txtCommand',
                name        : 'command',
                errorTarget : 'under',
                hidden      : true,
                disabled    : true,
                required	: true
            }
        ];
		me.setItems(items);		     
 	}
});
