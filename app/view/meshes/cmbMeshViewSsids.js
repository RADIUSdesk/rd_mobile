// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.cmbMeshViewSsids', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbMeshViewSsids',
    label      		: 'SSID',
    valueField      : 'id',
    displayField    : 'name',
    value           : -1,
    initialize: function (){  
        var me      = this;
        var s       = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'id',    type: 'string'},
                {name: 'name',  type: 'string'}
            ],
            proxy: {
                    type            : 'ajax',
                    format          : 'json',
                    batchActions    : true,
                    url     : '/cake4/rd_cake/meshes/mesh-ssids-view.json',
                    reader: {
                        type            : 'json',
                        rootProperty    : 'items',
                        messageProperty : 'message'
                    }
            },
            autoLoad: false
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
