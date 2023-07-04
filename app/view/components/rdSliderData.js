Ext.define('RdMobile.view.components.rdSliderData', {
    extend      : 'Ext.Panel',
    alias       : 'widget.rdSliderData', 
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
				width       : 70,
				name        : me.sliderName+'_unit',
				value       : 'gb', //Default Gb
				store: [
				     { id  : 'mb', name: 'Mb' },
				     { id  : 'gb', name: 'Gb' },
				 ]
			 }
		];		      
        me.setItems(items);
    }  
});

