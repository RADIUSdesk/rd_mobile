// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbDynamicDetail', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbDynamicDetail',
    label      		: 'Login Page',
    forceSelection  : true, 
    valueField      : 'id',
    displayField    : 'name',
    queryMode       : 'remote',
    mode            : 'remote',
    name            : 'dynamic_detail_id',
    initialize      : function() {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
            model       : 'RdMobile.model.mDynamicDetail',
            //To make it load AJAXly from the server specify the follown 3 attributes
            buffered    : false,
            remoteSort  : true,
            proxy: {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/dynamic-details/index.json',
                reader: {
                    type            : 'json',
                    rootProperty    : 'items',
                    messageProperty : 'message',
                    totalProperty   : 'totalCount' //Required for dynamic paging
                },
                simpleSortMode: true //This will only sort on one column (sort) and a direction(dir) value ASC or DESC
            },
            autoLoad: false
        });
        me.setStore(s);
        this.callParent(arguments);
    }
});
