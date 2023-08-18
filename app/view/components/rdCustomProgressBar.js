// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.rdCustomProgressBar', {
    extend		: 'Ext.Progress',
    xtype   	: 'rdCustomProgressBar',
   	minGradient	: null,
    midGradient	: null,
    maxGradient	: null,

    getColorGradient: function(percentage) {
        let beginColor = this.minGradient;
        let midColor = this.midGradient;
        let endColor = this.maxGradient;
        let fade = percentage;

        // If gradient between three colors, adjust fade
        if (endColor) {
            fade *= 2;

            // Find interval and adjust fade
            if (fade >= 1) {
                fade -= 1;
                beginColor = this.midGradient;
                midColor = this.maxGradient;
            }
        }

        const redDelta = midColor.red - beginColor.red;
        const greenDelta = midColor.green - beginColor.green;
        const blueDelta = midColor.blue - beginColor.blue;

        const gradient = {
            red: parseInt(Math.floor(beginColor.red + (redDelta * fade)), 10),
            green: parseInt(Math.floor(beginColor.green + (greenDelta * fade)), 10),
            blue: parseInt(Math.floor(beginColor.blue + (blueDelta * fade)), 10)
        };

        return this.rgbToHex(gradient.red, gradient.green, gradient.blue);
    },

    onRender: function () {
        const me = this;
        me.width = 300;
        me.margin = '5 5 0 5',
            me.callParent(arguments);
    },

    setValue: function (newVal) {
        this.callParent([newVal]);
        this.updateColor(this, newVal);
    },

    colorValueToHex: colorValue => {
        const hex = colorValue.toString(16);
        return hex.length == 1 ? `0${hex}` : hex;
    },

    rgbToHex: function (r, g, b) {
        const hexRed = this.colorValueToHex(r);
        const hexGreen = this.colorValueToHex(g);
        const hexBlue = this.colorValueToHex(b);

        return `#${hexRed}${hexGreen}${hexBlue}`;
    },

    updateColor: function (obj, val) {
        if (!obj.el) {
            return;
        }

        const newColor = this.getColorGradient(val);

        obj.el.child(".x-progress-bar", true).style.backgroundColor = newColor;
        obj.el.child(".x-progress-bar", true).style.borderRightColor = newColor;
        obj.el.child(".x-progress-bar", true).style.backgroundImage = "url('')";
    }
});
