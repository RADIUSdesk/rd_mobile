// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.store.sAttributes', { 
    extend: 'Ext.data.Store',
    model: 'RdMobile.model.mAttribute',
    proxy: {
            type  	:'ajax',
            url   	: '/cake4/rd_cake/profile-components/attributes.json',
            format  : 'json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
    },
    autoLoad: false
});
