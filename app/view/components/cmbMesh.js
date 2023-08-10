// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbMesh', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbMesh',
    label      		: 'Mesh',
    queryMode       : 'remote',
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    name            : 'mesh_id',
    queryMode       : 'remote',
    mode            : 'remote',
    required		: true,
	errorTarget		: 'under',
	floatedPicker   : {
        xtype: 'boundlist',
        infinite: true,
        // BoundListNavigationModel binds to input field
        // Must only be enabled when list is visible
        navigationModel: {
            disabled: true
        },
        plugins: {
            listpaging: {
                autoPaging: true,
                loadMoreText: 'More records..',
                noMoreRecordsText: 'No more records.'
            }
        },
        scrollToTopOnRefresh: false,
        loadingHeight: 70,
        maxHeight: 300,
        floated: true,
        axisLock: true,
        hideAnimation: null,
        variableHeights: true
    },
    initialize		: function () {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        proxy: {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/meshes/index.json',
                reader: {
                    type            : 'json',
                    rootProperty    : 'items',
                    messageProperty : 'message',
                    totalProperty   : 'totalCount' //Required for dynamic paging
                }
            },
            autoLoad    : true
        });
        me.setStore(s);
        this.callParent(arguments);
    }
});
