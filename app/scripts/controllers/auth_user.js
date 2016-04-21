'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:UserCtrl
 * @description
 * # AuthCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('AuthUserCtrl',
    function ($scope, $window, $http, $cookieStore, $stateParams, $location, $localStorage, $state, Auth) {

    var login,
        loginUserSession,
        oauthCode,
        url,


    login = function(){
        //get ouath code
        oauthCode = $stateParams.code;
        $localStorage.accesstoken = oauthCode;
        loginUserSession('instagram',oauthCode);
    };

    loginUserSession = function(network, oauthCode){

        Auth.$loginUser(network, oauthCode)
        .success(function( data ) {
            //localstorage - store user status
            amplitude.setUserId(data.instagram_id);
            $localStorage.isAuthenticated = 'true';
            $localStorage.role = data.role;
            $localStorage.onboarding_status = data.onboarding_status;

            if ($localStorage.foodBloggerStatus === 'FoodBloggerWaiting' && $localStorage.role === 'FoodBlogger'){
                $localStorage.foodBloggerStatus = 'FoodBloggerValidated';
            }

            if ($localStorage.onboarding_status === 'New' || $localStorage.onboarding_status === 'InProgress'){
                $state.go('onboarding.userinfo');
            }

            if ($localStorage.onboarding_status === 'Complete'){
                $state.go('user.feed');
            }

        }), function(error){
            console.log('error' + error);
        };
    };

    login();

});