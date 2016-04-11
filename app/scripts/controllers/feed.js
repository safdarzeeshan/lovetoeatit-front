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

        $scope.noCollection = true;

        amplitude.logEvent('Feed page');
        Collections.$getCollectionsFeed()
        .then(function( response ) {
            console.log(response.data);
            if (response.data.status === "no user recipe collections"){
                console.log('no user collection');
                $scope.noCollection = false;
            }
            else {
                $scope.collection = response.data;
            }
        });

        Likes.$getLastLike()
        .then(function( response ) {
            console.log(response.data);
            $scope.like = response.data;
        });

        Recipe.$getPopularRecipesFeed()
        .then(function( response ) {
            console.log(response.data);
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

    }
);