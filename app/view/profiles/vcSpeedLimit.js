Ext.define('RdMobile.view.profiles.vcSpeedLimit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcSpeedLimit',
    init    : function() {
        var me = this;
    },
    sldrToggleChange: function(sldr,value){
		var me 		= this;
		var main	= sldr.up('cntSpeedLimit');
		var cnt     = main.down('#cntDetail');		 
		if(value){
		    cnt.show();     
		}else{
		    cnt.hide();
		}
	}
});
