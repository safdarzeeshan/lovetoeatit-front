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
    function ($scope, $window, $http, $cookieStore, $stateParams, $state, User, Auth) {

    var login,
        loginUserSession,
        init,
        oauthCode,
        csrftoken;

    login = function(){
        //get ouath code
        oauthCode = $stateParams.code;
        loginUserSession('instagram',oauthCode);
    };

    loginUserSession = function(network, oauthCode){

        Auth.$authUser(network, oauthCode)
        .success(function( data ) {
            Auth.$setUser(true);
            $state.go('likes');

        }), function(error){
            console.log('error' + error);
        };
    };

    init = function() {

        $http({
            method: 'GET',
            url: 'http://localhost:8000/test/',

            }).then(function() {
                console.log('success');

            }), function(error){
                console.log('error' + error);
            };
    };

    // init();
    login();

});