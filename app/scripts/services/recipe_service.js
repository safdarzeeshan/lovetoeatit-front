'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Recipe', function( $http, $cookies ) {

    var recipeFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000';

    recipeFactory.$getRecipe = function(id) {
        return $http.get( baseUrl + '/api/recipe?id=' +id );
    };

    recipeFactory.$getAllRecipes = function() {
        return $http.get( baseUrl + '/api/recipes');
    };

    recipeFactory.$submitRecipe = function(recipeData) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/recipecreate/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: recipeData
        });
    };

    return recipeFactory;
});