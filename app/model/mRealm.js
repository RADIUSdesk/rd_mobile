// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mRealm', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',       type: 'int'     },
         {name: 'name',     type: 'string'  },
         {name: 'owner',    type: 'string'  },
         'phone','fax', 'cell', 'email','url', 'street_no', 'street','town_suburb','city','country','lat','lon',
		 'twitter','facebook', 'youtube','google_plus','linkedin','t_c_title', 't_c_content',
         {name: 'update',  type: 'bool'},
         {name: 'delete',  type: 'bool'},
         {name: 'created',           type: 'date'},
         {name: 'modified',          type: 'date'},
         {name: 'created_in_words',  type: 'string'  },
         {name: 'modified_in_words', type: 'string'  }
        ]
});
