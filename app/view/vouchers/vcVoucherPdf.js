Ext.define('RdMobile.view.vouchers.vcVoucherPdf', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcVoucherPdf',
    config: {
        urlPdfBase  : '/cake4/rd_cake/vouchers/export-pdf',
    },   
    onSubmit : function(btn){   
    	var me 		= this; 
    	console.log("PDF Submit Tapped");    
        var form    = btn.up('formpanel');
        var win     = form.up('window');

		//Get the values from the form:
		form_to_string 	= form.getValues(true);
        //Token
        var token 		= Ext.util.Cookies.get("Token"); //No token?
        var url_to_add 	= Ext.Object.toQueryString(form_to_string)+'&token='+token+'&';
		console.log(url_to_add);
		/*
	    //---- Filter thing -----	
		var filters     = [];
        var f_count     = 0;
        var f_found     = false;
        var filter_json ='';
             
        var filter_collection = me.getGrid().getStore().getFilters();     
        if(filter_collection.count() > 0){
            var i = 0;
            while (f_count < filter_collection.count()) { 

                //console.log(filter_collection.getAt(f_count).serialize( ));
                f_found         = true;
                var ser_item    = filter_collection.getAt(f_count).serialize( );
                ser_item.field  = ser_item.property;
                filters[f_count]= ser_item;
                f_count         = f_count + 1;
                
            }     
        }  
        
        if(f_found){
            filter_json = "filter="+encodeURIComponent(Ext.JSON.encode(filters));
            url_to_add  = url_to_add+filter_json+'&';
            //console.log(url_to_add);
        }
        //--- END Filter thing -----

        //Check if the 'selected_only' was chosen
        var form = button.up('form');
        if(form.down('#selected_only') != undefined){
            if(form.down('#selected_only').getValue()){
                //console.log("Get selection...");
                var selected = [];
                Ext.each(me.getGrid().getSelectionModel().getSelection(), function(sr,index){
                    var v_id        = sr.getId();
                    Ext.Array.push(selected,v_id);
                });
                if(selected.length > 0){
                    var sel = Ext.encode(selected);
                   // console.log("selected="+encodeURIComponent(sel));
                    //If it is selected we don't care about the filter 
                    url_to_add = url_to_add+"selected="+encodeURIComponent(sel);
                }
            }
        }
        */

        var extra_params    = Ext.Object.toQueryString(Ext.Ajax.getExtraParams());
        url_to_add = url_to_add+'&'+extra_params;
        
        var urlPdf  = me.getUrlPdfBase()+'?'+url_to_add;
        window.open(urlPdf);
        form.close();  	
    }
});
