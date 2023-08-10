// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.mainRadius.vcMainRadius', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainRadius',
    config		: {
        cntPermanentUsers  	: 1,
        cntVouchers			: 2,
        cntDevices			: 3,
        cntRadaccts			: 4,
        cntDynamicClients	: 5,
        cntUnknownDynamicClients : 6,
        cntNas				: 7,
        cntProfiles			: 8,
        cntProfileComponents: 9,
        cntRealms			: 10,
        cntRadiusGraphs		: 11
    },
    control: {
    	'gridMainRadiusUsers': {
            cellselection: 'onGridUsersChildTap'
        },
        'gridMainRadiusComponents': {
            cellselection: 'onGridComponentsChildTap'
        }
    },
    onGridUsersChildTap : function(a,b,c){
    	var me = this;
    	console.log("Tapped Grid Main RADIUS");
    	var col = b[0][0]; 
    	var row = b[0][1];
    	var r   = a.getStore().findRecord('id',row);
    	
    	if((col == 0)&&(row == 0)){    	
    		me.getView().setActiveItem(me.getCntPermanentUsers());
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-user fa-1x"></i> Permanent Users');
    	}
    	if((col == 1)&&(row == 0)){    	
    		me.getView().setActiveItem(me.getCntVouchers());
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-ticket-alt fa-1x"></i> Vouchers');
    	}   	
    	if((col == 0)&&(row == 1)){ 
    		me.getView().setActiveItem(me.getCntDevices());
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-tablet-alt fa-1x"></i> BYOD');
    	}
    	
    	if((col == 1)&&(row == 1)){ 
    		me.getView().setActiveItem(me.getCntRadaccts());
    		var cntRG 		= me.getView().getActiveItem();
			cntRG.getController().clearBackButton();
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-running fa-1x"></i> Activity Monitor');
    	}
    },
    onGridComponentsChildTap : function(a,b,c){
    	var me = this;
    	console.log("Tapped Grid Main RADIUS");
    	var col = b[0][0]; 
    	var row = b[0][1];
    	
    	if((col == 0)&&(row == 0)){ 
    		me.getView().setActiveItem(me.getCntDynamicClients());
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-circle-notch fa-1x"></i> RADIUS Clients');
    	}
    	
    	if((col == 1)&&(row == 0)){ 
    		me.getView().setActiveItem(me.getCntNas());
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-cube fa-1x"></i> NAS');
    	}
    	
    	if((col == 0)&&(row == 1)){ 
    		me.getView().setActiveItem(me.getCntProfiles());
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-cubes fa-1x"></i> Profiles');
    	}
    	
    	if((col == 1)&&(row == 1)){ 
    		me.getView().setActiveItem(me.getCntRealms());
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-volleyball-ball fa-1x"></i> Realms');
    	}
    }
});
