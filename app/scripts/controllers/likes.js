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
    function ($scope, $window, $state,  Likes, $http, $cookies) {

        //get likes and populate scope
        Likes.$getLikes()
        .then(function( response ) {
            $scope.likes = response.data;
        });

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
        };
    }
);