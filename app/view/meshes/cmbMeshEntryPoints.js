Ext.define('RdMobile.view.meshes.cmbMeshEntryPoints', {
    extend          : 'Ext.field.ComboBox',
    alias           : 'widget.tagMeshEntryPoints',
    label      		: 'Connects With',
    queryMode       : 'local',
    emptyText       : 'Select Entry Points',
    displayField    : 'name',
    valueField      : 'id',
    name            : 'entry_points',
    multiSelect		: true,
    initialize		: function(){
        var me      = this;
        var s       = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'id',    type: 'int'},
                {name: 'name',  type: 'string'}
            ],
            proxy: {
                    type    : 'ajax',
                    format  : 'json',
                    batchActions: true, 
                    url     : '/cake4/rd_cake/meshes/mesh_entry_points.json',
                    reader: {
                        type            : 'json',
                        rootProperty            : 'items',
                        messageProperty : 'message'
                    }
            },
            autoLoad: true
        });
        me.setStore(s);
        me.callParent(arguments);
    }
});
