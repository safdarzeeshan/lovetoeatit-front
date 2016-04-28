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
    function ($scope, $window, $state, Recipe, Likes) {

        amplitude.logEvent('Discover Page');
        //get all recipes and populate scope
        Recipe.$getAllRecipes()
        .then(function( response ) {
            // $scope.recipes = response.data;
            //display last 10 recipes
            $scope.recipes = response.data.slice(Math.max(response.data.length - 10, 1));
            console.log(response.data.slice(-10,0));
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

                if (response.data.has_user_liked === 'true'){
                    $scope.recipes[$index].has_user_liked = true;
                }

                if (response.data.has_user_liked === 'false'){
                    $scope.recipes[$index].has_user_liked = false;
                }

                $scope.recipes[$index].no_of_likes = response.data.no_of_likes;
            });


        };
    }
);