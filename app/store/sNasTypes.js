// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.store.sNasTypes', {
    extend: 'Ext.data.Store',
    model: 'RdMobile.model.mNasType',
    proxy: {
            type    : 'ajax',
            format  : 'json',
            batchActions: true, 
            url     : '/cake4/rd_cake/nas/nas-types.json',
            reader: {
                type: 'json',
                rootProperty: 'items',
                messageProperty: 'message'
            }
    },
    autoLoad: true
});
