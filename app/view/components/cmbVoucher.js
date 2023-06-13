Ext.define('RdMobile.view.components.cmbVoucher', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbVoucher',
    label		    : 'Voucher',
    forceSelection  : true, //?
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    allowBlank      : false,//?
    queryMode       : 'remote',//?
    mode            : 'remote',//?
    name            : 'voucher_id',
    pageSize        : 1, // The value of the number is ignore -- it is essentially coerced to a boolean, and if true, the paging toolbar is displayed. ??
    initialize      : function() {    
        var me= this;
        var s = Ext.create('Ext.data.Store', {
            model       : 'RdMobile.model.mVoucher',
            buffered    : false,
            remoteSort  : true,
            proxy       : {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/vouchers/index.json',
                reader  : {
                    type: 'json',
                    rootProperty: 'items',
                    messageProperty: 'message',
                    totalProperty: 'totalCount' //Required for dynamic paging
                },
                simpleSortMode: true //This will only sort on one column (sort) and a direction(dir) value ASC or DESC
            },
            autoLoad    : false
        });
        me.setStore(s);
        
        if(me.voucher_id){      
        	var rec     = Ext.create('RdMobile.model.mVoucher', {name: me.voucher_name, id: me.voucher_id});
        	me.getStore().loadData([rec],false);
        	me.setValue(me.voucher_id);
        }
        
        this.callParent(arguments);
    }
});
