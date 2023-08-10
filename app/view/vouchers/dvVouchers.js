// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.vouchers.dvVouchers', {
    extend  : 'Ext.dataview.DataView',
    xtype   : 'dvVouchers',
    config  : {
        compdata: undefined,
    },    
    initialize: function () {
        const me = this;

        me.setStore(Ext.create(Ext.data.Store,{
            model: 'RdMobile.model.mVoucher', //FIXME MODEL 
            proxy: {
                type        :'ajax',
                url         : 'http://127.0.0.1/cake4/rd_cake/vouchers/index.json?token=fe707fcd-6316-4c26-b14c-03ae7fc49065&sel_language=4_4&cloud_id=24',
                batchActions: true,
                format      : 'json',
                reader      : {
                    type        : 'json',
                    rootProperty: 'items'
                }
            },
            listeners: {
            	load: function(store, records, successful) {
                    if(!successful){
                        console.log('Error encountered');
                    } 
                },
                exception: function(proxy, response, options) {
		            var jsonData = response.responseJson;
		            console.log('Error encountered');
		        },
                scope: this
            }
        }));

        me.setItemTpl('<div>{name} is {age} years old</div>');
        me.getStore().reload()		
		this.callParent();
		//console.log(this._record)      
    }
 });
