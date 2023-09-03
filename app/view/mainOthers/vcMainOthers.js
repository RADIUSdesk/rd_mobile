// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.mainOthers.vcMainOthers', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainOthers',
    config		: {
        cntGooiHom	: 7,
    },
    control: {
    	'gridMainOthers': {
            cellselection: 'onGridChildTap'
        }
    },
    onGridChildTap : function(a,b,c){
    	var me 	= this;
    	var col = b[0][0]; 
    	var row = b[0][1];
    	var r   = a.getStore().findRecord('id',row);	
    	var c 	= r.get(col);
		var cnt = me.getView().down(c.cmp);
		
		var w = Ext.widget(c.cmp,{});
    	w.show();
		
	/*	
		if(!cnt){
			var cn = Ext.create({
				xtype	: c.cmp,
				layout	: 'fit'
			});
			cnt = me.getView().add(cn);
		}
		me.getView().setActiveItem(cnt);
		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-'+c.fa+' fa-1x"></i> '+c.name);
		*/
    }
});
