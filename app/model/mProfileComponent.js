// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mProfileComponent', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',           type: 'int'     },
         {name: 'name',         type: 'string'  },
         {name: 'owner',        type: 'string'  },
         {name: 'check_attribute_count',        type: 'int'  },
         {name: 'reply_attribute_count',        type: 'int'  },
         {name: 'update',       type: 'bool'},
         {name: 'delete',       type: 'bool'}
        ]
});
