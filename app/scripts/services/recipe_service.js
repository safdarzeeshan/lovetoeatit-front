'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Recipe', function( $http ) {

    var recipeFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000';

    recipeFactory.$getRecipe = function(id) {
        return $http.get( baseUrl + '/api/recipe?id=' +id );
    };

    recipeFactory.$getAllRecipes = function() {
        return $http.get( baseUrl + '/api/recipes');
    };

    recipeFactory.$getPopularRecipesFeed = function() {
        return $http.get( baseUrl + '/api/popularrecipesfeed');
    };

    recipeFactory.$getLatestRecipesFeed = function() {
        return $http.get( baseUrl + '/api/latestrecipesfeed');
    };

    recipeFactory.$getRecipeSearch = function(searchTerm) {
        return $http.get( baseUrl + '/api/recipesearch?q=' + searchTerm);
    };

    return recipeFactory;
});