// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mDynamicClient', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',           type: 'int'     },
         {name: 'name',         type: 'string'  },
         {name: 'owner',        type: 'string'  }, 
         {name: 'nasidentifier',type: 'string'  },
         {name: 'calledstationid',type: 'string'},
         {name: 'last_contact',   type: 'date'},
         {name: 'last_contact_ip',  type: 'string'  },
         'last_contact_human',
         {name: 'timezone',  type: 'string'  },
         {name: 'monitor',  type: 'string'  },
         {name: 'session_auto_close',  type: 'bool'  },
         {name: 'session_dead_time',  type: 'int'  },
         {name: 'active',  type: 'bool'  },
         {name: 'on_public_maps',  type: 'bool'  },
         'lat',
         'lon',
         {name: 'user_id',           type: 'int'     },
         'country_code',
         'country_name',
         'city',
         'postal_code',
         {name: 'data_limit_active',  type: 'bool'  },
         {name: 'data_limit_amount'},
         {name: 'data_limit_unit'},
         {name: 'data_limit_reset_on'},
         {name: 'data_limit_reset_hour'},
         {name: 'data_limit_reset_minute'},
         {name: 'perc_data_used'},
         {name: 'data_used'},
         {name: 'data_cap'},
         {name: 'data_limit_cap'}, //Hard or Soft
         
         {name: 'daily_data_limit_active',  type: 'bool'  },
         {name: 'daily_data_limit_amount'},
         {name: 'daily_data_limit_unit'},
         {name: 'daily_data_limit_reset_hour'},
         {name: 'daily_data_limit_reset_minute'},
         {name: 'daily_perc_data_used'},
         {name: 'daily_data_used'},
         {name: 'daily_data_cap'},
         {name: 'daily_data_limit_cap'}, //Hard or Soft
         {name: 'update',       type: 'bool'},
         {name: 'delete',       type: 'bool'}
        ]
});
