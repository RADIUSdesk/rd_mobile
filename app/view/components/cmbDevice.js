// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbDevice', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbDevice',
    label		    : 'Device',
    forceSelection  : true, //?
    valueField      : 'id',
    displayField    : 'username',
    typeAhead       : true,
    allowBlank      : false,//?
    queryMode       : 'remote',//?
    mode            : 'remote',//?
    name            : 'device_id',
    pageSize        : 1, // The value of the number is ignore -- it is essentially coerced to a boolean, and if true, the paging toolbar is displayed. ??
	required		: true,
    errorTip		: {
        anchor	: true,
        align	: 'l-r?'
    },
    errorTarget		: 'under',
    initialize      : function() {    
        var me= this;
        var s = Ext.create('Ext.data.Store', {
            model       : 'RdMobile.model.mDevice',
            buffered    : false,
            remoteSort  : true,
            proxy       : {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/devices/index.json',
                reader  : {
                    type			: 'json',
                    rootProperty	: 'items',
                    messageProperty	: 'message',
                    totalProperty	: 'totalCount' //Required for dynamic paging
                },
                simpleSortMode: true //This will only sort on one column (sort) and a direction(dir) value ASC or DESC
            },
            autoLoad    : false
        });
        me.setStore(s);
        
        if(me.device_id){      
        	var rec     = Ext.create('RdMobile.model.mDevice', {username: me.device_name, id: me.device_id});
        	me.getStore().loadData([rec],false);
        	me.setValue(me.device_id);
        }       
        this.callParent(arguments);
    }
});
