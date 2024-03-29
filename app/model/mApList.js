// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mApList', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',                   type: 'int'     },
         {name: 'ap_profile_id',        type: 'int'     },
		 {name: 'ap_profile',           type: 'string'  },
         {name: 'name',                 type: 'string'  },
		 {name: 'owner',        	    type: 'string'  },
         {name: 'description',          type: 'string'  },
         {name: 'mac',                  type: 'string'  },
		 {name: 'last_contact',    	    type: 'date'    },
		 {name: 'last_contact_from_ip', type: 'string' },
         {name: 'update',       	    type: 'bool'},
         {name: 'delete',       	    type: 'bool'},      
         'last_contact_human',
         'state',
         'country_code',
         'country_name',
         'city',
         'postal_code',
         'data_past_hour',
         'newest_station',
         'newest_time',
         'newest_vendor',
         'ssids',
         'hardware',
         'hw_human',
         'last_cmd',
	     'last_cmd_status',
	     'openvpn_list',
	     'config_fetched_human',
         'config_fetched',
         'config_state'		
        ]
});
