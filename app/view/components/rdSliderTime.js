// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.rdSliderTime', {
    extend      : 'Ext.Panel',
    alias       : 'widget.rdSliderTime', 
    layout      : {
        type        : 'hbox'
    },
    //==VALUES TO SET==
    maxValue    : 1023,
    minValue    : 1,
    value       : 1,
    sliderName  : 'slider_name',
    sliderWidth : 300,
    numberWidth : 60,
    //==END VALUES TO SET==
    requires    : [
        'RdMobile.view.components.vcSlider'
    ],
    controller  : 'vcSlider',
    initialize: function () {
        var me  = this;   
        var items = [
			{
				xtype		: 'sliderfield',
				minValue    : me.minValue,
				maxValue    : me.maxValue,
				increment   : 1,
				name        : me.sliderName+'_amount',
				flex		: 1,
				listeners   : {
					change  : 'sldrAmountChange'
				}
			},
			 {
		        xtype		: 'numberfield',
		        value       : 1,
				maxValue    : me.maxValue,
				minValue    : me.minValue,
		        width 		: 70,
		        listeners   : {
					change  : 'nrAmountChange'
				}
		    },
			{
                xtype       : 'combobox',
                queryMode   : 'local',
                displayField: 'name',
                valueField  : 'id',
                width       : 100,
                name        : me.sliderName+'_unit',
                value       : 'hour', //Default Gb
                 store: [
                    { id  : 'minute',   name: 'Minutes' },
                    { id  : 'hour',     name: 'Hours' },
                    { id  : 'day',      name: 'Days' },
                 ]
             }
			 
		];		      
        me.setItems(items);
    }  
});

