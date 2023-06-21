Ext.define('RdMobile.view.devices.vcDevices', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcDevices',
    sel		: null,
    config: {
        urlDelete           : '/cake4/rd_cake/devices/delete.json',
        containedIn			: 'cntMainRadius',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true	
    },
    control: {
    	'cntDevices' : {
    		show	: 'show',
    		hide	: 'hide'
    	},
        'gridDevices': {
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
      	'#cmbFilterOn' : {
      		change	: 'onCmbFilterOnChange'
      	},
      	'cmbPermanentUser' : {
      		change	: 'onCmbFilterOwnerChange'
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
      	'#btnEnable' : {
      		tap	: 'enableDisable'
      	},
      	'#btnRadius' : {
      		tap	: 'radius'
      	},        	
    },
    show	: function(){
    	var me = this;
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
        me.getView().up('pnlMain').down('#lblMain').setHtml(me.getAppTitle());
    },
    reload	: function(btn){
    	var me = this;
    	me.getView().down('gridDevices').getStore().reload();  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('gridDevices').getStore();
    	me.setSortDesc(!me.getSortDesc());
    	if(me.getSortDesc()){
    		btn.setIconCls('x-fa fa-sort-alpha-down'); 
    		store.sort([{
				property : 'description',
				direction: 'ASC'
			}]);
    	}else{
    		btn.setIconCls('x-fa fa-sort-alpha-up');
    		store.sort([{
				property : 'description',
				direction: 'DESC'
			}]); 
    	}
    },
    filter	: function(tbn){
    	var me  = this;
    	me.getView().down('#asFilter').show();
    },
    onCmbFilterOnChange  : function(c,new_value){
    	var me 		= this;
    	var store 	= me.getView().down('gridDevices').getStore();
    	var btn		= me.getView().down('#btnFilter');
    	var txt 	= me.getView().down('#txtFilterValue');  
    	var cmb 	= me.getView().down('cmbPermanentUser');	
    	if(new_value == 'owner'){
            cmb.setHidden(false);      
    		txt.setHidden(true);
    	}else{
    		store.clearFilter();
    		btn.setBadgeText(''); 
    		txt.setValue('');
    		cmb.setHidden(true);      
    		txt.setHidden(false);  	
    	}
    },
    onCmbFilterOwnerChange  : function(c,new_value){
    	var me 		= this;
    	var store 	= me.getView().down('gridDevices').getStore();
    	var btn		= me.getView().down('#btnFilter');
    	var cmb 	= me.getView().down('cmbPermanentUser');  	
    	store.filter([{'property':'permanent_user_id','value':new_value,'operator':'=='}]);
    	btn.setBadgeText('+');
    },
    txtFilterValueChange : function(txt,new_value){
    	var me 		= this;
    	var store 	= me.getView().down('gridDevices').getStore();
    	var btn		= me.getView().down('#btnFilter');
    	var cmb		= me.getView().down('#cmbFilterOn'); 
    	if(new_value == ''){
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
    	var w = Ext.widget('frmDeviceEdit',{grid:me.getView().down('gridDevices'), device_id: me.sel.get('id')});
        w.show();
    },
    enableDisable  : function(btn){
    	var me = this;	
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmDeviceEnableDisable',{grid:me.getView().down('gridDevices'), device_id: me.sel.get('id'),device_name : me.sel.get('name')});
        w.show();
    },
    add : function(){
    	var me = this;
    	var w = Ext.widget('frmDeviceAdd',{grid:me.getView().down('gridDevices')});
        w.show(); 
    },
    onGridChildTap : function(a,sel){
    	var me 	= this;
   		me.sel = sel;
    	me.getView().down('#asMenu').show();	    	  	 
    },
    radius	: function(){
    	var me = this;
    	me.getView().down('#asMenu').hide();
    	var w = Ext.widget('frmRadiusClient',{grid:me.getView().down('gridDevices'), device_id: me.sel.get('id'),device_name : me.sel.get('name'), user_type : 'device' });
    	w.show();    	
    }
});
