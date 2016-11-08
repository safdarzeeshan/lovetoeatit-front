'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:AllusersCtrl
 * @description
 * # AllusersCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
    .controller('AllUsersCtrl', function ($scope, Auth, $state) {

        $scope.loading= true;

        Auth.$getAllUsers()
        .then(function( response ) {
            $scope.users = response.data;
            $scope.loading= false;

        })
        .catch(function(error){
            $scope.loading= false;
            console.log(error);
        });


        $scope.editUser = function(username){
            $state.go('user.editUser' , { 'username': username});
        };
    }
);
