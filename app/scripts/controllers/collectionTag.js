'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:CollectionTagCtrl
 * @description
 * # CollectionTagCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('CollectionTagCtrl',
    function ($scope, $stateParams, $state, $http, $cookies, Collections, Likes) {

        $scope.loading= true;
        amplitude.logEvent('Collection tag page');
        //get collection for tag and populate scope
        var collectionTag = $stateParams.collection_tag;
        $scope.collection_name = collectionTag;

        Collections.$getCollection(collectionTag)
        .then(function( response ) {
            $scope.loading= false;
            $scope.likes = response.data;
        });

        $scope.likeClick = function($index, recipe_local_id){
            amplitude.logEvent('Recipe thumbnail like clicked ');

            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){

                if (response.data.has_user_liked === true){
                    $scope.likes[$index].has_user_liked = true;
                }

                if (response.data.has_user_liked === false){
                    $scope.likes[$index].has_user_liked = false;
                }

                $scope.likes[$index].no_of_likes = response.data.no_of_likes;
            });
        };
    }
);