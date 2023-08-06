Ext.define('RdMobile.view.components.cmbInternetConnection', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbInternetConnection',
    label      		: 'Internet Connect',
    displayField    : 'text',
    valueField      : 'id',
    name            : 'internet_connection',
    value           : 'auto_detect',
    initialize      : function() { 
        var me= this;
        var s = Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data : [
                {"id":"auto_detect",    "text": 'Auto Detect'}, //WAN + Mesh auto detecting
                {"id":"wan_static",     "text": 'WAN - Static IP Address'},
                {"id":"wan_pppoe",      "text": 'WAN - PPPoE'},
                {"id":"wifi",           "text": 'WIFI Client'},
                {"id":"wifi_static",    "text": 'WIFI Client - Static IP Address'},
                {"id":"wifi_pppoe",     "text": 'WIFI Client - PPPoE'},
                {"id":'qmi',            "text": 'LTE/4G'},
            ]
        });
        me.setStore(s);
        this.callParent(arguments);
    }
});
