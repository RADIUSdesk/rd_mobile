// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdMobile.view.meshes.pnlMeshViewNodeNodesDetail', {
    extend  	: 'Ext.Panel',
    xtype   	: 'pnlMeshViewNodeNodesDetail',
    floated		: true,
    modal		: true,
    centered	: true,
    closable	: true,
    fullscreen 	: true,
    padding		: 6,
    scrollable	: true,
    iconCls 	: 'x-fa fa-info-circle',
    tpl		: new Ext.XTemplate(
		'<div class="detail-section">',
		'Latest Connection Detail',
		'</div>',
		'<div class="two-columns-grid">',
			'<div class="item-lbl">Latest Signal :</div>',
			'<div class="item-value">{signal} dBm</div>',
		'</div>',
        '<div class="two-columns-grid">',
			'<div class="item-lbl">Avg Signal :</div>',
			'<div class="item-value">{signal_avg} dBm</div>',
		'</div>',
        '<div class="two-columns-grid">',
			'<div class="item-lbl">Tx Speed :</div>',
			'<div class="item-value">{l_tx_bitrate} Mb/s</div>',
		'</div>',
        '<div class="two-columns-grid">',
			'<div class="item-lbl">Rx Speed :</div>',
			'<div class="item-value">{l_rx_bitrate} Mb/s</div>',
		'</div>',
		'<div class="two-columns-grid">',
			'<div class="item-lbl">Tx Bytes :</div>',
			'<div class="item-value">{[Ext.ux.bytesToHuman(values.l_tx_bytes)]}</div>',
		'</div>',
        '<div class="two-columns-grid">',
			'<div class="item-lbl">Rx Bytes :</div>',
			'<div class="item-value">{[Ext.ux.bytesToHuman(values.l_rx_bytes)]}</div>',
		'</div>',
		'<div class="two-columns-grid">',
			'<div class="item-lbl">Tx Retries :</div>',
			'<div class="item-value">{l_tx_retries}</div>',
		'</div>',
        '<div class="two-columns-grid">',
			'<div class="item-lbl">Tx Failed :</div>',
			'<div class="item-value">{l_tx_failed}</div>',
		'</div>',
		'<div class="two-columns-grid">',
			'<div class="item-lbl">Authenticated :</div>',
			'<div class="item-value">{l_authenticated}</div>',
		'</div>',
        '<div class="two-columns-grid">',
			'<div class="item-lbl">Authorised :</div>',
			'<div class="item-value">{l_authorized}</div>',
		'</div>',
        '<div class="detail-section">',
		'History',
		'</div>',
		'<div class="two-columns-grid">',
			'<div class="item-lbl">Last Contact :</div>',
			'<div class="item-value">{peer_l_contact_human}</div>',
		'</div>'
    ),
    initialize: function (){
        const me = this;
        me.setTitle(me.peer_name);
     	var d = me.r.getData();
     	me.setData(d) 
  	}
});

