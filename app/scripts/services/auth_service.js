'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Auth', function( $http ) {

    var authFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000',
        isAuthenticated = false;

    authFactory.$authUser = function(network, oauthCode) {
        return $http({
            method: 'POST',
            url: baseUrl + '/api/login/social/session/',
            headers : {'x-csrftoken': 'bzeBBYgXpR4vFrzFMn37FJCyiWvKDnPt','Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                return str.join('&');
            },
            data: { provider: network, code: oauthCode }
        });
    };

    authFactory.$userStatus = function(){
        return $http({
            method: 'GET',
            url: baseUrl + '/api/user',
        });
    };

    authFactory.$setUser = function(aUser){
        isAuthenticated = aUser;
    };

    authFactory.$isLoggedIn = function(){
        return isAuthenticated;
    };

    return authFactory;
});