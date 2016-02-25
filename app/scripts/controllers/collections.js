'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:CollectionsCtrl
 * @description
 * # CollectionsCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('CollectionsCtrl',
    function ($scope, $window, $state, Collections) {

        //get all recipes and populate scope
        Collections.$getAllCollections()
        .then(function( response ) {
            $scope.collections = response.data;
        });

        $scope.getCollection = function(collectionTag){
            $state.go('user.collection' , { 'collection_tag': collectionTag});
        };
    }
);