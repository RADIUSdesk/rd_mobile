// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbProfile', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbProfile',
    label      		: 'Profile',
    forceSelection  : true,
    queryMode       : 'remote',
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    queryMode       : 'local',
    name            : 'profile_id',
    initialize      : function() {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
        model: 'RdMobile.model.mProfile',
        proxy: {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/profiles/index-ap.json',
                reader: {
                    type            : 'json',
                    rootProperty    : 'items',
                    messageProperty : 'message'
                }
            },
            autoLoad    : true
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
