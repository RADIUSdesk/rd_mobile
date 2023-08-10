// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('Rd.view.components.cmbOpenVpnServers', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbOpenVpnServers',
    label      		: 'OpenVPN Server',
    queryMode       : 'local',
    valueField      : 'id',
    displayField    : 'name',
    editable        : false,
    mode            : 'local',
    name            : 'openvpn_server_id',
    initialize: function () {
        const me  = this;  
        var s     = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            proxy: {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/openvpn-servers/index.json',
                reader: {
                    type: 'json',
                    rootProperty: 'items',
                    messageProperty: 'message'
                }
            },
            autoLoad: true
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
