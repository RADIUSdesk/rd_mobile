// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.cmpBasic', {
    extend  : 'Ext.dataview.DataItem',
    xtype   : 'cmpBasic',
 /*   items   : [
        {
            xtype : 'toolbar',
            docked: 'bottom',
            items	: [
                {
                    xtype: 'spacer'
                },
				{ ui: 'normal', iconCls: 'x-fa fa-trash-alt' },
				{ ui: 'normal', iconCls: 'x-fa fa-pencil-alt' }
			]
        }
    ],*/
    config: {
        compdata: undefined,
    },    
    initialize: function () {
        const me = this;
              
		this.add([
		    {
		        xtype : 'toolbar',
		        docked: 'bottom',
		        items	: [
		            {
		                xtype: 'spacer'
		            },
					{ ui: 'normal', iconCls: 'x-fa fa-trash-alt' },
					{ ui: 'normal', iconCls: 'x-fa fa-pencil-alt' }
				]
		    }
		]);
		this.callParent();
		//console.log(this._record)      
    },
    listeners: {
        show: {
            fn: function(a,b,c){             
            	console.log(b); 

            }
        }
    }
 });
