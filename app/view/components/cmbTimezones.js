Ext.define('RdMobile.view.components.cmbTimezones', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbTimezones',
    label      		: 'Timezone',
    queryMode       : 'local',
    valueField      : 'id',
    displayField    : 'name',
    editable        : true,
    forceSelection  : true,
    mode            : 'local',
    name            : 'timezone',
    multiSelect     : false,
    allowBlank      : false,
    typeAhead       : true,
    typeAheadDelay  : 100,
    minChars        : 2,
    initialize      : function() {   
        var me      = this;
        var s       = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            proxy: {
                    type    : 'ajax',
                    format  : 'json',
                    batchActions: true, 
                    url     : '/cake4/rd_cake/utilities/timezones-index.json',
                    reader: {
                        type            : 'json',
                        rootProperty    : 'items',
                        messageProperty : 'message'
                    }
            },
            autoLoad: true
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
