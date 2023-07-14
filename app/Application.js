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
    }
    
    
});
