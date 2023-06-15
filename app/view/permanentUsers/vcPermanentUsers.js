Ext.define('RdMobile.view.permanentUsers.vcPermanentUsers', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPermanentUsers',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/vouchers/delete.json',
        urlViewBasic        : '/cake4/rd_cake/vouchers/view-basic-info.json',
        urlEditBasic        : '/cake4/rd_cake/vouchers/edit_basic_info.json'
    },
    control: {
    	'cntPermanentUsers' : {
    		show	: 'show',
    		hide	: 'hide'
    	},
        'gridPermanentUsers': {
            select: 'onGridChildTap'
        },
      	'#btnReload' : {
      		tap		: 'reload'
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
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridPermanentUsers').getStore().reload();  
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
    	//var w = Ext.widget('frmPermanentUserEdit',{grid:me.getView().down('gridPermanentUsers'), voucher_id: me.sel.get('id')});
        //w.show();
    },
    add : function(){
    	var me = this;
    	console.log(me.getView());
    	//var w = Ext.widget('frmPermanentUserAdd',{grid:me.getView().down('gridPermanentUsers')});
        //w.show(); 
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getView().down('#asMenu').show();	    	  	 
    },
    radius	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmRadiusClient',{grid:me.getView().down('gridPermanentUsers'), user_id: me.sel.get('id'),user_name : me.sel.get('username'), user_type : 'user' });
    	w.show();    	
    }
});
