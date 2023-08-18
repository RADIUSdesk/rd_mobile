Ext.define('RdMobile.view.meshes.cmbMeshViewNodes', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.cmbMeshViewNodes',
    label      		: 'Node',
    valueField      : 'id',
    displayField    : 'name',
    value           : -1,
    initialize		: function (){
        var me      = this;
        var s       = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'id',    type: 'string'},
                {name: 'name',  type: 'string'}
            ],
            proxy: {
                    type  	: 'ajax',
                    format	: 'json',
                    url     : '/cake4/rd_cake/meshes/mesh-nodes-view.json',
                    reader: {
                        type            : 'json',
                        rootProperty    : 'items',
                        messageProperty : 'message'
                    }
            },
            autoLoad: false
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
