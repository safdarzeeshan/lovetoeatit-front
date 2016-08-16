'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:ResetpasswordCtrl
 * @description
 * # ResetpasswordCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('ResetPasswordCtrl', function ($scope, Auth, $state) {

    $scope.resetPasswordConf = false;
    $scope.email = {};

    $scope.resetPassword = function(){
        console.log($scope.email);
        Auth.$resetPassword($scope.email)
        .success(function(response){
            console.log(response);
            $scope.resetPasswordConf = true;

        }),function(error){
            console.log('cannot retrieve user information');
        };
    }

  });
