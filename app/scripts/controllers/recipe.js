'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:RecipeCtrl
 * @description
 * # RecipeCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('RecipeCtrl',
    function ($scope, $window, $stateParams, Recipe, Likes) {

        var id = $stateParams.id;

        Recipe.$getRecipe(id)
        .then(function( response ) {
            console.log('users data: ', response.data );
            $scope.recipe = response.data;
        });

        $scope.gotoRecipe = function(recipe_url) {
            $window.open(recipe_url);
        };

        $scope.likeClick = function(recipe_local_id){
            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){
                $scope.recipe.has_user_liked = response.data.has_user_liked;
                $scope.recipe.no_of_likes = response.data.no_of_likes;
            });
        };
    }
);