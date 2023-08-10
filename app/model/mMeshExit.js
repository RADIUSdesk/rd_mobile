// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mMeshExit', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',               type: 'int'     },
         {name: 'mesh_id',          type: 'int'     },
         {name: 'type',             type: 'string'  },
         'connects_with',
         {name: 'vlan',             type: 'int'  },
         {name: 'auto_detect',      type: 'bool'}
        ]
});
