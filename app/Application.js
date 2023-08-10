// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('RdMobile.Application', {
    extend: 'Ext.app.Application',

    name: 'RdMobile',
    requires: [
    	'Ext.chart.interactions.Rotate',
		'Ext.chart.interactions.ItemHighlight',
		'Ext.chart.series.Pie',
		'Ext.chart.axis.Numeric',
		'Ext.chart.axis.Category',
		'Ext.chart.series.Bar',
		'RdMobile.*'    //Uncomment when building production
    ],
    
    dashboardData : null,  //Data on how the dashboard will look like which will be returned after login
    config  : {
        appTitle : 'RADIUSdesk'
    },
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    
    defaultToken : 'home',
    viewport: {
       controller   : 'vcViewport',
        layout		: 'card'
    },
    
    launch  : function() {
    	var me = this;
    	
    	const target = document.getElementById("target");
    	// If you want to remove it from the page after the fadeout
		target.addEventListener('transitionend', () => target.remove());
		target.style.opacity = '0';
		
    	me.addUx();
    	console.log("App Launching");
        Ext.Viewport.getController().onLaunch();
        //Ext.getBody().removeCls('launching');
    },
    

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    
    setDashboardData: function(data){
        var me          = this;
        me.dashboardData  = data;
    },

    getDashboardData: function(){
        var me          = this;
        return me.dashboardData;
    },
    
    addUx: function(){

        Ext.namespace('Ext.ux'); 
        //-- Format to a readable unit --->
        Ext.ux.bytesToHuman = function (fileSizeInBytes) {

            if((fileSizeInBytes == 0)||(fileSizeInBytes == null)){
                return '0 Kb';
            }
            var i = -1;
            var byteUnits = [' Kb', ' Mb', ' Gb', ' Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
            do {
                fileSizeInBytes = fileSizeInBytes / 1024;
                i++;
            } while (fileSizeInBytes >= 1024);

            return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
        };

        //-- Format to a readable time -->
        Ext.ux.secondsToHuman = function(seconds) {
            var numdays     = Math.floor(seconds / 86400); 
            var numhours    = Math.floor((seconds % 86400) / 3600);
            var numminutes  = Math.floor(((seconds  % 86400) % 3600) / 60);
            var numseconds  = ((seconds % 86400) % 3600) % 60;
            return  padDigits(numdays,2) + ":" + padDigits(numhours,2) + ":" + padDigits(numminutes,2) + ":" + padDigits(numseconds,2);

            function padDigits(number, digits) {
                return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
            }
        }

        //-- Format to a readable amount -->
        Ext.ux.centsToHuman = function(cents) {
            return (cents/100).toFixed(2); 
        }
        
        //-- return true if value human is recent 
		Ext.ux.isRecent = function(value_human) {
        	var recent = 'grey';
        	if(
	            (value_human.match(/just now/g))||
	            (value_human.match(/minute/g))||
	            (value_human.match(/second/g))
	        ){
	            recent = 'green';
	        }
			return recent;
		}

		
    }
    
    
});
