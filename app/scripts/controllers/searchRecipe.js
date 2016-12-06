'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:SearchRecipeCtrl
 * @description
 * # SearchRecipeCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('SearchRecipeCtrl',
    function ($scope, $rootScope, $stateParams, $state, Recipe) {

        amplitude.logEvent('Search results page');
        var searchTerm = $stateParams.q;
        $scope.searchTerm=searchTerm;

        $rootScope.title ="Search Results for " + searchTerm;

        Recipe.$getRecipeSearch(searchTerm)
        .then(function( response ) {
            $scope.recipes = response.data;
            $scope.resultCount=$scope.recipes;
            $rootScope.shareImage = response.data[0].image_url;
        });
    }
);