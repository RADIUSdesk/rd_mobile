Ext.define('RdMobile.view.vouchers.cmbPdfFormats', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbPdfFormats',    
    label      		: 'Output Format',
    forceSelection  : true,
    queryMode       : 'local',
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    queryMode       : 'local',
    name            : 'format',
    value			: 'a4',  
    initialize      : function() {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
        	model   : 'RdMobile.model.mPdfFormat',
			proxy   : {
				type    : 'ajax',
				format  : 'json',
				url     : '/cake4/rd_cake/vouchers/pdfVoucherFormats.json',
				reader: {
				    type            : 'json',
				    rootProperty    : 'items',
				    messageProperty : 'message'
				}
			},
            autoLoad    : true
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
