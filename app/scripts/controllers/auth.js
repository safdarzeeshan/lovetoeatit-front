'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:UserCtrl
 * @description
 * # AuthCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('AuthCtrl',
    function ($scope, $window, $http, $cookieStore, $stateParams, $localStorage, $state, User, Auth) {

    var login,
        loginUserSession,
        oauthCode,


    login = function(){
        //get ouath code
        oauthCode = $stateParams.code;
        loginUserSession('instagram',oauthCode);
    };

    loginUserSession = function(network, oauthCode){

        Auth.$loginUser(network, oauthCode)
        .success(function( data ) {
            //localstorage - store user status
            $localStorage.isAuthenticated = 'true';
            $localStorage.role = data.role;
            $state.go('user.likes');

        }), function(error){
            console.log('error' + error);
        };
    };

    login();

});