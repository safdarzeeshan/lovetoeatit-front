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

        //get likes and populate scope
        // Likes.$getLikes()
        // .then(function( response ) {
        //     $scope.likes = response.data;
        // });

        Collections.$getCollectionsFeed()
        .then(function( response ) {
            console.log(response.data);
            $scope.collection = response.data;
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
        };

        $scope.getCollection = function(collectionTag){
            $state.go('user.collection' , { 'collection_tag': collectionTag});
        };

    }
);