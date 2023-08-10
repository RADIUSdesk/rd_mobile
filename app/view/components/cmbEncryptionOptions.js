// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbEncryptionOptions', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbEncryptionOptions',
    label      		: 'Encryption',
    queryMode       : 'local',
    valueField      : 'id',
    displayField    : 'name',
    mode            : 'local',
    itemId          : 'encryption',
    name            : 'encryption',
    value           : 'none',
    required		: true,
    errorTarget		: 'under',
    initialize		: function(){
        var me      = this;
        var s       = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            proxy: {
                    type    : 'ajax',
                    format  : 'json',
                    batchActions: true, 
                    url     : '/cake4/rd_cake/meshes/encryptionOptions.json',
                    reader: {
                        type            : 'json',
                        rootProperty    : 'items',
                        messageProperty : 'message'
                    }
            },
            autoLoad: true
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
