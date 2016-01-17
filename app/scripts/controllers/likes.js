'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:MainCtrl
 * @description
 * # LikesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('LikesCtrl',
    function ($scope, $window, $state,  User) {

        //get likes and populate scope
        User.$getLikes()
        .then(function( response ) {
            console.log('users data: ', response.data );
            $scope.likes = response.data;
        });

        $scope.getRecipe = function(id){
            $state.go('recipe' , { 'id': id});
        };
    }
);