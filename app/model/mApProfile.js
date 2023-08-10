// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mApProfile', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',               type: 'int'     },
         {name: 'name',             type: 'string'  },
         {name: 'ap_count',         type: 'int'},
         {name: 'aps_up',           type: 'int'},
         {name: 'aps_down',         type: 'int'},
         {name: 'connected_users',  type: 'int'},
         {name: 'update',           type: 'bool'},
         {name: 'delete',           type: 'bool'},
         {name: 'view',             type: 'bool'}
        ]
});
