Ext.define('RdMobile.view.components.cmbVendor', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbVendor',
    label		    : 'Vendor',
    forceSelection  : true, //?
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    allowBlank      : false,//?
    queryMode       : 'remote',//?
    mode            : 'remote',//?
    name            : 'vendor',
    pageSize        : 1, // The value of the number is ignore -- it is essentially coerced to a boolean, and if true, the paging toolbar is displayed. ??
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
