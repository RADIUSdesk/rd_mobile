// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'RdMobile.Application',

    name: 'RdMobile',

    requires: [
        // This will automatically load all classes in the RdMobile namespace
        // so that application classes do not need to require each other.
        'RdMobile.*'
    ]
});
