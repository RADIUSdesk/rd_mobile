Ext.define('RdMobile.view.components.cmbQmiAuth', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbQmiAuth',
    label      		: 'Authenticate',
    displayField    : 'text',
    valueField      : 'id',
    name            : 'qmi_auth',
    value           : 'none',
    initialize		: function () {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data : [
                {'id':'none',   'text': 'None'},
                {'id':'pap',    'text': 'PAP'},
                {'id':'chap',   'text': 'CHAP'},
                {'id':'both',   'text': 'Both'}
            ]
        });
        me.setStore(s);
        this.callParent(arguments);
    }
});
