Ext.define('RdMobile.view.components.cntInetWanStatic', {
    extend 	: 'Ext.Container',
    alias   : 'widget.cntInetWanStatic',
    hidden  : true,
    disabled: true,
    style   : 'background:rgb(46, 95, 115);',
    padding	: 10,
    margin	: 10,
    listeners       : {
        disabledchange : 'onDisabledchange'
    },
    items   :  [
        {
            xtype       : 'textfield',
            label  		: 'IP Address',
            name        : 'wan_static_ipaddr',
            required	: true,
            errorTarget : 'under',
            disabled    : true
            //vtype       : 'IPAddress'
        },
        {
            xtype       : 'textfield',
            label  		: 'Netmask',
            name        : 'wan_static_netmask',
            required	: true,
            errorTarget : 'under',
            disabled    : true
            //vtype       : 'IPAddress'
        },
        {
            xtype       : 'textfield',
            label  		: 'Gateway',
            name        : 'wan_static_gateway',
            required	: true,
            errorTarget : 'under',
            disabled    : true
            //vtype       : 'IPAddress'
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Primary',
            name        : 'wan_static_dns_1',
            value		: ''
            //vtype       : 'IPAddress'
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Secondary',
            name        : 'wan_static_dns_2',
            value		: ''
            //vtype       : 'IPAddress'
        }
    ]
});
