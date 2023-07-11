Ext.define('RdMobile.view.mainRadius.vcMainRadius', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainRadius',
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
    		me.getView().setActiveItem(1);
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-user fa-1x"></i> Permanent Users');
    	}
    	if((col == 1)&&(row == 0)){    	
    		me.getView().setActiveItem(2);
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-ticket-alt fa-1x"></i> Vouchers');
    	}   	
    	if((col == 0)&&(row == 1)){ 
    		me.getView().setActiveItem(3);
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-tablet-alt fa-1x"></i> BYOD');
    	}
    },
    onGridComponentsChildTap : function(a,b,c){
    	var me = this;
    	console.log("Tapped Grid Main RADIUS");
    	var col = b[0][0]; 
    	var row = b[0][1];
    	
    	if((col == 0)&&(row == 0)){ 
    		me.getView().setActiveItem(5);
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-circle-notch fa-1x"></i> RADIUS Clients');
    	}
    	
    	if((col == 1)&&(row == 0)){ 
    		me.getView().setActiveItem(6);
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-cube fa-1x"></i> NAS');
    	}
    	
    	if((col == 0)&&(row == 1)){ 
    		me.getView().setActiveItem(7);
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-cubes fa-1x"></i> Profiles');
    	}
    	
    	if((col == 1)&&(row == 1)){ 
    		me.getView().setActiveItem(9);
    		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-volleyball-ball fa-1x"></i> Realms');
    	}
    }
});
