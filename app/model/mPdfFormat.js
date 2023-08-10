// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mPdfFormat', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',           type: 'string'  },
         {name: 'name',         type: 'string'  },
         {name: 'active',       type: 'bool'    }
        ]
});
