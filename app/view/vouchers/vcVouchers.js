Ext.define('RdMobile.view.vouchers.vcVouchers', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcVouchers',
    control: {
         'gridVouchers': {
            childtap: 'onGridChildTap'
        }
    },
    onGridChildTap : function(a,b,c){
    	var me = this;
    	console.log("Child Tapped");
    	var grid = me.getView().down('gridVouchers');
    	var selections 	= grid.getSelections();
    	var sel  		= selections.pop();
    	console.log(sel.get('name'));
    	me.getView().down('#asMenu').show();  	 
    }

});
