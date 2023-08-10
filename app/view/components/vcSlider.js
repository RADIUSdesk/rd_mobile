// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.vcSlider', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcSlider',
    init    : function() {
        var me = this;
    },
	sldrAmountChange: function(sldr){
        var me 		= this;
		var fc    	= sldr.up('container');
        fc.down('textfield').setValue(sldr.getValue());
    },
    nrAmountChange: function(nr){
        var me 		= this;
		var fc  	= nr.up('container');
        fc.down('sliderfield').setValue(nr.getValue());
    }
});
