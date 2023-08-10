// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mDynamicDetail', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',       type: 'int'     },
         {name: 'name',     type: 'string'  },
         {name: 'owner',    type: 'string'  },
            'user_id',
            'phone','fax', 		'cell', 'email','url', 'street_no', 'street','town_suburb','city','country','lat','lon','theme',
			'register_users', 	'lost_password'
        ]
});
