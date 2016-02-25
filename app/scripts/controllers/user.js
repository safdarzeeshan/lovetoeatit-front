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

    var role,
        setupProfile;

    //check role
    role = function(){

        if (Auth.$userRole() === 'FoodBlogger'){
            $scope.FoodBlogger = true;
        }

        if (Auth.$userRole() === 'Admin'){
            $scope.Admin = true;
        }
    };

    setupProfile = function(){

        Auth.$getUser()
        .success(function(response){
            //populate profile picture and username
            $scope.user = response;
            console.log(response);

        }),function(error){
            console.log('cannot retrieve user information');
        };
    };

    $scope.logout = function() {

        Auth.$logoutUser()
        .success(function() {
            //clear localstorage
            $localStorage.$reset();
            $state.go('login');

        }), function(error){
            console.log('error' + error);
        };
    };

    role();
    setupProfile();

});