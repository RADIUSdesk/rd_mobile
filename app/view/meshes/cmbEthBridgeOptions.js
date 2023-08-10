// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.cmbEthBridgeOptions', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbEthBridgeOptions',
    label      		: 'Bridge With',
    valueField      : 'id',
    displayField    : 'name',
    itemId          : 'eth_br_with',
    name            : 'eth_br_with',
    itemTpl         : Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div  class="x-boundlist-item">',
                '<div>',
                    "<tpl if='type == \"bridge\"'><span style=\"font-weight:bold;font-size:16px;\"><i class=\"fa fa-bars\"></i> {type}</span></tpl>",
                    "<tpl if='type == \"captive_portal\"'><span style=\"font-weight:bold;font-size:16px;\"><i class=\"fa fa-key\"></i> {type}</span></tpl>",
                    "<tpl if='type == \"nat\"'><span style=\"font-weight:bold;font-size:16px;\"><i class=\"fa fa-arrows-alt\"></i> {type}</span></tpl>",
                '</div>',
                '<tpl if="Ext.isEmpty(entries)"><div style=\"color:grey;font-size:12px;\">No SSID Connected</div></tpl>', 
                '<tpl for="entries">',     // interrogate the kids property within the data
                    '<div style=\"color:#006622;font-size:12px;\"><i class=\"fa fa-wifi\"></i> SSID {name}</div>',
                '</tpl>',
            '</div>',
        '</tpl>'
    ),
    displayTpl      : Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '{name}',
        '</tpl>'
    ),   
    initialize      : function() { 
        var me      = this;
        var s       = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'id',    type: 'int'},
                {name: 'name',  type: 'string'},
                {name: 'type',  type: 'string'}
            ],
            proxy: {
                    type    	: 'ajax',
                    format  	: 'json',
                    batchActions: true, 
					extraParams	: { 'mesh_id' : me.meshId}, 
                    url     	: '/cake4/rd_cake/meshes/mesh_exit_view_eth_br.json',
                    reader: {
                        type	: 'json',
                        rootProperty	: 'items',
                        messageProperty: 'message'
                    }
            },
            autoLoad: true
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
