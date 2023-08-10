// SPDX-FileCopyrightText: 2023 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

//https://www.freecodecamp.org/news/javascript-es6-promises-for-beginners-resolve-reject-and-chaining-explained/
Ext.define('RdMobile.model.mSession', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'token', type: 'string' },
        { name: 'expires', type: 'date' }
    ],
    statics: {
        login: function(username, password) {
            var url = '/cake4/rd_cake/dashboard/authenticate.json';
             return new Ext.Promise(function (resolve, reject) {
                 Ext.Ajax.request({
                     url        : url,
                     method     : 'POST',
                     jsonData   : {username:username,password:password},
                     success: function (response) {
                         // Use the provided "resolve" method to deliver the result.
                        var obj = Ext.decode(response.responseText);
                        if(obj.success){
                            resolve(obj);
                        }else{

                            reject(obj);
                        }  
                     },
                     failure: function (response) {
                         reject(response.status);
                     }
                 });
             });
        }
    },

    isValid: function() {
       /* return !Ext.isEmpty(this.get('token'))
            && this.get('expires') > new Date()
            && this.getUser() !== null;*/
    },

    logout: function() {
        return new Ext.Promise(function (resolve, reject) {
            //Server.auth.logout({}, resolve);
        });
    }
});
