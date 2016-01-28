'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Auth', function( $http, $cookies, $localStorage ) {

    var authFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000';

    authFactory.$loginUser = function(network, oauthCode) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/login/social/session/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                return str.join('&');
            },
            data: { provider: network, code: oauthCode }
        });
    };

    authFactory.$logoutUser = function() {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/logout/session/',
        });
    };


    authFactory.$userStatus = function(){
        return $http({
            method: 'GET',
            url: baseUrl + '/api/user',
        });
    };

    authFactory.$isLoggedIn = function(){
        if ($localStorage.isAuthenticated === 'true'){
            return true;
        }

        else{
            return false;
        }
    };

    authFactory.$userRole = function(){
        return $localStorage.role;
    };

    return authFactory;
});