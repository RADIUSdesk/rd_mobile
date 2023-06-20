Ext.define('RdMobile.view.password.vcPassword', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPassword',
    config: {
        urlGetPwd           : '/cake4/rd_cake/permanent-users/view-password.json',
        urlChangePassword   : '/cake4/rd_cake/permanent-users/change-password.json',
    },
    control: {
    	'frmPassword'	: {
    		show	: 'show'
    	},
    	'cmbPermanentUser': {
            change:     'userChanged'
        },
        '#always_active' : {
        	change: 'chkAlwaysActiveChange'
      	}	
    },
    show: function(){
    	var me 	= this;
    	var rec = Ext.create('RdMobile.model.mPermanentUser', {username: me.getView().user_name, id: me.getView().user_id});
        me.getView().down('cmbPermanentUser').getStore().loadData([rec],false);
        me.getView().down('cmbPermanentUser').setValue(me.getView().user_id);
    },
    userChanged: function(cmb){
        var me      = this;
        var value   = cmb.getValue();    	
    	var form    = cmb.up('formpanel');
        var label   = form.down('#currentPwd');
        var from    = form.down('#from_date');
        var to      = form.down('#to_date');
        var chk     = form.down('checkbox');
    	
    	Ext.Ajax.request({
            url		: me.getUrlGetPwd(),
            method	: 'GET',
            params	: {'user_id':value},
            success: function(response){
                var jsonData    = Ext.JSON.decode(response.responseText);
                if(jsonData.success){
                    label.setHtml(jsonData.value);
                    if((jsonData.activate == false)&&(jsonData.expire == false)){
                        chk.setValue(true);
                    }else{
                        to.setValue(jsonData.expire);
                        from.setValue(jsonData.activate);
                        chk.setValue(false);
                    }
                }   
            },
            scope: me
        });
    },
    onSubmit : function(btn){   
    	var me 		= this; 
    	var store 	= me.getView().grid.getStore();
    	var cmb		= me.getView().down('cmbPermanentUser');   	
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlChangePassword(),
                waitMsg				: 'Saving Data',
                success: function(form, result) {
            		me.userChanged(cmb);       
                },
                failure: function(form, result) {
            
                }
            });    	
    	}
    },
    chkAlwaysActiveChange : function(chk,value){
        var me      = this;
        var form    = chk.up('formpanel');
        var f    	= form.down('#from_date');
        var t		= form.down('#to_date');
        if(value){
            f.setDisabled(true); 
            f.setHidden(true); 
            t.setDisabled(true); 
            t.setHidden(true);               
        }else{
            f.setDisabled(false);
            f.setHidden(false);
            t.setDisabled(false);
            t.setHidden(false);
        }
    }
});
