// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmbOperator', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbOperator',
    label		    : 'Operator',
    forceSelection  : true, //?
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    allowBlank      : false,//?
    name            : 'op',
    pageSize        : 1, // The value of the number is ignore -- it is essentially coerced to a boolean, and if true, the paging toolbar is displayed. ??
	required		: true,
    errorTip		: {
        anchor	: true,
        align	: 'l-r?'
    },
    errorTarget		: 'under',
    initialize      : function() {    
        var me	= this;
        var s = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data : [                            
             	{'id': '=' ,  	'name': '=' },
             	{'id': ':=' ,  	'name': ':=' },
             	{'id': '+=' ,  	'name': '+=' },
             	{'id': '==' ,  	'name': '==' },
             	{'id': '-=' ,  	'name': '-=' },
             	{'id': '<=' ,  	'name': '<=' },
             	{'id': '>=' ,  	'name': '>=' },
             	{'id': '!*' ,  	'name': '!*' },
            ]
        });          
        me.setStore(s); 
        this.callParent(arguments);
    }
});
