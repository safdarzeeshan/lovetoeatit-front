'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('FeedCtrl',
    function ($scope, $window, $state, Likes, Collections, Recipe) {

        $scope.collection = true;
        $scope.lastLike = true;

        amplitude.logEvent('Feed page');
        Collections.$getCollectionsFeed()
        .then(function( response ) {
            if (response.data.status === 'no user recipe collections'){
                console.log('no user collection');
                $scope.collection = false;
            }
            else {
                $scope.collection = response.data;
                console.log('overlay images')
                $scope.overlay1 = 'https://s3.amazonaws.com/ltei-recipe-images/overlay-images/recipe1.jpg';
                $scope.overlay2 = 'https://s3.amazonaws.com/ltei-recipe-images/overlay-images/recipe2.jpg';
            }
        });

        Likes.$getLastLike()
        .then(function( response ) {
            if (response.data.status === 'no last like'){
                Recipe.$getPopularRecipesFeed()
                .then(function( response ) {
                    $scope.lastLike = false;
                    $scope.like = response.data[2];
                });
            }
            else{
                $scope.like = response.data;
            }
        });

        Recipe.$getPopularRecipesFeed()
        .then(function( response ) {
            // console.log(response.data);
            $scope.popularRecipe = response.data;
        });

        Recipe.$getLatestRecipesFeed()
        .then(function( response ) {
            console.log(response.data);
            $scope.latestRecipe = response.data;
        });

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});

            var recipeProperties = {
                'id': id,
            };
            amplitude.logEvent('Clicked recipe details', recipeProperties);
        };

        $scope.getCollection = function(collectionTag){
            $state.go('user.collection' , { 'collection_tag': collectionTag});

            var collectionProperties = {
                'tag': collectionTag,
            };
            amplitude.logEvent('Clicked collection', collectionProperties);
        };

        $scope.gotoAllRecipes = function(){
            $state.go('user.allRecipes');
            amplitude.logEvent('Clicked all recipes');
        }

    }
);