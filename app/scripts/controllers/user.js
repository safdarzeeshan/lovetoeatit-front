'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('UserCtrl',
    function ($scope, $localStorage, $state, Auth) {

    //check if user is a food blogger
    //TODO
    //putting static value for now
    $scope.foodBlogger = false;

    $scope.logout = function() {

        Auth.$logoutUser()
        .success(function() {
            //localstorage - store user status
            $localStorage.isAuthenticated = 'false';
            $state.go('login');

        }), function(error){
            console.log('error' + error);
        };
    };

});