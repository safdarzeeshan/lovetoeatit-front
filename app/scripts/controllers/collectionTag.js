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
    function ($scope, $stateParams, $state, $http, $cookies, Collections) {

        amplitude.logEvent('Collection tag page');
        //get collection for tag and populate scope
        var collectionTag = $stateParams.collection_tag;
        $scope.collection_name = collectionTag;

        Collections.$getCollection(collectionTag)
        .then(function( response ) {
            $scope.likes = response.data;
        });

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
            var recipeProperties = {
                'id': id,
            };
            amplitude.logEvent('Clicked recipe details', recipeProperties);
        };
    }
);