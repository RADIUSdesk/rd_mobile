// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mAccessPointExit', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',               type: 'int'     },
         {name: 'ap_profile_id',    type: 'int'     },
         {name: 'type',             type: 'string'  },
         {name: 'vlan',             type: 'int'  },
         'connects_with'
        ]
});
