// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbEncryptionOptionsSimple', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbEncryptionOptionsSimple',
    label      		: 'Encryption',
	required		: true,
    displayField    : 'text',
    valueField      : 'id',
    name            : 'wbw_encryption',
    value           : 'none',
    initialize		: function () {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data : [
                {"id":"none",      "text": 'None'},
                {"id":"wep",       "text": 'WEP'},
                {"id":"psk",       "text": 'WPA Personal'},
                {"id":"psk2",       "text": 'WPA2 Personal'}           
            ]
        });
        me.setStore(s);
        this.callParent(arguments);
    }
});
