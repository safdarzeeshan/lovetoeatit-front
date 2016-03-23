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

        amplitude.logEvent('Likes page');

        //get likes and populate scope
        Likes.$getLikes()
        .then(function( response ) {
            $scope.likes = response.data;
        })
        .catch(function(error){
            console.log(error);
        });

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
            var recipeProperties = {
                'id': id,
            };
            amplitude.logEvent('Clicked recipe details', recipeProperties);
        };
    }
);