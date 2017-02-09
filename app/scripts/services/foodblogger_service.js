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


    foodBloggerFactory.$getNewFoodBlogger = function(username) {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/editfoodblogger?username=' + username,
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
        });
    };


    foodBloggerFactory.$createFoodBlogger = function(bloggerData) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/editfoodblogger',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: bloggerData
        });
    };


    foodBloggerFactory.$updateFoodBlogger = function(bloggerData) {

        return $http({
            method: 'PUT',
            url: baseUrl + '/api/editfoodblogger',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: bloggerData
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

    foodBloggerFactory.$submitRecipeWithImageAdmin = function(recipeData, image, imageFileName) {

        var fd = new FormData();
        fd.append('image', image, imageFileName);
        fd.append('data', recipeData);

        return  $http.post(baseUrl + '/api/recipecreateadmin/', fd, {
            transformRequest: angular.identity,
            headers: {'x-csrftoken': $cookies.get('x-csrftoken'), 'Content-Type': undefined}
        });
    };


    foodBloggerFactory.$sendFbRecipeEmail = function(recipe_id) {

        return $http({
            method: 'GET',
            url: baseUrl + '/api/sendfbrecipeemail?recipe_id=' + recipe_id,
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
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

    foodBloggerFactory.$getFoodBloggerRecipes = function(name) {

        return $http.get( baseUrl + '/api/foodbloggerrecipes?name=' + name);
    };

    foodBloggerFactory.$getFoodBlogger = function(name) {

        return $http.get( baseUrl + '/api/foodblogger?name=' + name);
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