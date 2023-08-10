// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbCloud', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbCloud',
    label      		: 'Cloud',
    forceSelection  : true,
    queryMode       : 'remote',
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    queryMode       : 'local',
    initialize      : function() {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
        model: 'RdMobile.model.mProfile',
        proxy: {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/clouds/index-cmb.json',
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
