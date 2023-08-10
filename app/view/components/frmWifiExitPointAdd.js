// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.frmWifiExitPointAdd', {
    extend  : 'Ext.Panel',
    xtype   : 'frmWifiExitPointAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    iconCls : 'x-fa fa-plus',
    title	: 'Add Exit',
    layout: {
		type        : 'card',
		pack        : 'start',
		align       : 'stretch',
		animation   : 'slide',
		deferredRender: true
	},
    requires	: [
        'RdMobile.view.components.vcWifiExitPointAdd'
    ],
    controller  : 'vcWifiExitPointAdd',
    initialize: function () {
        const me  = this;         
        var scrnType  = me.mkScrnType();
        me.setItems([
            scrnType,
            {
            	itemId	: 'scrnData',
            	xtype	: 'container',
            	layout	: 'fit'
            }
        ]);  
        this.callParent(arguments);  
 	},
 	    //____ AccessProviders tree SCREEN ____
    mkScrnType: function(){

        var me   = this; 
        
        radioItems = [
			    { 
			    	label	: '<i class="fa fa-bars"></i> Ethernet Bridge', 
			    	name	: 'exit_type', 
			    	value	: 'bridge',
			    	labelWidth  : 'auto',
			    	checked	: true 
			    },
			    { 
			    	label	: '<i class="fa fa-arrows-alt"></i> NAT + DHCP',
			    	name	: 'exit_type', 
			    	value	: 'nat',
			    	labelWidth  : 'auto' 
			    },
			    { 
			    	label	: '<i class="fa fa-key"></i> Captive Portal',
			    	name	: 'exit_type', 
			    	value	: 'captive_portal',
			    	labelWidth  : 'auto' 
			    },
			    { 
			    	label	: '<i class="fa fa-quote-right"></i> OpenVPN Bridge',
			    	name	: 'exit_type', 
			    	value	: 'openvpn_bridge',
			    	labelWidth  : 'auto' 
			    },
			    { 
			    	label	: '<i class="fa fa-tag"></i> Layer2 Tagged Ethernet Bridge',
			    	name	: 'exit_type', 
			    	value	: 'tagged_bridge',
			    	labelWidth  : 'auto' 
			    },
			    { 
			    	label	: '<i class="fa fa-tag"></i> Layer3 Tagged Ethernet Bridge', 
			    	name	: 'exit_type', 
			    	value	: 'tagged_bridge_l3',
			    	labelWidth  : 'auto' 
			    }
			];
		
		if(me.grid !== undefined){
			var store = me.grid.getStore();
			var found_bridge = false;
		    store.each(function(item, index, count){
		        var type = item.get('type');
		        if(type == 'bridge'){
		            found_bridge = true;
		            return false;
		        }
		    });
		    if(found_bridge){
		    	Ext.Array.removeAt(radioItems,0); //
		    	radioItems[0].checked = true; 
		    }
		}
                        
        var scrnType = Ext.create('Ext.form.Panel',{
        	itemId 	: 'scrnType',
			buttons	: [
				{ ui: 'forward', text: 'Next', iconCls: 'x-fa fa-arrow-right', 		handler: 'onNext' }  
			],
        	items	:[{
				xtype	: 'radiogroup',
				label	: 'Exit Point Type',
				itemId	: 'rgrpExitType',
				vertical: true,
				items: radioItems
			}]    
        });
        return scrnType;       
    }
});
