// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mUnknownDynamicClient', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',               type: 'int'     },
         {name: 'nasidentifier',    type: 'string'  },
         {name: 'calledstationid',  type: 'string'  },
		 {name: 'last_contact_ip',  type: 'string'  },
		 {name: 'last_contact',    	type: 'date'},
         'last_contact_human',
         'country_code',
         'country_name',
         'city',
         'postal_code'
        ]
});

