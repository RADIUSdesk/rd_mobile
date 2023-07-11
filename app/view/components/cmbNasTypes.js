Ext.define('RdMobile.view.components.cmbNasTypes', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbNasTypes',
    label      		: 'Type',
    valueField      : 'id',
    displayField    : 'name',
    allowBlank      : false,
    editable        : false,
    mode            : 'local',
    name            : 'type',
    initialize      : function() {    
        var me	= this;
        var s 	= Ext.create('RdMobile.store.sNasTypes', {});            
        me.setStore(s); 
        this.callParent(arguments);
    }
});
