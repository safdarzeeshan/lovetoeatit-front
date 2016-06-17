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
    function ($scope, $window, $stateParams, Recipe, Likes, $state) {

        amplitude.logEvent('Recipe Details page');
        var id = $stateParams.id;
        // var $scope.heart;

        Recipe.$getRecipe(id)
        .then(function( response ) {
            $scope.recipe = response.data;
            var c_t = response.data.collection_tags[0].name

            Recipe.$getRelatedRecipes(c_t)
            .then(function( response ) {
                $scope.relatedRecipes = response.data;
            });
        });

        $scope.gotoRecipe = function(recipe_url) {
            $window.open(recipe_url);
            amplitude.logEvent('Recipe blog link clicked');
        };

        $scope.gotoBlog = function(blog_url) {
            $window.open(blog_url);
            amplitude.logEvent('Food Blogger blog link clicked');
        };

        $scope.likeClick = function(recipe_local_id){
            amplitude.logEvent('Recipe like clicked');
            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){
                $scope.recipe.has_user_liked = response.data.has_user_liked;
                $scope.recipe.no_of_likes = response.data.no_of_likes;
            });
        };

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
            var recipeProperties = {
                'id': id,
            };
            amplitude.logEvent('Clicked recipe details', recipeProperties);
        };
    }
);