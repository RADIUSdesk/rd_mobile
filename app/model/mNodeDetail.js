// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mNodeDetail', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',               type: 'int'     },
         {name: 'mesh_id',          type: 'int'     },
         {name: 'name',             type: 'string'  },
         {name: 'description',      type: 'string'  },
         {name: 'mac',              type: 'string'  },
         {name: 'hardware',         type: 'string'  },
         {name: 'hw_human',         type: 'string'  },
         {name: 'power',            type: 'int'     },
         {name: 'ip',               type: 'string'  },
	'last_contact',
	'state',
	'hw_human',
	'mem_free',
	'mem_total',
	'uptime',
	'system_time',
	'load_1',
	'load_2',
	'load_3',
	'release',
	'cpu',
	'last_cmd',
	'last_cmd_status',
    'last_contact_human',
    'gateway',
    'openvpn_list',
    'config_fetched_human',
    'config_fetched',
    'config_state',
	'uptimhist',
	'uptimhistpct',
	'dayuptimehist'				
  	]
});
