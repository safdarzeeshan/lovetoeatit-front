'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('FoodBlogger', function( $http, $cookies, Upload, Config ) {

    var foodBloggerFactory = {},
        baseUrl = Config.$baseUrl,
        recipeScraperUrl = Config.$recipeScraperUrl;

    foodBloggerFactory.$submitRecipe = function(recipeData) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/recipecreate',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: recipeData
        });
    };

    foodBloggerFactory.$submitRecipeWithImage = function(recipeData, image, imageFileName) {

        var fd = new FormData();
        fd.append('image', image, imageFileName);
        fd.append('data', recipeData);

        return  $http.post(baseUrl + '/api/recipecreate/', fd, {
            transformRequest: angular.identity,
            headers: {'x-csrftoken': $cookies.get('x-csrftoken'), 'Content-Type': undefined}
        });
    };

    foodBloggerFactory.$editRecipe = function(id, recipeData, image, imageFileName) {

        var fd = new FormData();
        fd.append('image', image, imageFileName);
        fd.append('data', recipeData);

        return  $http.put(baseUrl + '/api/recipe?id=' +id, fd, {
            transformRequest: angular.identity,
            headers: {'x-csrftoken': $cookies.get('x-csrftoken'), 'Content-Type': undefined}
        });
    };

    foodBloggerFactory.$deleteRecipe = function(local_id) {

        return $http({
            method: 'DELETE',
            url: baseUrl + '/api/recipe?id=' +local_id,
            headers : {'x-csrftoken': $cookies.get('x-csrftoken')},
        });
    };

    foodBloggerFactory.$scrapeRecipe = function(recipeURL) {

        return $http({
            method: 'GET',
            url: recipeScraperUrl +'?url=' + recipeURL,
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

    foodBloggerFactory.$getTempImageUrl = function(imageUrl) {

        return $http.get( baseUrl + '/api/uploadimagetemp?imageurl=' + imageUrl  );
    };

    return foodBloggerFactory;
});