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
    function ($scope, $stateParams, $state, Recipe) {

        amplitude.logEvent('Search results page');
        var searchTerm = $stateParams.q;
        $scope.searchTerm=searchTerm;

        Recipe.$getRecipeSearch(searchTerm)
        .then(function( response ) {
            $scope.recipes = response.data;
            $scope.resultCount=$scope.recipes;

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