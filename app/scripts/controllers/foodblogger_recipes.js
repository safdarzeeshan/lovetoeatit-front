'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:FoodbloggerRecipesCtrl
 * @description
 * # FoodbloggerRecipesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('FoodbloggerRecipesCtrl',
    function ($scope, $stateParams, $rootScope, $window, $state,  Auth, FoodBlogger ,Likes, $http, $cookies) {

        $scope.limit = 40;
        $scope.loading= true;
        var name = $stateParams.name;
        amplitude.logEvent('food blogger recipe page');

        $rootScope.title = name + "'s Recipes";

        //get likes and populate scope
        FoodBlogger.$getFoodBloggerRecipes(name)
        .then(function( response ) {
            $scope.loading= false;
            $scope.recipes = response.data;
            $rootScope.shareImage = response.data[0].image_url;
        })
        .catch(function(error){
            console.log(error);
        });

        FoodBlogger.$getFoodBlogger(name)
        .then(function( response ) {
            $scope.foodblogger = response.data;
        })
        .catch(function(error){
            console.log(error);
        });

        $scope.likeClick = function($index, recipe_local_id){
            amplitude.logEvent('Recipe thumbnail like clicked ');

            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){

                if (response.data.has_user_liked === true){
                    $scope.recipes[$index].has_user_liked = true;
                }

                if (response.data.has_user_liked === false){
                    $scope.recipes[$index].has_user_liked = false;
                }

                $scope.recipes[$index].no_of_likes = response.data.no_of_likes;
            });
        };

        $scope.gotoFbInstagram = function(ig_username){
            amplitude.logEvent('Clicked foodblooger instagram');
            $window.open('https://www.instagram.com/' + ig_username, '_blank');
        };

        $scope.gotoFbBlog = function(blog_url){
            amplitude.logEvent('Clicked foodblooger blog');
            $window.open(blog_url, '_blank');
        };
    }
);