// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbSchedule', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbSchedule',
    label      		: 'Schedule',
    valueField      : 'id',
    displayField    : 'name',
    name            : 'schedule_id',
    initialize      : function() {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        listeners: {
            load: function(store, records, successful) {
            	if(me.include_all_option){
					me.setValue(0); //reset the value of the combobox when reloading to all schedules
					console.log("Set it to zero");
				}    
            },
            scope: me
        },
        proxy: {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/schedules/index-combo.json',
                reader: {
                    type            : 'json',
                    rootProperty    : 'items',
                    messageProperty : 'message',
                    totalProperty   : 'totalCount' //Required for dynamic paging
                }                              
            },
            autoLoad    : true
        });
        
        if(me.include_all_option){
        	s.getProxy().setExtraParams({include_all_option: true});
        }      
             
        me.setStore(s);
        this.callParent(arguments);
    }
});
