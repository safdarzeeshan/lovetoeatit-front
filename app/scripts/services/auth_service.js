'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Auth', function( $http, $cookies, $localStorage, Config ) {

    var authFactory = {},
        baseUrl = Config.$baseUrl;

    authFactory.$getUser = function() {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/user/',
        });
    };

    authFactory.$getAllUsers = function() {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/allusers/',
        });
    };

    authFactory.$getUserUsername = function(username) {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/abcget?username=' + username,
        });
    };

    authFactory.$getUserDietTags = function() {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/userdiettags/',
        });
    };

    authFactory.$updateUserDietTags = function(diet_tags) {

        return $http({
            method: 'PUT',
            url: baseUrl + '/api/userdiettags/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: diet_tags
        });
    };


    authFactory.$updateUser = function(userInfo) {

        return $http({
            method: 'PATCH',
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

    authFactory.$updateUserRole = function(data) {

        return $http({
            method: 'PUT',
            url: baseUrl + '/api/userrole/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: data
        });
    };

    authFactory.$logoutUser = function() {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/logout/session/',
        });
    };

    authFactory.$userSuccessEmail = function() {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/user_success_email/',
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

    authFactory.$loginUserLocal = function(email, password) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/login/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                return str.join('&');
            },
            data: { email: email, password: password }
        });
    };

    authFactory.$register = function(data) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/registration/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                return str.join('&');
            },
            data: data
        });
    };

    authFactory.$changePassword = function(data) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/password/change/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: data
        });
    };

    authFactory.$resetPassword = function(data) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/password/reset/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: data
        });
    };

    authFactory.$resetPasswordConfirm = function(data) {
        return $http({
            method: 'POST',
            url: baseUrl + '/api/password/reset/confirm/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: data
        });
    };

    authFactory.$logoutUserLocal = function() {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/logout/',
        });
    };

    return authFactory;
});