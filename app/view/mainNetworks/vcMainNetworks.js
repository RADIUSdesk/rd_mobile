Ext.define('RdMobile.view.mainNetworks.vcMainNetworks', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainNetworks',
    config		: {
        cntGooiHom	: 7,
    },
    control: {
    	'gridMainNetworks': {
            cellselection: 'onGridChildTap'
        }
    },
    onGridChildTap : function(a,b,c){
    	var me 	= this;
    	console.log("TTTTTTT");
    	var col = b[0][0]; 
    	var row = b[0][1];
    	var r   = a.getStore().findRecord('id',row);	
    	var c 	= r.get(col);
		var cnt = me.getView().down(c.cmp);
		if(!cnt){
			var c = Ext.create({
				xtype	: c.cmp,
				layout	: 'fit'
			});
			cnt = me.getView().add(c);
		}
		me.getView().setActiveItem(cnt);
		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-'+c.fa+' fa-1x"></i> '+c.name);
    }
});
