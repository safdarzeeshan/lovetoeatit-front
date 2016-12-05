'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('UserProfileCtrl', function ($scope, $rootScope, $state, Config, Auth, $window) {

    amplitude.logEvent('User profile page');
    $rootScope.title ="User profile";

    Auth.$getUser()
    .success(function(response){
        console.log(response);
        $scope.user = response;
    });

    $scope.connectInstagram = function(){
        amplitude.logEvent('Clicked connect Instagram');
        $window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=2e3edb17f4c34ccdb832240b38a3fc12&redirect_uri='+ Config.$redirectUrl +'/instagramconnect&response_type=token';
    };

    $scope.gotoChangePassword = function(){
        amplitude.logEvent('Clicked change password');
        $state.go('user.changepassword');
    };

    $scope.gotoUserDiet = function(){
        $state.go('onboarding.userdiet');
    };

  });
