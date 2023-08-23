// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.cmbApHardwareOptions', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbApHardwareOptions',
    label      		: 'Hardware Model',
    valueField      : 'id',
    displayField    : 'name',
    itemId          : 'hardware',
    name            : 'hardware',
    id_field        : 'fw_id',
    required		: true,
	errorTarget		: 'under',
	queryMode		: 'local',
    itemTpl         : Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div  class="x-boundlist-item">',
                '<div>',
		            '<span style="font-weight:bold;font-size:16px;">{vendor}</span>',
               	    '<span style="font-size: 14px;color: #4d4d4d;">   {model}</span>',
                '</div>',
                '<div style="border-bottom: 1px solid lightgrey;">',
                    '<ul class="fa-ul">',
                        "<tpl if='radios == \"3\"'>",
                            '<li style="color: #d35b0a;"><i class="fa-li fa fa-wifi"></i>Tri Radio</li>',
                        '</tpl>',
                        "<tpl if='radios == \"2\"'>",
                            '<li style="color: #4286f4;"><i class="fa-li fa fa-wifi"></i>Dual Radio</li>',
                        '</tpl>',
                        "<tpl if='radios == \"1\"'>",
                            '<li style="color: #20871f;"><i class="fa-li fa fa-wifi"></i>Single Radio</li>',
                        '</tpl>',
                        "<tpl if='radios == \"0\"'>",
                            '<li style="color: #f49b42;"><i class="fa-li fa  fa-exclamation-circle"></i>No Radio</li>',
                        '</tpl>',
                    '</ul>',
                '</div>',    
            '</div>',
        '</tpl>'
    ),
    initialize: function () {
        var me      = this;
        var s       = Ext.create('Ext.data.Store', {
            fields: ['id', 'name','radios','vendor','model','device_type'],
            proxy: {
                    type    : 'ajax',
                    format  : 'json',
                    batchActions: true, 
                    url     : '/cake4/rd_cake/hardwares/ap-profiles-list.json',
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
