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
    function ($scope, $window, $stateParams, Recipe, Auth, Likes, $state, $rootScope) {

        amplitude.logEvent('Recipe Details page');
        // console.log($rootScope.previousState);
        var id = $stateParams.id;

        console.log($scope.userStatus);

        Recipe.$getRecipe(id)
        .then(function( response ) {
            $scope.recipe = response.data;
            $rootScope.title = response.data.name;
            $rootScope.shareImage = response.data.image_url;

            var c_t = response.data.collection_tags[0].name;

            Recipe.$getRelatedRecipes(c_t)
            .then(function( response ) {

                var related_recipes = [];
                angular.forEach(response.data, function(recipe){
                    if (recipe.local_id !== id){
                    related_recipes.push(recipe);
                    }
                });
                $scope.relatedRecipes = related_recipes;
            });
        });

        $scope.gotoRecipe = function(recipe_url) {
            $window.open(recipe_url);
            amplitude.logEvent('Recipe blog link clicked');
        };

        $scope.gotoFbRecipes = function(blog_name) {
            $state.go($scope.userStatus + '.foodbloggerrecipes' , {'name': blog_name});
        };

        $scope.gotoBlog = function(blog_url) {
            $window.open(blog_url);
            amplitude.logEvent('Food Blogger blog link clicked');
        };

        $scope.gotoTagRecipes = function(tag, name){
            $state.go($scope.userStatus + '.tagrecipes' , { 'tag': tag, 'name': name});
        };

        $scope.likeClickRecipe = function(recipe_local_id){
            amplitude.logEvent('Recipe like clicked');
            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){
                $scope.recipe.has_user_liked = response.data.has_user_liked;
                $scope.recipe.no_of_likes = response.data.no_of_likes;
            });
        };

    }
);