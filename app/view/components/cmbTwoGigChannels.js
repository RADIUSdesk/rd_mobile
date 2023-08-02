Ext.define('RdMobile.view.components.cmbTwoGigChannels', {
    extend			: 'Ext.field.ComboBox',
    alias 			: 'widget.cmbTwoGigChannels',
    label			: '2.4GHz Channel',
    displayField  	: 'text',
    valueField    	: 'id',
    value           : 1,
    name			: 'two_chan',
    initialize      : function() { 
        var me= this;
        var s = Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data : [
                {"id":1,    "text": '1 (Non-Overlapping)'},
                {"id":2,    "text": '2'},
				{"id":3,   	"text": '3'},
                {"id":4,  	"text": '4'},
				{"id":5,    "text": '5'},
                {"id":6,    "text": '6 (Non-Overlapping)'},
				{"id":7,    "text": '7'},
                {"id":8,   	"text": '8'},
				{"id":9,    "text": '9'},
                {"id":10,   "text": '10'},
				{"id":11,   "text": '11 (Non-Overlapping)'},
                {"id":12,   "text": '12'},
				{"id":13,   "text": '13'},
				{"id":14,   "text": '14'},
            ]
        });
        me.setStore(s);
        this.callParent(arguments);
    }
});
