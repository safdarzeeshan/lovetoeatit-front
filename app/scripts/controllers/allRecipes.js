'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:AllRecipesCtrl
 * @description
 * # AllRecipesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('AllRecipesCtrl',
    function ($scope, $window, $state, Recipe) {

        //get all recipes and populate scope
        Recipe.$getAllRecipes()
        .then(function( response ) {
            $scope.recipes = response.data;
        });

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
        };
    }
);