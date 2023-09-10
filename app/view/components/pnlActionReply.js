// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.components.pnlActionReply', {
    extend      : 'Ext.Panel',
    alias       : 'widget.pnlActionReply',
    title       : 'Reply',
    layout      : 'fit',
    floated	    : true,
    modal	    : true,
    centered    : true,
    closable    : true,
    fullscreen  : true,    
    initialize	: function() {   
    	var me = this;
    	
    	me.setItems([
    		{
    			xtype	: 'container',
    			html	: me.reply_html,
    			padding	: 10,
    			margin	: 10,
    			userSelectable : true,
			 	scrollable  : true		
    		}    	
    	]); 
        this.callParent(arguments);
    }
});
