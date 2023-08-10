// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mMeshEntry', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',               type: 'int'     },
         {name: 'name',             type: 'string'  },
         {name: 'encryption',       type: 'string'  },
         {name: 'hidden',           type: 'bool'},
         {name: 'isolate',          type: 'bool'},
         {name: 'apply_to_all',     type: 'bool'},
         {name: 'frequency_band',   type: 'string'},
         {name: 'connected_to_exit',type: 'bool'}
        ]
});
