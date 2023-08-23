// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbPredefinedCommand', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbPredefinedCommand',
    valueField      : 'id',
    displayField    : 'name',
    name            : 'predefined_command_id',
    tpl	            : Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div  class="x-boundlist-item">',
                '<div>',
                    "<tpl if='action == \"execute\"'><span style=\"font-weight:bold;font-size:16px;\"><i class=\"fa fa-cogs\"></i> {name}</span></tpl>",
                    "<tpl if='action == \"execute_and_reply\"'><span style=\"font-weight:bold;font-size:16px;\"><i class=\"fa fa-cogs\"></i><i class=\"fa fa-comment\"></i> {name}</span></tpl>",
                '</div>',
            '</div>',
        '</tpl>'
    ),
    initialize: function () {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
        fields: ['id', 'name', 'action'],
        proxy: {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/predefined-commands/index-combo.json',
                reader: {
                    type            : 'json',
                    rootProperty    : 'items',
                    messageProperty : 'message',
                    totalProperty   : 'totalCount' //Required for dynamic paging
                }
            },
            autoLoad    : false
        });
        me.setStore(s);
        this.callParent(arguments);
    }
});
