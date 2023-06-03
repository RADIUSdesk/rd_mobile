Ext.define('RdMobile.view.vouchers.frmVoucherAdd', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmVoucherAdd',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Add Voucher',
    buttons: {
        submit: {
            handler: function() {
                // Do something
                this.up('formpanel').hide();
            }
        }
    },
    items: [{
        xtype: 'textfield',
        name: 'name',
        label: 'Name'
    }, {
        xtype: 'textfield',
        name: 'address',
        label: 'Address'
    }, {
        xtype: 'textareafield',
        name: 'notes',
        label: 'Notes'
    }]
});
