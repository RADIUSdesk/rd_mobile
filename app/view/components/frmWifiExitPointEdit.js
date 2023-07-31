Ext.define('RdMobile.view.components.frmWifiExitPointEdit', {
    extend  : 'Ext.Panel',
    xtype   : 'frmWifiExitPointEdit',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    layout	: 'fit',
    title	: 'Edit Exit Point',
    initialize: function () {
        const me  = this;         
    	//USE THIS AS A PATTERN with the items that needs to be in the config object
    	var frm = Ext.widget('frmWifiExitPoint',{
    		action		: 'edit',
    		exit_type	: me.exit_type,
			exit_id		: me.exit_id,
    		meshId		: me.meshId,				
    		mode		: me.mode,		//Will determine the url called for available 'connect_with' list (from MESH or APdesk)
    		submitUrl 	: me.submitUrl,
    		grid		: me.grid,
    		toClose		: me
    	});
    	me.setItems(frm);
    	console.log(me.values);
    	frm.setValues(me.values);
        this.callParent(arguments);  
 	}
});
