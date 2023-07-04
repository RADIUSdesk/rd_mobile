Ext.define('RdMobile.view.components.cmbVendor', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbVendor',
    label		    : 'Vendor',
    forceSelection  : true, //?
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    allowBlank      : false,//?
    mode            : 'local',//?
    name            : 'vendor',
	required		: true,
    errorTip		: {
        anchor	: true,
        align	: 'l-r?'
    },
    errorTarget		: 'under',
    initialize      : function() {    
        var me	= this;
        var s 	= Ext.create('RdMobile.store.sVendors', {});            
        me.setStore(s); 
        this.callParent(arguments);
    }
});
