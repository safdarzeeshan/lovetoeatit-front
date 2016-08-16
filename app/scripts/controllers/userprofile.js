'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('UserProfileCtrl', function ($scope, $state, Config, Auth, $window) {

    Auth.$getUser()
    .success(function(response){
        console.log(response);
        $scope.user = response;
    });

    $scope.connectInstagram = function(){
        $window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=2e3edb17f4c34ccdb832240b38a3fc12&redirect_uri='+ Config.$redirectUrl +'/instagramconnect&response_type=token';
    };

    $scope.gotoChangePassword = function(){
        $state.go('user.changepassword');
        amplitude.logEvent('User - changed password view');
    };

  });
