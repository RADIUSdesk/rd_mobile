Ext.define('RdMobile.view.components.cmbAttribute', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbAttribute',
    label		    : 'Attribute',
    forceSelection  : true, //?
    valueField      : 'id',
    displayField    : 'name',
    typeAhead		: true,
    allowBlank		: false,
    mode			: 'local',
    name            : 'attribute',
	required		: true,
    errorTip		: {
        anchor	: true,
        align	: 'l-r?'
    },
    errorTarget		: 'under',
    initialize      : function() {    
        var me	= this;
        var s 	= Ext.create('RdMobile.store.sAttributes', {});            
        me.setStore(s); 
        this.callParent(arguments);
    }
});
