// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.aps.pnlApRadioDetail', {
    extend      : 'Ext.Panel',
    border		: true,
    iconCls 	: 'x-fa fa-wifi',
    alias       : 'widget.pnlApRadioDetail',
    requires    : [
        'RdMobile.view.aps.vcApRadioDetail'
    ],
    radio_nr    : 0,
    controller  : 'vcApRadioDetail',
    initialize  : function () {
        var me      = this;
        me.setTitle("RADIO "+me.radio_nr);   
        var radio_nr= "radio"+me.radio_nr;
         
       	var items    = [
        	{
				xtype		: 'togglefield',
				name        : radio_nr +'_enabled',
				itemId      : radio_nr +'_enabled',
				label		: 'Enabled',
				labelWidth	: '40%',
				value       : 1,
			    listeners   : {
					change  : 'sldrToggleChange'
				}
			},
			{
			    xtype       : 'hiddenfield',
			    name        : radio_nr +'_disabled',
			    itemId      : radio_nr +'_disabled'
			},
			{
			    xtype       : 'hiddenfield',
			    name        : radio_nr +'_band',
			    itemId      : 'band',
			    value		: 20, //Default value
			    listeners   : {
			        change  : 'onBandChange'
		        }
			},
			{
			    xtype       : 'hiddenfield',
			    name        : radio_nr +'_mode',
			    itemId      : 'mode',
			    listeners   : {
			        change  : 'onModeChange'
		        }
			},
			{ 
			    xtype       : 'container',
			    itemId      : 'cntDetail',
			    items       : [	
			        {
				        xtype       : 'cmbTwoGigChannels',
				        name        : radio_nr+'_channel_two',
				        hidden		: false,
				        disabled	: false,
				        itemId		: 'numRadioTwoChan'
			        },
			        {
				        xtype       : 'cmbFiveGigChannels',
				        name        : radio_nr+'_channel_five',
				        hidden		: true,
				        disabled	: true,
				        itemId		: 'numRadioFiveChan'
			        },
			        {
			            xtype       : 'container',
                        layout      : 'hbox',
                        items       : [
                            {
                                xtype       : 'displayfield',
                                width       : 80,
                                value       : '0(dBm)'
                            },
                            {
			                    xtype       : 'sliderfield',
                                name        : radio_nr +'_txpower',
                                itemId      : 'sldrPower',
                                flex		: 1,
                                increment   : 1,
                                minValue    : 0,
                                maxValue    : 30,
                                listeners   : {
					                change  : 'sldrPowerChange'
				                }
                            }
                        ]
                    },
                    {
                        xtype       : 'radiogroup',
                        label  		: 'Width',
                        itemId      : 'rgrpWidth',
                        vertical    : false,
                        items       : [
                            {
                                label  	  : '20MHz',
                                name      : radio_nr +'_width',
                                itemId    : 'radio_width_20',
                                value	  : '20',
								labelWidth: 80
                            }, 
                            {
                                label  	  : '40MHz',
                                name      : radio_nr +'_width',
                                itemId    : 'radio_width_40',
                                value	  : '40',
                                labelWidth: 80
                            },
                            { 
                                label     : '80MHz',
                                name      : radio_nr +'_width',
                                itemId    : 'radio_width_80',
                                value	  : '80',
                                hidden    : true,
                                labelWidth: 80
                            },
                            {
                                label     : '160MHz',
                                name      : radio_nr +'_width',
                                itemId    : 'radio_width_160',
                                value	  : '160',
                                hidden    : true,
                                labelWidth: 80
                            }
                        ]
                    },
                    {
                        xtype       : 'checkbox',
                        label       : 'Noscan',
                        name        : radio_nr +'_noscan',
                        labelWidth  : 'auto'

                    },
                    {
                        xtype       : 'checkbox',
                        label       : 'Include Beacon Interval',
                        name        : radio_nr +'_include_beacon_int',
                        labelWidth  : 'auto',
                        listeners   : {
			                change  : 'OnChkIncludeBeaconIntervalChange'
		                }
                    },
                    {
			            xtype       : 'numberfield',
			            name        : radio_nr +'_beacon_int',
			            itemId      : 'nfBeaconInterval',
			            label       : 'Beacon Interval',
			            value       : 100,
			            hidden      : true,
			            disabled    : true,
			            maxValue    : 65535,
			            minValue    : 15
			        },
			        {
                        xtype       : 'checkbox',
                        label       : 'Include Distance',
                        name        : radio_nr +'_include_distance',
                        labelWidth  : 'auto',
                        listeners   : {
			                change  : 'OnChkIncludeDistanceChange'
		                }
                    },
                    {
			            xtype       : 'numberfield',
			            name        : radio_nr +'_distance',
			            itemId      : 'nfDistance',
			            hidden      : true,
			            disabled    : true,
			            label       : 'Distance',
			            value       : 300,
			            maxValue    : 3000,
			            minValue    : 1
			        },
                    {
                        xtype       : 'textareafield',
                        grow        : true,
                        label       : 'HT Capabilities',
                        name        : radio_nr +'_ht_capab',
                        value		: ''
                    }     
                ]
            }
        ]; 
        me.setItems(items);      
        this.callParent(arguments);
    }
});
