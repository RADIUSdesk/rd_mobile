Ext.define('RdMobile.view.vouchers.vcVouchers', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcVouchers',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/vouchers/delete.json',
        urlViewBasic        : '/cake4/rd_cake/vouchers/view-basic-info.json',
        urlEditBasic        : '/cake4/rd_cake/vouchers/edit_basic_info.json',
        containedIn			: 'cntMainRadius',
        sortDesc			: true			
    },
    control: {
    	'cntVouchers' : {
    		show	: 'show',
    		hide	: 'hide'
    	},
        'gridVouchers': {
            select: 'onGridChildTap'
        },
      	'#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	},
      	'#btnSort' : {
      		tap		: 'sort'
      	},
      	'#btnFilter' : {
      		tap		: 'filter'
      	},
      	'#txtFilterValue' : {
      		change	: 'txtFilterValueChange'
      	},
      	'#btnAdd' : {
      		tap	: 'add'
      	},
      	'#btnDelete' : {
      		tap	: 'delete'
      	},
      	'#btnEdit' : {
      		tap	: 'edit'
      	},
      	'#btnPdf' : {
      		tap	: 'pdf'
      	}, 
      	'#btnEmail' : {
      		tap	: 'email'
      	},
      	'#btnRadius' : {
      		tap	: 'radius'
      	},        	
    },
    show	: function(){
    	var me = this;
    	console.log("Show");
    	me.getView().down('#btnAdd').show();
    },
    hide	: function(){
    	var me = this;
    	console.log("Hide");
    	me.getView().down('#btnAdd').hide();
    },
    back : function(btn){
        var me = this;
        btn.up(me.getContainedIn()).setActiveItem(0);
    },
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridVouchers').getStore().reload();  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridVouchers').getStore();
    	me.setSortDesc(!me.getSortDesc());
    	if(me.getSortDesc()){
    		btn.setIconCls('x-fa fa-sort-alpha-down'); 
    		store.sort([{
				property : 'name',
				direction: 'ASC'
			}]);
    	}else{
    		btn.setIconCls('x-fa fa-sort-alpha-up');
    		store.sort([{
				property : 'name',
				direction: 'DESC'
			}]); 
    	}
    },
    filter	: function(tbn){
    	var me  = this;
    	console.log("Filter Button Tapped");
    	me.getView().down('#asFilter').show();
    },
    txtFilterValueChange : function(txt,new_value){
    	var me 		= this;
    	var store 	= me.getView().down('gridVouchers').getStore();
    	var btn		= me.getView().down('#btnFilter');
    	var cmb		= me.getView().down('#cmbFilterOn'); 
    	if(new_value == ''){
    		console.log("Clear Filter Pappie");
    		store.clearFilter();
    		btn.setBadgeText('');
    	}else{
    		store.filter([{'property':cmb.getValue(),'value':new_value,'operator':'like'}]);
    		btn.setBadgeText('+');
    	}
    },
    delete  : function(btn){
    	var me = this;
    	Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(buttonId){    	
    		if(buttonId == 'yes'){
    			Ext.Ajax.request({
				    url: me.getUrlDelete(),
				    method: 'POST',          
				    jsonData: [{'id': me.sel.get('id')}],
				    success: function(batch,options){
				        me.reload(); //Reload from server
				        me.getView().down('#asMenu').hide();
				    },                                    
				    failure: function(batch,options){
				        me.reload(); //Reload from server
				        me.getView().down('#asMenu').hide();
				    }
				});		
    		}    	
    	});   	
    	me.getView().down('#asMenu').hide();
    },
    edit  : function(btn){
    	var me = this;	
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmVoucherEdit',{grid:me.getView().down('gridVouchers'), voucher_id: me.sel.get('id')});
        w.show();
    },
    add : function(){
    	var me = this;
    	console.log(me.getView());
    	var w = Ext.widget('frmVoucherAdd',{grid:me.getView().down('gridVouchers')});
        w.show(); 
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getView().down('#asMenu').show();	    	  	 
    },
    pdf	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmVoucherPdf',{grid:me.getView().down('gridVouchers'), voucher_id: me.sel.get('id')});
    	w.show(); 
    },
    email	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmVoucherEmail',{grid:me.getView().down('gridVouchers'), voucher_id: me.sel.get('id'),voucher_name : me.sel.get('name')});
    	w.show(); 
    },
    radius	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmRadiusClient',{grid:me.getView().down('gridVouchers'), voucher_id: me.sel.get('id'),voucher_name : me.sel.get('name'), user_type : 'voucher' });
    	w.show();    	
    }
});
