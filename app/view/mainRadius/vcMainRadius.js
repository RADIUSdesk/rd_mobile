Ext.define('RdMobile.view.mainRadius.vcMainRadius', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainRadius',
    control: {
    	'gridMainRadiusUsers': {
            cellselection: 'onGridUsersChildTap'
        },
        'gridMainRadiusComponents': {
            cellselection: 'onGridComponentsChildTap'
        },
        '#btnVouchers': {
            tap : 'onBtnVouchersTap'
        },
        '#btnPermanentUsers' :  {
            tap : 'onBtnPermanentUsersTap'
        },
        '#btnBackVouchers' : {
            tap : 'onBtnBackTap'
        },
        '#btnBackPermanentUsers' : {
            tap : 'onBtnBackTap'
        }
    },
    onBtnVouchersTap : function(btn){
    	var me = this;
    	console.log("Vouchers Tapped");
        me.getView().setActiveItem(1);
    },
    onBtnPermanentUsersTap : function(btn){
    	var me = this;
    	console.log("Permanent Users Tapped");
        me.getView().setActiveItem(2);
    },
    onBtnBackTap : function(btn){
        var me = this;
        me.getView().setActiveItem(0);
    },
    onGridUsersChildTap : function(a,b,c){
    	var me = this;
    	console.log("Tapped Grid Main RADIUS");
    	var col = b[0][0]; 
    	var row = b[0][1];
    	var r   = a.getStore().findRecord('id',row);
    	
    	if((col == 0)&&(row == 0)){    	
    		me.getView().setActiveItem(1);
    	}
    	if((col == 1)&&(row == 0)){    	
    		me.getView().setActiveItem(2);
    	}  
    	
    	
    	if(col == 0){
    		console.log(r.get('col_0_name'));
    	}
    	
    	if(col == 1){
    		console.log(r.get('col_1_name'));
    	}
    },
     onGridComponentsChildTap : function(a,b,c){
    	var me = this;
    	console.log("Tapped Grid Main RADIUS");
    	var col = b[0][0]; 
    	var row = b[0][1];
    	var r   = a.getStore().findRecord('id',row);
    	if(col == 0){
    		console.log(r.get('col_0_name'));
    	}
    	
    	if(col == 1){
    		console.log(r.get('col_1_name'));
    	}
    }
});
