// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.model.mRadacct', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',           type: 'int'     },
        'acctsessionid',
        'acctuniqueid',
        'username',
        'groupname',
        'realm',
        'nasipaddress',
        'nasidentifier',
        'nasportid',
        'nasporttype',
        'acctstarttime',
        'acctstoptime',
        'acctsessiontime',
        'acctauthentic',
        'connectinfo_start',
        'connectinfo_stop',
        'acctinputoctets',
        'acctoutputoctets',
        'calledstationid',
        'callingstationid',
        'acctterminatecause',
        'servicetype',
        'framedprotocol',
        'framedipaddress',
        'acctstartdelay',
        'acctstopdelay',
        'xascendsessionsvrkey',
        'active',
        'online_human'
        ]
});
