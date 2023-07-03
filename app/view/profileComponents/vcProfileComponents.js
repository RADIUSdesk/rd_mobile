Ext.define('RdMobile.view.profileComponents.vcProfileComponents', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcProfileComponents',
    sel		: null,
    init    : function() { 
    	var me = this;   
    	var dd = Ext.getApplication().getDashboardData();
    	//Set root to use later in the app in order to set 'for_system' (root)
        me.root    = false;
        if(dd.isRootUser){
            me.root = true;   
        }
    },
    config: {
        urlDelete       : '/cake4/rd_cake/profile-components/delete.json',
        urlDeleteEntry  : '/cake4/rd_cake/profile-components/delete-comp.json',
        containedIn		: 'cntMainRadius',
        appTitle		: 'RADIUSdesk',
        sortDesc		: true	
    },
    control: {
    	'cntProfileComponents' : {
    		show	: 'show',
    		hide	: 'hide'
    	},
        'dvProfileComponents': {
            select: 'onDvChildTap'
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
      	}   	
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
        me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-cubes fa-1x"></i> PROFILES');
    },
    reload	: function(btn){
    	var me = this;
    	me.getView().down('dvProfileComponents').getStore().reload();  
    },
    sort	: function(btn){
    	var me 		= this;
    	var store 	= me.getView().down('dvProfileComponents').getStore();
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
    	var store 	= me.getView().down('dvProfileComponents').getStore();
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
    delete : function(button) {
        var me   = this;
    	var sr   =  me.sel;
    	
    	if(!me.rightsCheck(sr)){
    		return;
    	}
    		
	    if(sr.get('type') == 'profile_component'){ 	    		    
	    	me.delProfileComponent();
	    }
	    
	    if((sr.get('type') == 'check')||(sr.get('type') == 'reply')){		    
	        me.delProfileComponentEntry();            
	    }                 
    },           
    add : function(){
    	var me 	= this;   	 	
    	var w 	= Ext.widget('frmProfileComponentAdd',{dv:me.getView().down('dvProfileComponents'),root: me.root});
        w.show(); 
    },
    edit: function(button) {
        var me   = this;
        var sr   =  me.sel;
	    if(!me.rightsCheck(sr)){
    		return;
    	}
	    
	    if(sr.get('type') == 'profile_component'){
			var w 	= Ext.widget('frmProfileComponentEdit',{dv:me.getView().down('dvProfileComponents'),root: me.root,r: sr});
        	w.show(); 
	  	}
	  	
	  	if((sr.get('type') == 'check')||(sr.get('type') == 'reply')){		  			  	
            var w 	= Ext.widget('frmProfileComponentEntryEdit',{dv:me.getView().down('dvProfileComponents'),record: sr});
        	w.show();   
	  	}   
    },
    onDvChildTap : function(a,sr){
    	var me 	= this;
   		me.sel 	= sr;
   		var dv  = me.getView().down('dvProfileComponents');
   		if(sr.get('type') == 'add'){
   			if(!me.rightsCheck(sr)){
	    		return;
	    	}  
   			var w 	= Ext.widget('frmProfileComponentEntryAdd',{dv:dv,'profile_component_id' : sr.get('profile_component_id'),'profile_component_name' : sr.get('profile_component_name')});
        	w.show();		
   		}else{
    		me.getView().down('#asMenu').show();
    	}	    	  	 
    },    
    delProfileComponent:   function(){
        var me      = this;     
        Ext.Msg.confirm("Confirmation", 'This will DELETE the Profile Component and ALL its Profile Component Entries' , function(val){
            if(val== 'yes'){
                var list  	= [];
                var id 		= me.sel.get('profile_component_id');
                Ext.Array.push(list,{'id' : id});
                Ext.Ajax.request({
                    url		: me.getUrlDelete(),
                    method	: 'POST',          
                    jsonData: list,
                    success	: function(batch,options){
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
    },
    delProfileComponentEntry:   function(){
        var me      = this;     
        //Find out if there was something selected
        Ext.Msg.confirm("Confirmation", 'This will DELETE the selected Profile Component Entry' , function(val){
            if(val== 'yes'){
                var list    = [];
                var id 		= me.sel.getId();
                Ext.Array.push(list,{'id' : id});
                Ext.Ajax.request({
                    url		: me.getUrlDeleteEntry(),
                    method	: 'POST',          
                    jsonData: list,
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
    },    
    rightsCheck: function(record){
    	var me = this;
    	if(record.get('for_system') && (!me.root)){
    		Ext.toast('No Rights For This Action');
			return false; //has no rights
		}
    	return true; //has rights    
    }   
});
