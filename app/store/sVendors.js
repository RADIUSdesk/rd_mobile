Ext.define('RdMobile.store.sVendors', {
    extend: 'Ext.data.Store',
    model: 'RdMobile.model.mVendor',
    proxy: {
            'type'  :'ajax',
            'url'   : '/cake4/rd_cake/profile-components/vendors.json',
            format  : 'json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
    },
    autoLoad: true
});
