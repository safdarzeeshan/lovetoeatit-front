'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:AllusersCtrl
 * @description
 * # AllusersCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
    .controller('AllUsersCtrl', function ($scope, $rootScope, Auth, $state) {

        $scope.loading= true;

        $rootScope.title = 'All Users';

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
