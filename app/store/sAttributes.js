Ext.define('RdMobile.store.sAttributes', { 
    extend: 'Ext.data.Store',
    model: 'RdMobile.model.mAttribute',
    proxy: {
            type  	:'ajax',
            url   	: '/cake4/rd_cake/profile-components/attributes.json',
            format  : 'json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
    },
    autoLoad: true
});
