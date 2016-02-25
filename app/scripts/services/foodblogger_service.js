'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('FoodBlogger', function( $http, $cookies, Upload ) {

    var foodBloggerFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000';

    foodBloggerFactory.$submitRecipe = function(recipeData) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/recipecreate/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: recipeData
        });
    };

    foodBloggerFactory.$submitRecipeWithImage = function(recipeData) {

        return Upload.upload({
            url: baseUrl + '/api/recipecreate/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken')},
            data: recipeData
        });
    };

    foodBloggerFactory.$upload = function(file, username) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/uploadimage/',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: {image: file, name: username}
        });
    };

    foodBloggerFactory.$editRecipe = function(id, recipeData) {

        return $http({
            method: 'PUT',
            url: baseUrl + '/api/recipe/?id=' +id,
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: recipeData
        });
    };

    foodBloggerFactory.$scrapeRecipe = function(recipeURL) {

        return $http({
            method: 'GET',
            url: 'http://localhost:4567/?url=' + recipeURL,
        });
    };

    foodBloggerFactory.$getSubmittedRecipes = function() {

        return $http.get( baseUrl + '/api/submittedrecipes' );
    };

    foodBloggerFactory.$getFoodBloggersList = function() {

        return $http.get( baseUrl + '/api/foodbloggerslist' );
    };

    foodBloggerFactory.$getCollectionTagsList = function() {

        return $http.get( baseUrl + '/api/collectiontagslist' );
    };

    foodBloggerFactory.$getDietTagsList = function() {

        return $http.get( baseUrl + '/api/diettagslist' );
    };

    foodBloggerFactory.$getCategoryTagsList = function() {

        return $http.get( baseUrl + '/api/categorytagslist' );
    };

    return foodBloggerFactory;
});