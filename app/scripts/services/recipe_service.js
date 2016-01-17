'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Recipe', function( $http ) {

    var recipeFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000';

    recipeFactory.$getRecipe = function(id) {
        return $http.get( baseUrl + '/api/recipe?id=' +id );
    };

    return recipeFactory;
});