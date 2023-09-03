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
    	'<div style="width:250px;padding:10px;border-radius:3px;border:1px solid #9d9e9e;background:#edf1f2;">',
		'<img src="/cake4/rd_cake/img/hardwares/{photo_file_name}" alt="Hardware Model" style="float:right;width:42px;height:42px;">',
        '<div>',
            '<span style="font-weight:bold;font-size:16px;">{vendor}</span>',
       	    '<span style="font-size: 14px;color: #4d4d4d;">   {model}</span>',
        '</div>',
        "<tpl if='radios == \"3\"'>",
            '<div style="color: #d35b0a;"><i class="fa fa-wifi fa-1x"></i> Tri Radio</div>',
        '</tpl>',
        "<tpl if='radios == \"2\"'>",
            '<div style="color: #4286f4;"><i class="fa fa-wifi fa-1x"></i> Dual Radio</div>',
        '</tpl>',
        "<tpl if='radios == \"1\"'>",
            '<div style="color: #20871f;"><i class="fa fa-wifi fa-1x"></i> Single Radio</div>',
        '</tpl>',
        "<tpl if='radios == \"0\"'>",
            '<div style="color: #f49b42;"><i class="fa fa-exclamation-circle fa-1x"></i> No Radio</div>',
        '</tpl>',
        '</div>'
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
