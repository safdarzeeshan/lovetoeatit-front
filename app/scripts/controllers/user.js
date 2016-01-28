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

    var role;

    //check role
    role = function(){

        if (Auth.$userRole() === 'FoodBlogger'){
            $scope.FoodBlogger = true;
        }

        if (Auth.$userRole() === 'Admin'){
            $scope.Admin = true;
        }
    };

    $scope.logout = function() {

        Auth.$logoutUser()
        .success(function() {
            //clear localstorage
            // $localStorage.$reset();
            $state.go('login');

        }), function(error){
            console.log('error' + error);
        };
    };

    role();

});