'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:AlltagrecipesCtrl
 * @description
 * # AlltagrecipesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('AllTagRecipesCtrl', function ($scope, $stateParams, Recipe, $state) {

    var tag = $stateParams.tag;
    var name = $stateParams.name;
    $scope.loading= true;
    $scope.limit = 40;

    Recipe.$getTagRecipes(tag, name)
    .then(function( response ) {
        $scope.loading= false;
        $scope.tag = name;
        $scope.recipes = response.data;
    });

    $scope.getRecipe = function(id){
        $state.go('user.recipe' , { 'id': id});
        var recipeProperties = {
            'id': id,
        };
        amplitude.logEvent('Clicked recipe details', recipeProperties);
    };

  });
