'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:AllRecipesCtrl
 * @description
 * # AllRecipesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('AllRecipesCtrl',
    function ($scope, $window, $state, Auth, Recipe, Likes, FoodBlogger) {

        $scope.limit = 40;
        $scope.loading= true;

        amplitude.logEvent('Discover Page');
        //get all recipes and populate scope
        Recipe.$getAllRecipes()
        .then(function( response ) {
            $scope.recipes = response.data;
            $scope.loading= false;

        })
        .catch(function(error){
            console.log(error);
        });

        $scope.likeClick = function($index, recipe_local_id){
            amplitude.logEvent('Recipe thumbnail like clicked ');

            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){

                if (response.data.has_user_liked === true){
                    $scope.recipes[$index].has_user_liked = true;
                }

                if (response.data.has_user_liked === false){
                    $scope.recipes[$index].has_user_liked = false;
                }

                $scope.recipes[$index].no_of_likes = response.data.no_of_likes;
            });

        };
    }
)