Ext.define('RdMobile.view.components.cntInetWanPppoe', {
    extend 	: 'Ext.Container',
    alias   : 'widget.cntInetWanPppoe',
    hidden  : true,
    disabled: true,
    style   : 'background:rgb(46, 95, 115);',
    padding	: 10,
    margin	: 10,
    items   :  [
        {
            xtype       : 'textfield',
            label  		: 'Username',
            name        : 'wan_pppoe_username',
            required	: true,
            errorTarget : 'under'
        },
        {
            xtype       : 'passwordfield',
            revealable	: true,
            name      	: 'wan_pppoe_password',
            label     	: 'Password',
            required	: true,
            errorTarget : 'under'
        }, 
        {
            xtype       : 'textfield',
            label  		: 'DNS Primary',
            name        : 'wan_pppoe_dns_1',
            //vtype       : 'IPAddress'
        },
        {
            xtype       : 'textfield',
            label  		: 'DNS Secondary',
            name        : 'wan_pppoe_dns_2',
            //vtype       : 'IPAddress'
        },
        {
	        xtype       : 'textfield',
	        label  		: 'My Own MAC',
	        name        : 'wan_pppoe_mac'
        },
        {
	        xtype       : 'textfield',
	        label  		: 'MTU',
	        name        : 'wan_pppoe_mtu'
        }       
    ]
});
