Ext.define('RdMobile.view.components.vcWifiExitPointAdd', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcWifiExitPointAdd',
    control: {
      	'#btnBack' : {
      		tap	: 'onBack'
      	}
    },
    onNext  : function(btn){
    	var me = this;
    	console.log("Next Tapped");
    	var exit_type = me.getView().down('#rgrpExitType').getValue();
    	me.setDataGui(exit_type);
    	me.getView().setActiveItem(1);
    },
    onBack : function(btn){
    	var me = this;
    	me.getView().setActiveItem(0);   
    },
    setDataGui: function(exit_type){  
    	var me = this; 	
		//USE THIS AS A PATTERN with the items that needs to be in the config object
		var frm = Ext.widget('frmWifiExitPoint',{
			action		: 'add',
			exit_type	: exit_type,
			meshId		: me.getView().meshId,
			apProfileId	: me.getView().apProfileId,					
			mode		: me.getView().mode,		//Will determine the url called for available 'connect_with' list (from MESH or APdesk)
			submitUrl 	: me.getView().submitUrl,
			grid		: me.getView().grid,
			toClose		: me.getView()
		});
		me.getView().down('#scrnData').setItems(frm);
		
		//For Captive Portal We load default values to make things easier
		if(exit_type == 'captive_portal'){
    		var url = '/cake4/rd_cake/meshes/mesh_exit_add_defaults.json';
			Ext.Ajax.request({
				url		: url,
				method	: 'get',
			  	success: function(response) {
			  		var jsonData	= Ext.JSON.decode(response.responseText);
		    		if(jsonData.success){
		    			frm.setValues(jsonData.data);		        
		    		}
			  	},
			  	failure: function() {
					console.log('in failure');
			  	}
			});
		} 
    }
});
