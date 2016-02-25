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

    authFactory.$getUser = function() {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/user/',
        });
    };

    authFactory.$updateUser = function(userInfo) {

        return $http({
            method: 'PUT',
            url: baseUrl + '/api/user/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: userInfo
        });
    };

    authFactory.$updateUserOnboardingStatus = function(status) {

        return $http({
            method: 'PUT',
            url: baseUrl + '/api/useronboardingstatus/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: status
        });
    };

    authFactory.$logoutUser = function() {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/logout/session/',
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

    authFactory.$onboardingStatus = function(){
        return $localStorage.onboarding_status;
    };

    return authFactory;
});