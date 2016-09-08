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

        $scope.limit = 40;
        $scope.loading= true;
        amplitude.logEvent('Likes page');
        $scope.no_likes = false;

        //get likes and populate scope
        Likes.$getLikes()
        .then(function( response ) {
            $scope.loading= false;
            $scope.likes = response.data;

            if($scope.likes.length == 0){
                $scope.no_likes = true;
            }
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

        $scope.likeClick = function($index, recipe_local_id){
            amplitude.logEvent('Recipe thumbnail like clicked ');

            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){

                if (response.data.has_user_liked === true){
                    $scope.likes[$index].has_user_liked = true;
                }

                if (response.data.has_user_liked === false){
                    $scope.likes[$index].has_user_liked = false;
                }

                $scope.likes[$index].no_of_likes = response.data.no_of_likes;
            });
        };
    }
);