// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mVoucher', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',           type: 'int'     },
         {name: 'owner',        type: 'string'  },
		 {name: 'user_id',      type: 'int'  },
         {name: 'realm',        type: 'string'  },
         {name: 'realm_id'},
         {name: 'profile',      type: 'string'  },
         {name: 'profile_id'},
         'name',
         'password',
         {name: 'batch',        type: 'string'  },
            'perc_time_used',
            'perc_data_used',
         {name: 'status',       type: 'string'  },
         {name: 'last_accept_time', type: 'date' },
         {name: 'last_accept_time_in_words',  type: 'string'  },
         {name: 'last_accept_nas'},
         {name: 'last_reject_time', type: 'date'},
         {name: 'last_reject_time_in_words', type: 'string'  },
         {name: 'last_reject_nas'},
         {name: 'last_reject_message'},
         {name: 'from_date'},
         {name: 'to_date'},
         'data_usage',
         'time_usage',
         {name: 'update',       type: 'bool'},
         {name: 'delete',       type: 'bool'},
         {name: 'extra_name',   type: 'string'  },
         {name: 'extra_value',  type: 'string'  },
         {name: 'created',           type: 'date'},
         {name: 'modified',          type: 'date'},
         {name: 'created_in_words',  type: 'string'  },
         {name: 'modified_in_words', type: 'string'  }
        ]
});
