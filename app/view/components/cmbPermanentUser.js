Ext.define('RdMobile.view.components.cmbPermanentUser', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbPermanentUser',
    label		    : 'Permanent User',
    forceSelection  : true, //?
    valueField      : 'id',
    displayField    : 'username',
    typeAhead       : true,
    allowBlank      : false,//?
    queryMode       : 'remote',//?
    mode            : 'remote',//?
    name            : 'user_id',
    pageSize        : 1, // The value of the number is ignore -- it is essentially coerced to a boolean, and if true, the paging toolbar is displayed. ??
	required		: true,
    errorTip		: {
        anchor	: true,
        align	: 'l-r?'
    },
    errorTarget		: 'under',
    initialize      : function() {    
        var me= this;
        var s = Ext.create('Ext.data.Store', {
            model       : 'RdMobile.model.mPermanentUser',
            buffered    : false,
            remoteSort  : true,
            proxy       : {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake4/rd_cake/permanent-users/index.json',
                reader  : {
                    type			: 'json',
                    rootProperty	: 'items',
                    messageProperty	: 'message',
                    totalProperty	: 'totalCount' //Required for dynamic paging
                },
                simpleSortMode: true //This will only sort on one column (sort) and a direction(dir) value ASC or DESC
            },
            autoLoad    : false
        });
        me.setStore(s);
        
        if(me.user_id){      
        	var rec     = Ext.create('RdMobile.model.mPermanentUser', {username: me.user_name, id: me.user_id});
        	me.getStore().loadData([rec],false);
        	me.setValue(me.user_id);
        }
        
        this.callParent(arguments);
    }
});
